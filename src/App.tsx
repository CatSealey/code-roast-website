import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Contact from './components/Contact';
import Footer from './components/Footer';

const MainPage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Intro />
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
      </Routes>
    </Router>
  );
}

export default App;