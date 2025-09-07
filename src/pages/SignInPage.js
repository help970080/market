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

  // Generar username automático basado en el email si está vacío
  const generateUsernameFromEmail = (email) => {
    return email.split('@')[0] + Math.floor(Math.random() * 1000);
  };

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
        // Validar que el username no esté vacío
        let finalUsername = username.trim();
        if (!finalUsername) {
          finalUsername = generateUsernameFromEmail(email);
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: finalUsername
            }
          }
        });
        
        if (authError) throw authError;

        // Insertar perfil en la tabla profiles con username garantizado
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              username: finalUsername,
              email: email
            });

          if (profileError) {
            console.error("Error creando perfil:", profileError);
            // Si falla por username duplicado, generar uno único
            if (profileError.code === '23505') {
              const uniqueUsername = generateUsernameFromEmail(email);
              await supabase
                .from('profiles')
                .insert({
                  id: authData.user.id,
                  username: uniqueUsername,
                  email: email
                });
            }
          }
        }

        setMessage('Registro exitoso. Revisa tu correo para confirmar.');
        // Limpiar formulario
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error("Error completo:", error);
      setMessage(error.message || 'Error durante el registro. Intenta de nuevo.');
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
              <label className="block text-gray-700 font-medium mb-2">
                Nombre de Usuario *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  required={!isSignIn}
                  placeholder="Ej: juan123"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {!username ? 'Se generará uno automáticamente si lo dejas vacío' : ''}
              </p>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email *</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                required
                placeholder="tu@email.com"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Contraseña *</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                required
                minLength="6"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>
          {message && (
            <div className={`mb-4 p-3 rounded-xl text-center font-semibold ${
              message.includes('Error') || message.includes('error') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}
          <motion.button
            type="submit"
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center font-semibold text-lg disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Procesando...' : isSignIn ? 'Iniciar Sesión' : 'Registrarse'}
          </motion.button>
        </form>
        <button
          onClick={() => {
            setIsSignIn(!isSignIn);
            setMessage('');
          }}
          className="w-full mt-4 text-center text-blue-600 font-semibold hover:underline"
        >
          {isSignIn ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
        </button>
      </div>
    </motion.div>
  );
};

export default SignInPage;