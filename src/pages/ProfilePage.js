import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, ShoppingBag, Truck } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      const fetchData = async () => {
        try {
          // Obtener datos del usuario desde Firestore
          const profileRef = doc(db, 'users', user.uid);
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
            setProfile(profileSnap.data());
          }

          // Obtener los productos del usuario
          const productsCol = collection(db, 'products');
          const q = query(productsCol, where('seller_id', '==', user.uid), orderBy('createdAt', 'desc'));
          const productsSnapshot = await getDocs(q);
          
          const productsList = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setProducts(productsList);

        } catch (err) {
          console.error("Error fetching data:", err);
          setError("No pudimos cargar tus datos. Intenta de nuevo.");
        } finally {
          setDataLoading(false);
        }
      };

      fetchData();
    }
  }, [user, authLoading, navigate]);

  if (authLoading || dataLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <UserCircle className="w-12 h-12 text-blue-500" />
        </motion.div>
        <p className="ml-4 text-lg text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

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
        <h3 className="text-2xl font-semibold text-gray-800">{profile?.username || 'Usuario'}</h3>
        <p className="text-gray-600">{profile?.email || user?.email}</p>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Mis Productos a la Venta</h3>
        {products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-xl">No tienes productos publicados.</p>
            <p className="text-gray-500 mt-2">¡Sube tu primer producto para empezar a vender!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;