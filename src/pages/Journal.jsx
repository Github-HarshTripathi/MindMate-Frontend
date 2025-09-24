// src/pages/Journal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiSave, FiBold, FiItalic, FiSmile, FiMic, FiStopCircle } from 'react-icons/fi';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import api from '../services/ai';

export default function Journal() {
  const [entry, setEntry] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!showEmojiPicker) return;

    const handleClickOutside = (event) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  const handleSave = async () => {
    if (entry.trim().length < 10) {
      setSavedMessage('Please write at least 10 characters.');
      setTimeout(() => setSavedMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSavedMessage('Entry saved successfully!');
      setEntry('');
    } catch (error) {
      setSavedMessage('Error saving journal entry');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20">
      <div className="container-responsive py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 cyber-text">
            Daily Journal
          </h2>

          {savedMessage && (
            <div className={`mb-6 p-4 rounded-xl text-center ${
              savedMessage.includes('Error') ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'
            }`}>
              {savedMessage}
            </div>
          )}

          <div className="cyber-border rounded-2xl bg-black/60 backdrop-blur-xl p-4 md:p-6">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                onClick={() => {
                  const textarea = textareaRef.current;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  setEntry(entry.slice(0, start) + '**' + entry.slice(start, end) + '**' + entry.slice(end));
                }}
                className="p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition-colors"
                title="Bold"
              >
                <FiBold />
              </button>
              <button 
                onClick={() => {
                  const textarea = textareaRef.current;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  setEntry(entry.slice(0, start) + '*' + entry.slice(start, end) + '*' + entry.slice(end));
                }}
                className="p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition-colors"
                title="Italic"
              >
                <FiItalic />
              </button>
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition-colors"
                title="Emoji"
              >
                <FiSmile />
              </button>
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording ? 'bg-red-500' : 'bg-gray-800 hover:bg-purple-600'
                }`}
                title="Voice Input"
              >
                {isRecording ? <FiStopCircle /> : <FiMic />}
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute z-50 mb-4">
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => {
                    setEntry(prev => prev + emoji.native);
                    setShowEmojiPicker(false);
                  }}
                  theme="dark"
                />
              </div>
            )}

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              className="w-full h-64 md:h-80 p-4 md:p-6 rounded-xl border border-neon-purple/30 bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple resize-none placeholder-purple-400/60"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Write your thoughts here... Express yourself freely and honestly."
            />

            {/* Character Count */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-purple-400 text-sm">
                {entry.length} characters • Minimum 10 required
              </span>
              <button
                onClick={handleSave}
                disabled={isLoading || entry.length < 10}
                className="cyber-button px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FiSave />
                {isLoading ? 'Saving...' : 'Save Entry'}
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 cyber-card p-6">
            <h3 className="text-lg font-bold text-neon-purple mb-3">Journaling Tips</h3>
            <ul className="text-purple-300 space-y-2 text-sm">
              <li>• Write consistently to track patterns</li>
              <li>• Be honest with your feelings</li>
              <li>• Focus on both positive and challenging experiences</li>
              <li>• Use voice input if typing feels difficult</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}