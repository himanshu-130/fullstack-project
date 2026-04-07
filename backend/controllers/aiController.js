const { GoogleGenerativeAI } = require('@google/generative-ai');
const Transaction = require('../models/Transaction');

// @desc    Get AI insights for user transactions
// @route   GET /api/ai/insights
// @access  Private
exports.getInsights = async (req, res, next) => {
  try {
    const aiKey = process.env.GEMINI_API_KEY;
    if (!aiKey) {
      return res.status(500).json({ success: false, message: 'AI API key not configured' });
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    Total Income: ${totalIncome}
    Total Expenses: ${totalExpense}
    Balance: ${totalIncome - totalExpense}
    
    Recent Transactions: 
    ${JSON.stringify(summarizedTransactions.slice(0, 50))} // Limiting to recent 50 for token limits
    
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
    next(error);
  }
};
