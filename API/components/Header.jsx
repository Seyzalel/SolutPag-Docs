import React from 'react';
import { FaBars, FaTimes, FaGithub } from 'react-icons/fa';

export default function Header({ 
  title = "API SolutPag", 
  onToggleMobileMenu,
  isMobileMenuOpen = false 
}) {

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Botão do menu móvel e título */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700/50 border border-gray-600/50 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-gray-200 font-bold text-xs">API</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-100 tracking-tight">
                {title}
              </h1>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/eloydotdev/solutpag"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-colors border border-transparent hover:border-gray-700"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            
            {/* Botão de login futuro */}
            {/* <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500">
              Dashboard
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}