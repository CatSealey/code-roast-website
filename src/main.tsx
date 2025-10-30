import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BusinessIntelligence from './components/BusinessIntelligence';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/main.css';

const App: React.FC = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Services />
      <BusinessIntelligence />
      <About />
      <Contact />
    </main>
    <Footer />
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
