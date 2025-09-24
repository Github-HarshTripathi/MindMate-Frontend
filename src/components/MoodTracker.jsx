import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const moods = ["😄", "😊", "😐", "😔", "😢"];

export default function MoodTracker() {
  const [selected, setSelected] = useState(null);
  const [moodList, setMoodList] = useState([]);

  const handleMoodSelect = (mood) => {
    setSelected(mood);
    const newEntry = {
      mood,
      date: new Date().toISOString()
    };
    setMoodList(prev => [newEntry, ...prev]);
  };

  const moodChartData = {
    labels: moodList.slice(0,7).map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [{
      label: 'Mood Score',
      data: moodList.slice(0,7).map(entry => moods.indexOf(entry.mood)),
      borderColor: '#c084fc',
      tension: 0.4,
      pointBackgroundColor: '#ec4899'
    }]
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold cyber-text mb-10">Track Your Mood</h2>

        <div className="flex justify-center gap-6 flex-wrap mb-6">
          {moods.map(mood => (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className={`text-4xl p-4 rounded-full transition transform hover:scale-125 ${
                selected === mood ? 'bg-neon-purple text-white' : 'bg-gray-700'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {selected && (
          <p className="text-purple-300 text-xl mb-8">
            Your mood "<strong>{selected}</strong>" has been recorded.
          </p>
        )}

        {moodList.length > 0 && (
          <div className="mt-12 p-6 bg-black/40 rounded-xl">
            <h3 className="text-2xl text-neon-purple mb-4">Weekly Mood Trend</h3>
            <div className="h-64">
              <Line 
                data={moodChartData}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        callback: (value) => moods[value] || ''
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        )}

        {moodList.length > 0 && (
          <div className="text-left mt-10">
            <h3 className="text-2xl mb-4 text-purple-300">Mood History</h3>
            <ul className="space-y-2">
              {moodList.map((entry, index) => (
                <li key={index} className="bg-black/40 p-3 rounded-xl border border-neon-purple/30 text-purple-100">
                  {new Date(entry.date).toLocaleString()} — <strong>{entry.mood}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}