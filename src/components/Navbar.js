import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, User, Plus, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-lg z-50 md:relative md:top-0 md:shadow-none md:border-none md:bg-transparent"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 17 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-around items-center md:justify-between md:py-4">
        <Link to="/" className="hidden md:block">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DE TODO UN POCO
          </motion.h1>
        </Link>

        <div className="flex w-full md:w-auto justify-around md:gap-8">
          <NavLink to="/" icon={Home} label="Inicio" />
          <NavLink to="/search" icon={Search} label="Buscar" />
          <NavLink to="/add-product" icon={Plus} label="Vender" />
          <NavLink to="/profile" icon={User} label="Perfil" />
          <NavLink to="/menu" icon={Menu} label="Más" className="md:hidden" />
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, icon: Icon, label, className = '' }) => (
  <Link to={to} className={`flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 ${className}`}>
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full"
    >
      <Icon className="w-6 h-6" />
    </motion.div>
    <span className="text-xs font-medium mt-1 hidden md:block">{label}</span>
  </Link>
);

export default Navbar;