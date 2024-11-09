import axios from "axios";
import { useEffect, useState } from "react";
import Navegacion from "./Navegacion";

const Tabla = () => {
  // ********************* estados *********************************
  const [temas, setTemas] = useState([]); //esatdo de la api
  const [buscador, setBuscador] = useState(""); //estdo de BUSCAR

  // *********************consumo de apis************************

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://foro-lq03.onrender.com/api/temas/listar"
        );
        console.log("Datos de la API:", res.data); // Verifica que aquí ves los datos
        setTemas(res.data); // Asegúrate de que res.data sea un array
      } catch (error) {
        console.log("Error al consumir la API", error);
      }
    };

    fetchData();
  }, []);
  // ********************* funcion *********************************
  const Buscar = () => {
    if (!Array.isArray(temas)) {
      console.error("temas no es un array:", temas);
      return [];
    }
    return temas.filter((tema) =>
      tema.titulo.toLowerCase().includes(buscador.toLowerCase())
    );
  };

  // ********************* constantes *********************************
  const temasfiltrados = Buscar();
  console.log(temas);
  return (
    <div className="padre_tabla">
        <Navegacion buscador={buscador} setBuscador={setBuscador} />
      <table>
        <thead>
          <tr>
            <th>Temas</th>
            <th>Comentarios</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {temasfiltrados?.length > 0 ? (
            temasfiltrados?.map((tema) => (
              <tr key={tema.id}>
                <td>{tema.titulo}</td>
                <td>3</td>
                <td>
                  <i className="bx bx-edit"></i>
                </td>
                <td>
                  <i className="bx bx-x"></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay temas disponibles o la API no responde</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
