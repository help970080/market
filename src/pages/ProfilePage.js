import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, ShoppingBag, Truck } from 'lucide-react';

const ProfilePage = () => {
  // Aquí podrías agregar lógica para cargar los datos del usuario,
  // sus compras y sus productos a la venta.
  const user = {
    name: "Usuario Ejemplo",
    email: "ejemplo@detodounpoco.com",
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 pt-20 md:pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Mi Perfil
      </h2>
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-lg mx-auto text-center">
        <UserCircle className="w-24 h-24 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <ShoppingBag className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-700">Mis Compras</h4>
            <p className="text-gray-500 text-sm">Pronto verás aquí tus compras.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <Truck className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-700">Mis Ventas</h4>
            <p className="text-gray-500 text-sm">Pronto verás aquí tus productos vendidos.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;