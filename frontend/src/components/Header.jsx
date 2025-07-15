import { motion } from "framer-motion";
import { Link2, Github, Twitter } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full py-6 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="p-2 bg-blue-500 rounded-xl">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">ShortLink</span>
        </motion.div>

        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </a>
          <a href="#analytics" className="text-gray-600 hover:text-gray-900 transition-colors">
            Analytics
          </a>
        </nav>

        
        <div className="flex items-center space-x-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://github.com/RahulSH004"
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://x.com/rahul6904"
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;