import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Monitor, Globe, Gamepad2 } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const categorias = [
    {
      nombre: "Geografía",
      descripcion: "Explora países, capitales y mapas.",
      icono: <Globe className="w-12 h-12 mb-4 text-indigo-600" />,
      ruta: "/geografia",
    },
    {
      nombre: "Deportes",
      descripcion: "Pon a prueba tus conocimientos deportivos.",
      icono: <Gamepad2 className="w-12 h-12 mb-4 text-green-600" />,
      ruta: "/deportes",
    },
    {
      nombre: "Tecnología",
      descripcion: "Responde sobre software, hardware e innovación.",
      icono: <Monitor className="w-12 h-12 mb-4 text-blue-600" />,
      ruta: "/tecnologia",
    },
    {
      nombre: "Aleatorio",
      descripcion: "Un mix de todas las categorías.",
      icono: <Globe className="w-12 h-12 mb-4 text-yellow-500" />,
      ruta: "/aleatorio",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Plataforma de Cuestionarios</h1>
      <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
        ¡Pon a prueba tus conocimientos en distintas categorías! Selecciona una para comenzar.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {categorias.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200"
          >
            <div className="flex flex-col items-center">
              {cat.icono}
              <h2 className="text-xl font-semibold mb-2 text-gray-700">{cat.nombre}</h2>
              <p className="text-gray-500 mb-4 text-sm">{cat.descripcion}</p>
              <button
                onClick={() => navigate(cat.ruta)}
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
              >
                Ir a {cat.nombre}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
