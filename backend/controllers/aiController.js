const { GoogleGenerativeAI } = require('@google/generative-ai');
const Transaction = require('../models/Transaction');

// @desc    Get AI insights for user transactions
// @route   GET /api/ai/insights
// @access  Private
exports.getInsights = async (req, res, next) => {
  try {
    const aiKey = process.env.GEMINI_API_KEY;
    if (!aiKey || aiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      return res.status(500).json({ 
        success: false, 
        message: 'GEMINI_API_KEY is not configured. Add your key to the backend .env file. Get one free at https://aistudio.google.com/apikey' 
      });
    }

    // Fetch user transactions
    const transactions = await Transaction.find({ user: req.user.id });
    
    if (transactions.length === 0) {
      return res.status(200).json({ 
        success: true, 
        insights: "You don't have any transactions yet. Start adding your expenses and income to get personalized AI insights!" 
      });
    }

    const genAI = new GoogleGenerativeAI(aiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Calculate basic totals for the prompt
    let totalIncome = 0;
    let totalExpense = 0;
    
    const summarizedTransactions = transactions.map(tx => {
      if (tx.type === 'income') totalIncome += tx.amount;
      else totalExpense += tx.amount;

      return {
        title: tx.title,
        amount: tx.amount,
        type: tx.type,
        category: tx.category,
        date: tx.date
      };
    });

    const prompt = `Analyze this user's spending data and give actionable advice.
    
    Summary:
    Total Income: ₹${totalIncome}
    Total Expenses: ₹${totalExpense}
    Balance: ₹${totalIncome - totalExpense}
    
    Recent Transactions: 
    ${JSON.stringify(summarizedTransactions.slice(0, 50))}
    
    Please provide:
    1. A short, encouraging opening sentence.
    2. A brief analysis of their spending habits (e.g. what category they spend most on).
    3. 1-2 actionable, concise tips to save money or manage finances better based on this specific data.
    4. Keep the entire response under 200 words and format it nicely with markdown.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ success: true, insights: text });
  } catch (error) {
    console.error('AI Controller Error:', error.message);
    
    // Return a user-friendly error based on the type
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Gemini API key. Please check your GEMINI_API_KEY in the .env file.' 
      });
    }
    
    next(error);
  }
};

