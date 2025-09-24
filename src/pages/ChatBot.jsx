import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiStopCircle, FiAlertTriangle } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { sendToAI } from '../services/ai';
import remarkGfm from 'remark-gfm';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const recognition = useRef(null);
  const chatContainerRef = useRef(null);

  const negativeKeywords = ['sad', 'depressed', 'anxious', 'stress', 'lonely', 'hopeless'];

  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';

    if (!isLocalhost && window.location.protocol !== 'https:') {
      console.warn("Voice feature requires HTTPS in production!");
      return;
    }

    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + ' ' + transcript);
        setIsRecording(false);
      };

      recognition.current.onerror = (error) => {
        console.error('Voice Error:', error);
        setIsRecording(false);
      };

      recognition.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.warn("Browser doesn't support voice recognition!");
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition.current) return;

    try {
      if (isRecording) {
        recognition.current.stop();
      } else {
        recognition.current.start();
      }
      setIsRecording(!isRecording);
    } catch (error) {
      console.error("Mic Error:", error);
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      text: input, 
      sender: 'user',
      key: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const thinkingMessage = {
        text: "Thinking...",
        sender: 'bot',
        key: 'thinking-message'
      };
      setMessages(prev => [...prev, thinkingMessage]);

      const aiResponse = await sendToAI(input);

      setMessages(prev => prev.filter(msg => msg.key !== 'thinking-message'));

      const isNegative = negativeKeywords.some(word => 
        aiResponse.toLowerCase().includes(word)
      );

      setMessages(prev => [
        ...prev,
        {
          text: aiResponse,
          sender: 'bot',
          key: Date.now() + 1,
          sentiment: isNegative ? 'negative' : 'neutral'
        }
      ]);
    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.key !== 'thinking-message'));

      const errorMessage = error.message || 'Our AI assistant is currently unavailable. Please try again later.';
      setMessages(prev => [
        ...prev,
        {
          text: errorMessage,
          sender: 'bot',
          key: Date.now() + 2,
          sentiment: 'neutral'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="cyber-border p-8 rounded-2xl bg-black/60 backdrop-blur-2xl">
          <h2 className="text-5xl font-bold cyber-text text-center mb-10">AI Listener 🦾</h2>

          {messages.some(m => m.sentiment === 'negative') && (
            <div className="cyber-card bg-red-900/20 p-6 mb-6 border-2 border-neon-red rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <FiAlertTriangle className="text-neon-red text-2xl" />
                <h3 className="text-xl font-bold text-neon-red">Support Suggestions</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-purple-200">
                <a href="/emergency" className="hover:text-neon-red transition-colors">
                  🚨 Emergency Contacts
                </a>
                <a 
                  href="https://youtube.com/playlist?list=PLw9WaGAqHydW5ZTwLG0gUzE3k9gQpW3jH" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-red transition-colors"
                >
                  🎧 Calming Playlist
                </a>
                <a href="/meditation" className="hover:text-neon-red transition-colors">
                  🧘 Breathing Exercise
                </a>
                <button 
                  onClick={() => window.scrollTo(0, document.body.scrollHeight)}
                  className="hover:text-neon-red transition-colors text-left"
                >
                  💬 Talk More
                </button>
              </div>
            </div>
          )}

          <div className="rounded-xl border-2 border-neon-purple/30 bg-black/40 chat-container">
            <div
              ref={chatContainerRef}
              className="chat-messages p-6 overflow-y-auto scrollbar-cyber"
              style={{ minHeight: '400px', maxHeight: '60vh', overflowAnchor: 'none' }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.key}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`p-5 rounded-2xl max-w-[70%] border-2 ${
                      msg.sender === 'user'
                        ? 'border-neon-purple bg-neon-purple/10 text-purple-300'
                        : msg.text === "Thinking..."
                          ? 'border-cyan-500/30 bg-black/40'
                          : 'border-neon-pink bg-black/40 text-pink-200'
                    }`}
                  >
                    <div className="prose prose-invert">
                      {msg.text === "Thinking..." ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce"></div>
                          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          <span className="text-cyan-300">Thinking...</span>
                        </div>
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-black/40 border border-neon-purple/30">
            <div className="flex gap-4 items-center">
              <button
                onClick={toggleRecording}
                className={`cyber-button px-4 py-4 rounded-xl ${
                  isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'
                } transition-colors`}
                disabled={!recognition.current}
              >
                {isRecording ? (
                  <FiStopCircle size={24} className="text-white" />
                ) : (
                  <FiMic size={24} className="text-white" />
                )}
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                placeholder="Type or speak your message..."
                className="flex-1 p-4 bg-black/30 text-purple-200 placeholder-purple-400/60 rounded-xl border-2 border-neon-purple/30 focus:outline-none focus:ring-2 focus:ring-neon-purple text-lg"
              />
              <button
                onClick={handleChat}
                className="cyber-button px-6 py-4 rounded-xl hover:rotate-[360deg] transition-all duration-500 bg-purple-600 hover:bg-purple-700"
                disabled={isTyping}
              >
                <FiSend className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {['I feel anxious today', 'How to improve sleep?', 'Tips for dealing with stress'].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="px-4 py-2 rounded bg-black/30 border border-purple-500 text-purple-300 hover:bg-purple-900/20 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
