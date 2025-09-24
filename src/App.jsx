// App.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import Journal from "./pages/Journal";
import MoodTracker from "./components/MoodTracker";
import Quote from "./components/Quote";
import MeditationModule from "./components/MeditationModule";
import Emergency from "./pages/Emergency";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  
  // Sections के लिए refs create करें
  const sectionRefs = {
    home: useRef(null),
    chat: useRef(null),
    journal: useRef(null),
    mood: useRef(null),
    quotes: useRef(null),
    emergency: useRef(null),
    breathe: useRef(null)
  };

  // Scroll से section detect करने के लिए
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Navbar की height compensate करें

      // Find which section is currently in view
      const sections = Object.keys(sectionRefs);
      for (const section of sections) {
        const element = sectionRefs[section].current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section में scroll करने का function
  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId].current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
        <AnimatedBackground />
        <ScrollToTop />
        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
        
        <main className="relative z-10">
          {/* Home Section */}
          <section id="home" ref={sectionRefs.home}>
            <Home />
          </section>

          {/* Chat Section */}
          <section id="chat" ref={sectionRefs.chat}>
            <ChatBot />
          </section>

          {/* Journal Section */}
          <section id="journal" ref={sectionRefs.journal}>
            <Journal />
          </section>

          {/* Mood Section */}
          <section id="mood" ref={sectionRefs.mood}>
            <MoodTracker />
          </section>

          {/* Quotes Section */}
          <section id="quotes" ref={sectionRefs.quotes}>
            <Quote />
          </section>

          {/* Emergency Section */}
          <section id="emergency" ref={sectionRefs.emergency}>
            <Emergency />
          </section>

          {/* Meditation Section */}
          <section id="breathe" ref={sectionRefs.breathe}>
            <MeditationModule />
          </section>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}