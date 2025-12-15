import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import foto from "./assets/sara.jpg";

import "./App.css";

export default function App() {
  const nombre = "Sara Meza";
  const fechaCumple = new Date("2025-12-15T00:00:00");

  const [tiempo, setTiempo] = useState({});
  const [termino, setTermino] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      const diferencia = fechaCumple - ahora;

      if (diferencia <= 0) {
        setTermino(true);
        clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
      const segundos = Math.floor((diferencia / 1000) % 60);

      setTiempo({ dias, horas, minutos, segundos });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container">
      {!termino ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="contador"
        >
          <h1>🎉 Cuenta regresiva 🎉</h1>
          <h2>Para los 16 años de {nombre}</h2>

          <div className="tiempo">
            <div><span>{tiempo.dias}</span>Días</div>
            <div><span>{tiempo.horas}</span>Horas</div>
            <div><span>{tiempo.minutos}</span>Min</div>
            <div><span>{tiempo.segundos}</span>Seg</div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="sorpresa"
        >
          <h1>🎂 Felices 16 años 🎂</h1>
          <h2>{nombre}</h2>
          <p>
            Que este día esté lleno de sonrisas, sueños cumplidos y momentos
            hermosos. ✨💖
          </p>

          {/* Foto de Sara */}
          <img
            src={foto}
            alt="Sara Meza"
            className="foto"
          />
        </motion.div>
      )}
    </div>
  );
}
