import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Inicio from "./componenetes/Inicio";
// import Navegacion from "./componenetes/Navegacion";
// import Tabla from "./componenetes/Tabla";

function App() {
   // ********************* estados *********************************
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          {/* <Route path="/navegacion"  element={<Navegacion />} />
          <Route path="/tabla"  element={<Tabla/>} /> */}
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
