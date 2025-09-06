import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { PlusCircle, Tag, DollarSign, Image as ImageIcon } from 'lucide-react';

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Aún no implementamos la lógica de autenticación para obtener el user_id
    // Por ahora, usamos un valor por defecto o un ID de prueba
    const user_id = 'c1301c36-e886-45ef-89ac-fe673752e04e'; 

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: productName,
            description: description,
            price: parseFloat(price),
            user_id: user_id,
            // Agrega más campos aquí como category_id, condition, etc.
          },
        ]);

      if (error) throw error;

      setMessage('¡Producto agregado con éxito!');
      setProductName('');
      setDescription('');
      setPrice('');

    } catch (err) {
      console.error("Error adding product:", err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 pt-20 md:pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Sube tu Producto
      </h2>
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nombre del Producto</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 h-32"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Precio (MXN)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            {message && <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>}
          </div>
          <motion.button
            type="submit"
            className="w-full mt-6 px-6 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center font-semibold text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Subiendo...' : 'Publicar Producto'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddProductPage;