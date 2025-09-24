// src/pages/Home.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBarChart2, FiHeart, FiZap } from 'react-icons/fi';
import InsightsDashboard from '../components/InsightsDashboard';

const Home = () => {
  const [showInsights, setShowInsights] = useState(false);

  const features = [
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Get personalized mental health analytics and pattern detection"
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Mood Tracking",
      description: "Monitor your emotional wellbeing with intelligent mood analysis"
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Always available AI assistant for immediate mental health support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4">
        <div className="container-responsive text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cyber-text"
          >
            Mind<span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">MaTe</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-purple-300 max-w-3xl mx-auto mb-8"
          >
            Empowering mental wellness through AI innovation. Track, understand, and improve your mental health with cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="cyber-border p-6 md:p-8 rounded-2xl bg-black/60 backdrop-blur-xl max-w-4xl mx-auto mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-purple-100 mb-2">
                  Personalized Mental Health Dashboard
                </h3>
                <p className="text-purple-300 text-sm md:text-base">
                  AI-generated insights • Pattern detection • Predictive analysis • Weekly reports
                </p>
              </div>
              <button 
                onClick={() => setShowInsights(true)}
                className="cyber-button px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shrink-0"
              >
                Explore Insights <FiArrowRight className="animate-pulse" />
              </button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                className="cyber-card p-6 rounded-xl text-center"
              >
                <div className="text-neon-purple mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-purple-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {showInsights && (
        <div className="fixed inset-0 z-50">
          <InsightsDashboard onClose={() => setShowInsights(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;