import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function AiHelp() {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);

  const getInsights = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/ai/insights');
      setInsights(res.data.insights);
    } catch (err) {
      console.error(err);
      toast.error('Failed to grab AI insights. Ensure your `.env` contains GEMINI_API_KEY.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Financial Insights</h1>
        <p className="text-slate-400">
          Get personalized recommendations based on your spending patterns.
        </p>
      </div>

      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Generate Your Report</h2>
            <p className="text-sm text-slate-400 mt-1">
              The AI will analyze your latest transactions to find saving opportunities.
            </p>
          </div>
          <Button onClick={getInsights} disabled={loading} size="lg" className="shrink-0">
            {loading ? 'Analyzing Data...' : 'Generate New Insights'}
          </Button>
        </div>

        {insights && (
          <div className="p-6 bg-slate-900 border border-slate-700 rounded-2xl">
            <h3 className="text-lg font-medium text-cyan-400 mb-4 flex items-center gap-2">
              <span>🧠</span> AI Analysis Complete
            </h3>
            <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">
              {insights}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
