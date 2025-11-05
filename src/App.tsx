import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import BusinessIntelligence from './components/BusinessIntelligence';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Learning from './components/Learning';
import Community from './pages/Community';

const MainPage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Intro />
      <Learning />
      <About />
      <BusinessIntelligence />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;