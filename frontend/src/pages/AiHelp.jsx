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
      toast.error(err.response?.data?.message || 'Failed to grab AI insights. Ensure your `.env` contains GEMINI_API_KEY.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>AI Financial Insights</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Get personalized recommendations based on your spending patterns.
        </p>
      </div>

      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-heading)' }}>Generate Your Report</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              The AI will analyze your latest transactions to find saving opportunities.
            </p>
          </div>
          <Button onClick={getInsights} disabled={loading} size="lg" className="shrink-0">
            {loading ? 'Analyzing Data...' : 'Generate New Insights'}
          </Button>
        </div>

        {insights && (
          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              AI Analysis Complete
            </h3>
            <div className="leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
              {insights}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
