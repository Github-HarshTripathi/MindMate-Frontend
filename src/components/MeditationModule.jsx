import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiRotateCw } from 'react-icons/fi';

const breathingPatterns = {
  standard: [
    { type: 'inhale', duration: 4, color: '#c084fc' },
    { type: 'hold', duration: 4, color: '#ec4899' },
    { type: 'exhale', duration: 6, color: '#00f7ff' }
  ],
  calming: [
    { type: 'inhale', duration: 4, color: '#4ade80' },
    { type: 'hold', duration: 2, color: '#fbbf24' },
    { type: 'exhale', duration: 6, color: '#60a5fa' }
  ],
  energizing: [
    { type: 'inhale', duration: 2, color: '#f87171' },
    { type: 'hold', duration: 1, color: '#fbbf24' },
    { type: 'exhale', duration: 2, color: '#60a5fa' }
  ]
};

export default function MeditationModule() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [key, setKey] = useState(0);
  const [pattern, setPattern] = useState('standard');
  const [currentStage, setCurrentStage] = useState(null);

  const totalDuration = breathingPatterns[pattern].reduce(
    (sum, stage) => sum + stage.duration, 
    0
  );

  const renderBreathingText = (stage) => {
    if (!stage) return <p className="text-white">Ready to begin...</p>;
    
    return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <h2 className={`text-4xl font-bold mb-2 ${
          stage.type === 'inhale' ? 'text-green-400' : 
          stage.type === 'exhale' ? 'text-blue-400' : 'text-yellow-400'
        }`}>
          {stage.type.toUpperCase()}
        </h2>
        <p className="text-purple-300 text-xl">{stage.duration} seconds</p>
        
        {stage.type === 'inhale' && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: stage.duration, repeat: Infinity }}
            className="mt-4"
          >
            <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500/40 rounded-full"></div>
            </div>
          </motion.div>
        )}
        
        {stage.type === 'exhale' && (
          <motion.div
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: stage.duration, repeat: Infinity }}
            className="mt-4"
          >
            <div className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-500/40 rounded-full"></div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const handleStageChange = (stage) => {
    setCurrentStage(stage);
    // Sound removed
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="cyber-border p-8 rounded-2xl bg-black/60 backdrop-blur-2xl">
          <h2 className="text-5xl font-bold cyber-text text-center mb-10">Mindful Breathing</h2>

          <div className="flex flex-col items-center gap-8">
            <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              duration={totalDuration}
              colors={breathingPatterns[pattern].map(stage => stage.color)}
              colorsTime={breathingPatterns[pattern].map((_, i) => 
                breathingPatterns[pattern].slice(0, i+1).reduce((sum, s) => sum + s.duration, 0)
              )}
              onComplete={() => [true, 1000]}
              size={300}
              strokeWidth={15}
              onUpdate={(remainingTime) => {
                let elapsed = 0;
                for (const stage of breathingPatterns[pattern]) {
                  elapsed += stage.duration;
                  if (remainingTime <= elapsed) {
                    if (stage !== currentStage) {
                      handleStageChange(stage);
                    }
                    break;
                  }
                }
              }}
            >
              {() => renderBreathingText(currentStage)}
            </CountdownCircleTimer>

            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="cyber-button px-8 py-4 rounded-xl flex items-center gap-2"
              >
                {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                {isPlaying ? 'Pause' : 'Start'}
              </button>
              
              <button
                onClick={() => setKey(prev => prev + 1)}
                className="cyber-button px-8 py-4 rounded-xl flex items-center gap-2"
              >
                <FiRotateCw size={24} />
                Reset
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="cyber-button px-8 py-4 rounded-xl flex items-center gap-2"
              >
                {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
            </div>

            <div className="mt-6 flex gap-4">
              {Object.keys(breathingPatterns).map((pat) => (
                <button
                  key={pat}
                  onClick={() => {
                    setPattern(pat);
                    setKey(prev => prev + 1);
                  }}
                  className={`px-4 py-2 rounded-full ${
                    pattern === pat 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-purple-200'
                  }`}
                >
                  {pat.charAt(0).toUpperCase() + pat.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="cyber-card p-6 bg-black/40">
                <h3 className="text-neon-purple text-xl mb-2">Guided Sessions</h3>
                <ul className="space-y-2 text-purple-300">
                  <li>• 5-Minute Quick Calm</li>
                  <li>• Stress Relief Session</li>
                  <li>• Sleep Preparation</li>
                </ul>
              </div>
              
              <div className="cyber-card p-6 bg-black/40">
                <h3 className="text-neon-purple text-xl mb-2">Ambient Sounds</h3>
                <ul className="space-y-2 text-purple-300">
                  <li>• Forest Rain</li>
                  <li>• Ocean Waves</li>
                  <li>• Cosmic Harmony</li>
                </ul>
              </div>
              
              <div className="cyber-card p-6 bg-black/40">
                <h3 className="text-neon-purple text-xl mb-2">Breathing Techniques</h3>
                <ul className="space-y-2 text-purple-300">
                  <li>• Box Breathing</li>
                  <li>• 4-7-8 Technique</li>
                  <li>• Alternate Nostril</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
