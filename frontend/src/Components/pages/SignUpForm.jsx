import React, { useState } from 'react';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState({});

    const validarFormulario = () => {
        let erroresLocales = {};

        if (!nombre.trim()) {
            erroresLocales.nombre = 'El nombre es obligatorio';
        }

        if (!apellido.trim()) {
            erroresLocales.apellido = 'El apellido es obligatorio';
        }

        if (!correo.trim()) {
            erroresLocales.correo = 'El correo electrónico es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            erroresLocales.correo = 'Formato de correo electrónico no válido';
        }

        if (password.length < 4) {
            erroresLocales.password = 'La contraseña debe tener al menos 4 caracteres';
        }

        setErrores(erroresLocales);
        return Object.keys(erroresLocales).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            console.log('Formulario válido. Enviar datos...');
        } else {
            console.log('Formulario inválido. Corrige los errores.');
        }
    };
    return (
        <div className="flex items-center justify-center h-screen md:w-1/2">
            <div className='mx-auto'>
                <h2 className='text-3xl font-bold text-center my-4'>Crear cuenta</h2>
                <form onSubmit={handleSubmit} className="bg-[#f2ebc3] p-8 rounded shadow-md">
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                        </label>
                        <input
                            placeholder='Nombre'
                            type="text"
                            id="nombre"
                            className={`w-full px-3 py-2 border rounded-md ${errores.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">
                        </label>
                        <input
                            placeholder='Apellido'
                            type="text"
                            id="apellido"
                            className={`w-full px-3 py-2 border rounded-md ${errores.apellido ? 'border-red-500' : 'border-gray-300'}`}
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                        {errores.apellido && <p className="text-red-500 text-xs mt-1">{errores.apellido}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="correo" className="block text-gray-700 text-sm font-bold mb-2">
                        </label>
                        <input
                            placeholder='Correo electrónico'
                            type="email"
                            id="correo"
                            className={`w-full px-3 py-2 border rounded-md ${errores.correo ? 'border-red-500' : 'border-gray-300'}`}
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                        {errores.correo && <p className="text-red-500 text-xs mt-1">{errores.correo}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        </label>
                        <input
                            placeholder='Escribe una contraseña'
                            type="password"
                            id="password"
                            className={`w-full px-3 py-2 border rounded-md ${errores.password ? 'border-red-500' : 'border-gray-300'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errores.password && <p className="text-red-500 text-xs mt-1">{errores.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Formulario;