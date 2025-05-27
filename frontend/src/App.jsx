import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Geografia from "./pages/Geografia";
import Deportes from "./pages/Deportes";
import Tecnologia from "./pages/Tecnologia";
import Aleatorio from "./pages/Aleatorio";
import EditorCuestionario from './pages/creacionCuestionarios/EditorCuestionario';
import VistaCuestionario from './pages/creacionCuestionarios/VistaCuestionario';

import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geografia" element={<Geografia />} />
        <Route path="/deportes" element={<Deportes />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/aleatorio" element={<Aleatorio />} />

        <Route path="/editor" element={<EditorCuestionario />} />
        <Route path="/cuestionario" element={<VistaCuestionario />} />  

      </Routes>
    </Router>
  );
}

export default App;

