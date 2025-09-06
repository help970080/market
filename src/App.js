import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import AddProductPage from './pages/AddProductPage'; // Importa el nuevo componente
import ProfilePage from './pages/ProfilePage'; // Importa el nuevo componente

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20 md:pb-0">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* Las siguientes rutas ahora usan los componentes reales */}
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/menu" element={
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-gray-800">Menú de opciones</h2>
                <p className="text-gray-600 mt-4">Más funcionalidades pronto.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}