import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Geografia from "./pages/Geografia";
import Deportes from "./pages/Deportes";
import Tecnologia from "./pages/Tecnologia";
import Aleatorio from "./pages/Aleatorio";
import EditorCuestionario from "./pages/creacionCuestionarios/EditorCuestionario";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/geografia" element={<Geografia />} />
        <Route path="/deportes" element={<Deportes />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/aleatorio" element={<Aleatorio />} />
        <Route path="/editor" element={<EditorCuestionario />} />
      </Routes>
    </Router>
  );
}

