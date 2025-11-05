import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Brews from './components/Brews';
import BrewsPage from './pages/BrewsPage';
import RoastsPage from './pages/RoastsPage';
import Roasts from './components/Roasts';

const MainPage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Intro />
      <Brews />
      <Roasts />
      <About />
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
        <Route path="/brewspage" element={<BrewsPage />} />
        <Route path="/roastspage" element={<RoastsPage />} />
      </Routes>
    </Router>
  );
}

export default App;