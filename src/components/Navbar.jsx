// Navbar.jsx
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ activeSection, scrollToSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", emoji: "🏠" },
    { id: "chat", label: "AI Chat", emoji: "💬" },
    { id: "journal", label: "Journal", emoji: "📖" },
    { id: "mood", label: "Mood", emoji: "😊" },
    { id: "quotes", label: "Quotes", emoji: "💡" },
    { id: "emergency", label: "Emergency", emoji: "🚨" },
    { id: "breathe", label: "Meditate", emoji: "🧘" },
  ];

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 border-b border-neon-purple/20 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text cyber-text cursor-pointer flex items-center"
          >
            <span className="mr-2">🧠</span>
            MindMaTe
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center ${
                  activeSection === item.id
                    ? 'bg-neon-purple/20 text-white border border-neon-purple/50'
                    : 'text-purple-200 hover:text-white hover:bg-neon-purple/10'
                }`}
              >
                <span className="mr-2 text-lg">{item.emoji}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-purple-200 p-2 rounded-lg hover:bg-neon-purple/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-neon-purple/20">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-xl transition-all duration-200 flex items-center ${
                    activeSection === item.id
                      ? 'bg-neon-purple/20 text-white border border-neon-purple/50'
                      : 'text-purple-200 hover:text-white hover:bg-neon-purple/10'
                  }`}
                >
                  <span className="mr-3 text-xl">{item.emoji}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}