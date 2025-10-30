import React from 'react';

const Hero: React.FC = () => (
  <section className="gradient-bg text-white py-20 relative overflow-hidden">
    <div className="floating-shapes">
      <div className="shape">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="rgba(255,255,255,0.05)"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
      </div>
      <div className="shape">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,255,255,0.05)"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
      </div>
      <div className="shape">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="rgba(255,255,255,0.05)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
      </div>
    </div>
    <div className="container mx-auto px-6 text-center relative z-10">
      <h2 id="hero-title" className="text-5xl md:text-6xl font-bold mb-6 fade-in neon-text">
        Understanding Data Analysis & Business Intelligence
      </h2>
      <p id="hero-subtitle" className="text-xl md:text-2xl mb-8 opacity-90 fade-in typing-animation">
        Comprehensive insights into how data drives modern business decisions
      </p>
      <button id="cta-button" className="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold morphing-button pulse-animation shadow-2xl">
        Learn More
      </button>
      <div className="mt-16 max-w-7xl mx-auto">
        <div className="line-chart relative h-64">
          <svg width="100%" height="100%" viewBox="0 0 1000 240" className="overflow-visible">
            <path className="chart-line line1" d="M 0,216 L 50,212 L 100,230 L 150,210 L 200,204 L 250,216 L 300,202 L 350,196 L 400,130 L 450,194 L 500,190 L 550,184 L 600,196 L 650,180 L 700,60 L 750,100 L 800,170 L 850,164 L 900,170 L 950,120" stroke="#d05d09" strokeWidth={5} fill="none" />
            <path className="chart-line line2" d="M 0,230 L 50,216 L 100,210 L 150,220 L 200,170 L 250,180 L 300,162 L 350,160 L 400,190 L 450,140 L 500,122 L 550,120 L 600,50 L 650,100 L 700,110 L 750,80 L 800,90 L 850,60 L 900,50 L 950,20" stroke="#117374" strokeWidth={5} fill="none" />
          </svg>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
