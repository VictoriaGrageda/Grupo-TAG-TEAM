import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Geografia from "./pages/Geografia";
import Deportes from "./pages/Deportes";
import Tecnologia from "./pages/Tecnologia";
import Aleatorio from "./pages/Aleatorio";
import EditorCuestionario from "./pages/creacionCuestionarios/EditorCuestionario";
import VistaCuestionario from "./pages/creacionCuestionarios/VistaCuestionario";
import { RutaPrivada } from "./PrivateRoutes";
import Registro from "./pages/Registro";
import { AuthProvider } from "./AuthContext"; // ✅ ENVOLVER CONTEXTO
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/home" element={<RutaPrivada><Home /></RutaPrivada>} />
          <Route path="/geografia" element={<RutaPrivada><Geografia /></RutaPrivada>} />
          <Route path="/deportes" element={<RutaPrivada><Deportes /></RutaPrivada>} />
          <Route path="/tecnologia" element={<RutaPrivada><Tecnologia /></RutaPrivada>} />
          <Route path="/aleatorio" element={<RutaPrivada><Aleatorio /></RutaPrivada>} />
          <Route path="/editor" element={<RutaPrivada><EditorCuestionario /></RutaPrivada>} />
          <Route path="/cuestionario" element={<RutaPrivada><VistaCuestionario /></RutaPrivada>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
