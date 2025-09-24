import React from 'react';
import { FaPhoneAlt, FaExclamationTriangle } from 'react-icons/fa';

const helplines = [
  { name: "Mental Health Helpline", number: "1800-599-0019", icon: "🧠" },
  { name: "Ambulance", number: "102 / 108", icon: "🚑" },
  { name: "Police", number: "100", icon: "👮" },
  { name: "Suicide Prevention", number: "9152987821", icon: "📞" },
];

export default function Emergency() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="cyber-border p-12 rounded-2xl bg-black/60 backdrop-blur-2xl">
          <div className="text-center mb-16">
            <div className="cyber-glow-red inline-block p-6 rounded-full mb-8">
              <FaExclamationTriangle className="w-14 h-14 text-neon-red animate-pulse" />
            </div>
            <h2 className="text-5xl font-bold cyber-text-red mb-4">
              EMERGENCY <span className="text-neon-red">SUPPORT</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helplines.map((line, index) => (
              <div key={index} className="cyber-card p-6 rounded-xl bg-black/40 border-2 border-neon-red/30">
                <div className="flex items-center gap-4">
                  <span className="text-4xl p-3 bg-red-900/30 rounded-lg">{line.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl text-neon-red">{line.name}</h3>
                    <p className="text-lg font-mono text-red-300">{line.number}</p>
                  </div>
                  <a href={`tel:${line.number}`} className="cyber-button-small p-3 rounded-lg">
                    <FaPhoneAlt className="w-6 h-6 text-neon-red" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* 👇 Emergency Tips & Share Section */}
          <div className="mt-16">
            <h3 className="text-2xl text-neon-red mb-4">🧠 Emergency Tips</h3>
            <ul className="list-disc pl-6 space-y-2 text-red-200">
              <li>Stay calm and breathe slowly.</li>
              <li>Don't hesitate to call the helplines.</li>
              <li>Talk to someone you trust.</li>
            </ul>

            <div className="mt-6">
              <h4 className="text-xl text-red-400 mb-2">📢 Share this Page</h4>
              <a
                href="https://wa.me/?text=Hey, check out this helpful mental health emergency page: https://yourdomain.com"
                target="_blank"
                className="cyber-button-small bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Share via WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
