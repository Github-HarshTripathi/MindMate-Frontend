import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiBookmark } from 'react-icons/fi';

export default function Quote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      setQuote({
        content: data.quote,
        author: data.author
      });
    } catch (err) {
      setError("Failed to load quote. Please try again.");
      console.error("Quote fetch error:", err);
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="cyber-border p-8 rounded-2xl bg-black/60 backdrop-blur-2xl">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-5xl font-bold cyber-text">Daily Wisdom</h2>
            <p className="text-xl text-purple-300/80">Powered by DummyJSON API</p>
          </div>

          <div className="holographic-panel rounded-xl p-8 border-2 border-neon-purple/30">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-purple-900/50 rounded w-3/4 mx-auto"></div>
                <div className="h-6 bg-purple-900/50 rounded w-full"></div>
              </div>
            ) : quote ? (
              <>
                <p className="text-2xl italic mb-4 text-center text-purple-200">"{quote.content}"</p>
                <p className="text-lg font-medium text-neon-pink">- {quote.author}</p>
              </>
            ) : (
              <p className="text-purple-400 text-center">{error}</p>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <button onClick={fetchQuote} className="cyber-button px-6 py-3 rounded-xl" disabled={loading}>
              <FiRefreshCw className={`inline mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'New Quote'}
            </button>
            <button onClick={() => alert("Saved!")} className="cyber-button px-6 py-3 rounded-xl">
              <FiBookmark className="inline mr-2" />
              Save Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
