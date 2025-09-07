import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage('Sesión iniciada con éxito. Redirigiendo...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        // El código para insertar el perfil del usuario se ha eliminado.
        // Ahora, el trigger de la base de datos se encarga de esto.

        setMessage('Registro exitoso. Revisa tu correo para confirmar.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 pt-20 md:pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isSignIn ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>
        <form onSubmit={handleAuth}>
          {!isSignIn && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Nombre de Usuario</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  required
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                required
              />
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center font-semibold text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Cargando...' : isSignIn ? 'Iniciar Sesión' : 'Registrarse'}
          </motion.button>
        </form>
        {message && (
          <p className="mt-4 text-center text-gray-600 font-semibold">{message}</p>
        )}
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="w-full mt-4 text-center text-blue-600 font-semibold hover:underline"
        >
          {isSignIn ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
        </button>
      </div>
    </motion.div>
  );
};

export default SignInPage;