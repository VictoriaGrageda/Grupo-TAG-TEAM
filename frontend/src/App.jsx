import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Geografia from './pages/Geografia';
import Deportes from './pages/Deportes';
import Tecnologia from './pages/Tecnologia';
import Aleatorio from './pages/Aleatorio';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geografia" element={<Geografia />} />
        <Route path="/deportes" element={<Deportes />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/aleatorio" element={<Aleatorio />} />
      </Routes>
    </Router>
  );
}

export default App;

