import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, DollarSign, Image } from 'lucide-react';

const ProductCard = ({ product }) => {
  // Usamos un servicio de redimensionamiento si está disponible, o la URL original
  // Esto es un ejemplo, en un entorno real usarías un servicio como Cloudinary, Imgix, o una función de Supabase Edge Functions
  const getOptimizedImageUrl = (url, width = 400, height = 300) => {
    // Ejemplo de cómo podrías manipular la URL si tuvieras un servicio de optimización
    // Para Supabase Storage, podrías usar transformaciones si las configuras
    // Por ahora, solo devolvemos la URL original o un placeholder
    return url || 'https://via.placeholder.com/400x300?text=Sin+Imagen';
  };

  const imageUrl = product.images && product.images.length > 0
    ? getOptimizedImageUrl(product.images[0])
    : 'https://via.placeholder.com/400x300?text=Sin+Imagen';

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy" // Esto habilita la carga perezosa
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=Error+al+cargar'; }}
          />
          {product.images && product.images.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Image className="w-3 h-3" /> {product.images.length}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-blue-600 font-bold text-xl">
              <DollarSign className="w-5 h-5" />
              <span>{product.price.toFixed(2)} {product.currency}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Tag className="w-4 h-4" />
              <span>{product.category_name || 'Sin Categoría'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;