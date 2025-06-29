import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Introduccion";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Geografia from "./pages/categorias/Geografia";
import Deportes from "./pages/categorias/Deportes";
import Tecnologia from "./pages/categorias/Tecnologia";
import Aleatorio from "./pages/categorias/Aleatorio";
import EditorCuestionario from "./pages/creacionCuestionarios/EditorCuestionario";
import Categoria from "./pages/categorias/Categoria";
import VistaCuestionario from "./pages/creacionCuestionarios/VistaCuestionario";
import { RutaPrivada } from "./PrivateRoutes";
import Registro from "./pages/auth/Registro";
import { AuthProvider } from "./AuthContext";
import "./App.css";
import "./index.css"
import ListaCuestionarios from "./pages/categorias/ListaCuestionarios";
import CuestionarioPorCategoria from "./pages/creacionCuestionarios/CuestionarioPorCategoria";


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
      <Route path="/cuestionarios" element={<RutaPrivada><CuestionarioPorCategoria /></RutaPrivada>} />

      {/* ✅ Ruta correcta y única para categorías */}
      <Route path="/categoria/:categoria" element={<RutaPrivada><Categoria /></RutaPrivada>} />
    </Routes>
  </Router>
</AuthProvider>

  );
}

export default App;
