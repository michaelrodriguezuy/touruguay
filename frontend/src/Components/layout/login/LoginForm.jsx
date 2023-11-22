import React, { useContext, useState } from "react";
//import App from "../../App.css";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //logueo contra la base
  const { loginUser } = useContext(DataContext);

  //logueo para el contexto
  const { handleLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const validateForm = () => {
    let validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Ingrese su correo electronico";
    }

    if (!password.trim()) {
      validationErrors.password = "Ingrese su contraseña";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        console.log("Formulario válido. Iniciando sesion...");
        const userLogged = await loginUser({
          username: email,
          password: password,          
        });

        if (userLogged !== null && userLogged !== undefined) {
          console.log("Usuario logueado con éxito.");
          
          handleLogin(userLogged);
          navigate("/");
        } else {
          console.log("Error al intentar loguearse.");
        }
      } else {
        console.log("Formulario inválido. Corrige los errores.");
      }
    } catch (error) {
      console.log("Error al intentar loguearse:", error);
    }
  };

  return (
    <div className="relative top-[-100px] flex items-center justify-center md:w-1/2">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold text-center my-4"></h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-t from-cyan-700 via-sky-200 to-cyan-700 p-8 rounded-lg"
        >
          <div className="mb-4">
            <img
              src="/public/TOURuguaySinFondo.png"
              class="h-80 w-auto block mx-auto"
              alt="Logo"
            />
            <input
              placeholder="Ingrese su correo electronico"
              type="email"
              id="email"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              placeholder="Ingrese su contraseña"
              type="password"
              id="password"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="block mx-auto bg-[#202A44] hover:bg-[#131928] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
