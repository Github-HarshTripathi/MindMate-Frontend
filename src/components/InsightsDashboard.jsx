// src/components/InsightsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FiX, FiActivity, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';

const InsightsDashboard = ({ onClose }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/journal');
      setEntries(res.data);
    };
    fetchData();
  }, []);

  const moodData = {
    labels: entries.map(e => new Date(e.date).toLocaleDateString()).slice(0, 7),
    datasets: [
      {
        label: 'Mood Score',
        data: entries.map(e => {
          const moodMap = {
            Positive: 5,
            'Slightly Positive': 4,
            Neutral: 3,
            'Slightly Negative': 2,
            Negative: 1
          };
          return moodMap[e.mood] || 3;
        }).slice(0, 7),
        borderColor: '#c084fc',
        tension: 0.4,
        pointBackgroundColor: '#ec4899'
      }
    ]
  };

  const avgLength = entries.length
    ? (entries.reduce((acc, e) => acc + e.content.length, 0) / entries.length).toFixed(0)
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 p-4 md:p-8 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto bg-black/80 rounded-2xl cyber-border p-6 relative mt-20 mb-8">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors z-10 bg-black/80 p-2 rounded-full"
        >
          <FiX className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold cyber-text mb-2">🧠 Personalized Insights</h2>
          <p className="text-purple-300">Your Mental Health Analytics</p>
        </div>

        {/* Weekly Mood Trend */}
        <div className="p-4 rounded-xl bg-black/60 mb-6">
          <div className="flex items-center gap-2 mb-4 text-neon-purple">
            <FiActivity className="text-xl" />
            <h3 className="text-xl font-bold">Weekly Mood Trend</h3>
          </div>
          <div className="h-64">
            <Line 
              data={moodData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-black/60 border border-neon-purple/30">
            <div className="flex items-center gap-2 mb-2 text-neon-purple">
              <FiCalendar className="text-xl" />
              <h3 className="text-lg font-bold">Total Entries</h3>
            </div>
            <p className="text-3xl font-bold">{entries.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-black/60 border border-neon-purple/30">
            <div className="text-neon-purple mb-2">Avg. Entry Length</div>
            <p className="text-3xl font-bold">{avgLength} chars</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightsDashboard;
