import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { DollarSign, Tag, User, Clock, Image, Video, AlertCircle, ArrowLeft, MessageSquare, Exchange } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories ( name ),
            users ( username, email )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Producto no encontrado. ¡Se esfumó!");

        setProduct({
          ...data,
          category_name: data.categories.name,
          seller_username: data.users.username,
          seller_email: data.users.email
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("No pudimos cargar los detalles del producto. ¿Se lo comió un duende?");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    alert('¡Felicidades! Has simulado la compra. En una app real, aquí iría el proceso de pago y confirmación.');
    // Aquí iría la lógica para crear una transacción en la base de datos
  };

  const handleExchange = () => {
    alert('¡Intercambio iniciado! Ahora podrías seleccionar qué producto ofreces.');
    // Aquí iría la lógica para iniciar un intercambio
  };

  const handleNextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const handlePrevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Clock className="w-12 h-12 text-purple-500" />
        </motion.div>
        <p className="ml-4 text-lg text-gray-600">Buscando el producto... ¡No te desesperes!</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-500 text-xl font-semibold">{error}</p>
        <p className="text-gray-500 mt-2">Parece que este producto no existe o se perdió en el ciberespacio.</p>
        <motion.button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver al inicio
        </motion.button>
      </div>
    );
  }

  if (!product) {
    return null; // No debería pasar si error se maneja correctamente
  }

  const hasMedia = (product.images && product.images.length > 0) || (product.videos && product.videos.length > 0);

  return (
    <motion.div
      className="container mx-auto px-4 py-8 pt-20 md:pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow-sm hover:bg-gray-300 transition-colors duration-200 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
      </motion.button>

      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:flex lg:gap-8">
        {hasMedia && (
          <div className="lg:w-1/2 relative mb-6 lg:mb-0">
            <AnimatePresence mode="wait">
              {product.images && product.images.length > 0 && (
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-2xl bg-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x400?text=Sin+Imagen'; }}
                />
              )}
              {product.videos && product.videos.length > 0 && !product.images && (
                <motion.video
                  key={product.videos[0]} // Assuming only one video for simplicity
                  src={product.videos[0]}
                  controls
                  className="w-full h-96 object-contain rounded-2xl bg-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {product.images && product.images.length > 1 && (
              <>
                <motion.button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </motion.button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                  {product.images.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: index === currentImageIndex ? 1.2 : 0.8 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-700">{product.price.toFixed(2)} {product.currency}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Tag className="w-5 h-5 text-purple-600" />
              <span className="text-lg font-medium">{product.category_name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-medium">Vendido por: {product.seller_username}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="text-lg font-medium">Condición: {product.condition}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <motion.button
              onClick={handleBuyNow}
              className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center font-semibold text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Comprar al Recibir
            </motion.button>
            <motion.button
              onClick={handleExchange}
              className="flex-1 px-6 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center font-semibold text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Exchange className="w-5 h-5 mr-2" /> Intercambiar
            </motion.button>
          </div>
          <motion.button
            onClick={() => alert('¡Chat iniciado! Aquí se abriría la ventana de chat con el vendedor.')}
            className="w-full mt-4 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl shadow-md hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center font-semibold text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-5 h-5 mr-2" /> Chatear con el vendedor
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;