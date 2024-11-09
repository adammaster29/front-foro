import axios from "axios";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";

const Navegacion = ({ buscador, setBuscador }) => {
  // ************estados************
  const [menu, setMenu] = useState(false); //  ESTADO DEL MENU
  const [modalAgregar, setModalAgregar] = useState(false); // ESTADO DE AGREGAR TEMAS
  const [modalLogin, setModaLogin] = useState(false); // ESTADO DE LOGIN
  const [NombreLogin, setNombreLogin] = useState([]); // estado de la apis para mostrar del login
  const [loading, setLoading] = useState(false); // ESTADO DE LA CARGA loading
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ************funciones**********

  // funcion del menu
  const menuAmburguesa = () => setMenu(!menu);
  const AgregarTemas = () => setModalAgregar(!modalAgregar)
  const closeModal = () => setModalAgregar(false);
  const login = () => setModaLogin(!modalLogin);
  const closeLogin = () => setModaLogin(false);
  // ***************** consumo de apis *******************
  useEffect(() => {
    axios
      .get("https://foro-lq03.onrender.com/api/auth/usuarios")
      .then((res) => setNombreLogin(res.data))
      .catch((error) =>
        console.log("errror al llamar la apis del nombre del login", error)
      );
  }, []);
  console.warn("aqui esta la apis del login");
  console.log(NombreLogin);

  //  apis para crear un tema nuevo
  const onSubmit = async (data) => {
    // Verificar que los campos "titulo" y "contenido" no estén vacíos
    if (!data.titulo || !data.contenido) {
      console.log("Campos incompletos");
      return;
    }
  
    console.log("Datos enviados:", data); // Verifica los valores antes de enviar
  
    setLoading(true);
    try {
      // Enviar los datos como JSON (si la API lo permite)
      const response = await axios.post(
        "https://foro-lq03.onrender.com/api/temas/crear",
        {
          titulo: data.titulo,
          contenido: data.contenido,
        },
        {
          headers: {
            "Content-Type": "application/json", // Cambiado a application/json
          },
        }
      );
  
      console.log("Tema agregado:", response.data);
      closeModal(); // Cierra el modal solo si la solicitud fue exitosa
    } catch (error) {
      // Verifica si hay una respuesta del servidor y muestra el mensaje de error
      if (error.response) {
        console.log("Error en la respuesta de la API:", error.response.data);
      } else {
        console.log("Error al llamar a la API:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  //  apis para loguearse
  const onSubmit2 = async (data) => {
    if (!data.correo || !data.contraseña) return;
  
    setLoading(true);
    try {
      const response = await axios.post(
        "https://foro-lq03.onrender.com/api/auth/login",
        {
          correo: data.correo,
          contraseña: data.contraseña,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Almacena el token en el localStorage tras un inicio de sesión exitoso
      localStorage.setItem("token", response.data.token);
      console.log("Login exitoso:", response.data);
      closeLogin(); // Cierra el modal solo si la solicitud fue exitosa
    } catch (error) {
      console.log("Error al llamar a la API:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="padre_Navbar">
      <div className="hijo_Navbar">
        <h1 class="text-4xl font-bold text-center text-blue-600 my-8">
          Foro De Programación
        </h1>

        <div className="contenedor_MenuAmburguesa">
          <p>{NombreLogin.nombre}</p>
          <i onClick={menuAmburguesa} className="bx bx-menu text-blue-700"></i>
        </div>
      </div>
      {menu && (
        <div className="hijo_Navbar">
          <div className="contenedor_input">
            <i className="bx bx-search-alt"></i>
            <input
              value={buscador}
              onChange={(event) => setBuscador(event.target.value)}
              type="text"
              placeholder="Buscar"
              className="w-3/5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="contenedor_Button">
            {/* button con tailwind */}
            <span
              onClick={login}
              className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
              Login
            </span>
            {modalLogin && (
              <div className="padreLogin">
                <form onSubmit2={handleSubmit(onSubmit)}  className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
                    <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                      Login
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        {...register("correo", { required: true })}
                        placeholder=""
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500">
                        Correo
                      </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        {...register("contraseña", { required: true })}
                        placeholder=""
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500">
                        Contraseña
                      </label>
                    </div>
                    <div>
                      <p
                        onClick={() => modalLogin(false)}
                        className=" text-red-600 font-bold   cursor-pointer "
                      >
                        {" "}
                        Salir
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      type="submit"
                      className="block w-full select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Ingresar
                    </button>
                    <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                      No tienes una cuenta?
                      <a
                        className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased"
                        href="#signup"
                      >
                        Registrarse
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            )}
            {/*   para poner a rotar un btn cuando lo preciones con tailwind   transition-all group active:w-11 active:h-11 active:rounded-full active:duration-300 ease-in-out  */}
            <button
              onClick={AgregarTemas}
              class="cursor-pointer w-44 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg "
            >
              <svg
                class="animate-spin hidden group-active:block mx-auto"
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1792 0.129353C10.6088 0.646711 8.22715 1.74444 6.16886 3.36616C4.13416 4.96799 2.42959 7.14686 1.38865 9.48493C0.202866 12.1414 -0.241805 15.156 0.125386 18.0413C0.684593 22.4156 3.02922 26.3721 6.63375 29.0186C8.01155 30.0301 9.65549 30.8757 11.2725 31.3997C12.0405 31.6518 13.4857 32 13.7518 32H13.8361V30.7232V29.4464L13.762 29.4331C11.8485 29.0252 10.2787 28.3818 8.7493 27.3802C7.50961 26.5644 6.29688 25.4402 5.40416 24.2794C3.88824 22.3095 2.98206 20.0908 2.66203 17.5736C2.57781 16.8905 2.57781 15.1029 2.66203 14.4396C2.88773 12.7317 3.31556 11.3288 4.06678 9.863C5.88589 6.3045 9.23103 3.67791 13.1286 2.746C13.4352 2.67303 13.7182 2.60671 13.762 2.59676L13.8361 2.58349V1.29009C13.8361 0.577066 13.8327 -0.00330353 13.8293 1.33514e-05C13.8226 1.33514e-05 13.5329 0.0597076 13.1792 0.129353Z"
                  fill="white"
                ></path>
                <path
                  d="M19.563 1.38627V2.67967L19.7078 2.71615C20.8768 3.01463 21.7527 3.32968 22.6723 3.78071C24.8249 4.84528 26.6878 6.467 28.042 8.47011C29.248 10.251 29.9858 12.2375 30.2654 14.4562C30.3126 14.831 30.326 15.1792 30.326 16.0149C30.326 17.169 30.2923 17.5869 30.1205 18.5022C29.7365 20.575 28.8404 22.5681 27.5266 24.2761C26.8158 25.2014 25.8019 26.2029 24.862 26.9027C23.3056 28.0634 21.7324 28.7997 19.7078 29.3137L19.563 29.3502V30.6436V31.9403L19.691 31.9204C20.0616 31.8541 21.1362 31.5689 21.6516 31.4031C24.8216 30.365 27.6041 28.3951 29.6152 25.7652C30.2789 24.8996 30.7337 24.1667 31.2356 23.1618C31.8959 21.8419 32.3102 20.6479 32.5999 19.2318C33.4354 15.1394 32.6606 10.9441 30.417 7.40886C28.4126 4.24833 25.3067 1.8373 21.692 0.640079C21.1867 0.470943 20.038 0.169149 19.7078 0.112772L19.563 0.0895557V1.38627Z"
                  fill="white"
                ></path>
              </svg>
              <span class="group-active:hidden">Agregar Tema</span>
            </button>
            {/* modal para agregar temas */}
            {modalAgregar && (
              <div className="padreModal">
                <div class="flex flex-col items-center justify-center h-screen">
                  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Temas</h2>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      class="flex flex-col"
                    >
                      <input
                        {...register("titulo", { required: true })}
                        type="text"
                        class="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        placeholder="Agregar Titulo"
                      />
                      {/* <input type="password" class="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Agregar Contenido"/>
                       */}
                      <textarea
                        {...register("contenido", { required: true })}
                        type='text'
                        placeholder="Agregar Contenido"
                        className="border-2 border-gray-300 rounded-md p-4 w-full h-40 resize-none focus:border-blue-500 focus:outline-none shadow-md"
                        name="contenido"
                        id="contenido"
                        cols="50"
                        rows="10"
                      ></textarea>

                      <div class="flex items-center justify-between flex-wrap">
                      </div>
                      <button
                        type="submit"
                        class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                      >
                        Agregar
                      </button>
                      <button
                        onClick={() => setModalAgregar(false)}
                        type="submit"
                        class="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-red-600 transition ease-in-out duration-150"
                      >
                        Salir
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navegacion;
