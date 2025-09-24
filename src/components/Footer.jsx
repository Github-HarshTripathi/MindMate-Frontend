// src/components/Footer.jsx
import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black/95 border-t border-neon-purple/20 mt-20">
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              MindMaTe
            </h3>
            <p className="text-purple-300/80 text-sm leading-relaxed">
              Empowering mental wellness through AI innovation. Making mental health support accessible to everyone.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-purple-100 font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'AI Chat', 'Journal', 'Mood Tracker', 'Meditation', 'Emergency'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-purple-300/80 hover:text-purple-100 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-purple-100 font-semibold text-lg">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-300/80 hover:text-purple-100 transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-purple-300/80 hover:text-purple-100 transition-colors text-sm">Research Papers</a></li>
              <li><a href="#" className="text-purple-300/80 hover:text-purple-100 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-purple-300/80 hover:text-purple-100 transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-purple-100 font-semibold text-lg">Connect</h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/Github-HarshTripathi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-100 transition-colors p-2 rounded-lg bg-purple-900/20 hover:bg-purple-900/40"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/harsh-tripathi-9a71aa252/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-100 transition-colors p-2 rounded-lg bg-purple-900/20 hover:bg-purple-900/40"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:tripathiharsh202@email.com" 
                className="text-purple-300 hover:text-purple-100 transition-colors p-2 rounded-lg bg-purple-900/20 hover:bg-purple-900/40"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-4 border-t border-neon-purple/20">
              <p className="text-purple-300/70 text-sm">
                Need immediate help? Visit our <a href="#emergency" className="text-neon-pink hover:underline">Emergency page</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neon-purple/20 mt-12 pt-8 text-center">
          <p className="text-purple-300/80 text-sm flex items-center justify-center gap-2">
            Crafted with <FiHeart className="text-neon-pink w-4 h-4" /> by Harsh Tripathi • © {currentYear} MindMaTe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;