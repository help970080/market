import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import ProductCard from '../components/ProductCard';
import { Rocket } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories ( name )
          `)
          .order('created_at', { ascending: false })
          .limit(12);

        if (error) throw error;

        setProducts(data.map(p => ({ ...p, category_name: p.categories.name })));
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No pudimos cargar los productos. ¡El internet nos odia!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="w-12 h-12 text-blue-500" />
        </motion.div>
        <p className="ml-4 text-lg text-gray-600">Cargando productos... ¡Casi listo!</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-xl">{error}</p>
        <p className="text-gray-500 mt-2">Intenta recargar la página o revisa tu conexión.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 pt-20 md:pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        Lo más nuevo en <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">DE TODO UN POCO</span>
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-xl">¡Vaya, parece que no hay nada por aquí todavía!</p>
          <p className="text-gray-500 mt-2">Sé el primero en subir un producto.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HomePage;