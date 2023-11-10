import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input placeholder='Correo electronico'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <br />
            <label>
                <input placeholder='Contraseña'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)
                    }
                />
            </label>
            <br />
            <button className='iniciarSesionButton' type="submit">Iniciar Sesión</button>
            
            <label className='noTienesCuenta'>No tienes cuenta? <Link to="/">Crea una</Link></label>
        </form>
    );
};

export default LoginForm;