/**
 * MobileMenu - Menu de navegação móvel
 * Design moderno com glassmorphism, animações suaves e acessibilidade WCAG 2.1
 * @version 2.0.0
 */
import React from 'react';
import { FaClipboardList, FaLightbulb, FaPlug, FaTimes, FaSearch } from 'react-icons/fa';

export default function MobileMenu({ isOpen, sections, activeSectionId, onSelectSection, onClose }) {
  const categories = [
    { key: 'introduction', label: 'Introdução', icon: <FaClipboardList className="w-4 h-4" /> },
    { key: 'concepts', label: 'Conceitos', icon: <FaLightbulb className="w-4 h-4" /> },
    { key: 'endpoints', label: 'Endpoints', icon: <FaPlug className="w-4 h-4" /> },
  ];

  const handleItemClick = (itemId) => {
    onSelectSection(itemId);
    onClose && onClose();
  };

  return (
    <>
      {/* Backdrop com animação */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-all duration-300 md:hidden z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      
      {/* Menu móvel */}
      <nav 
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] sm:max-w-[80vw] bg-gray-900 backdrop-blur-xl shadow-2xl transition-transform duration-300 md:hidden z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Menu de navegação móvel"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabeçalho do menu */}
        <div className="px-6 py-5 flex items-center justify-between bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-gray-100 font-bold text-sm">API</span>
            </div>
            <span className="text-gray-100 font-semibold text-lg">Navegação</span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-800 flex items-center justify-center transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40"
            aria-label="Fechar menu"
          >
            <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-gray-100 transition-colors" />
          </button>
        </div>

        {/* Conteúdo do menu */}
        <div className="h-full overflow-y-auto py-6">
          {/* Barra de busca */}
          <div className="px-6 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="w-4 h-4 text-[var(--color-muted)]" />
              </div>
              <input
                type="text"
                placeholder="Buscar endpoint..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40 focus:border-blue-500/30 transition-all"
                disabled
                aria-label="Buscar na documentação"
              />
            </div>
          </div>

          {categories.map(cat => {
            const items = sections.filter(s => s.category === cat.key);
            if (!items.length) return null;
            
            return (
              <div key={cat.key} className="px-6 mb-6">
                {/* Cabeçalho da categoria */}
                <div className="flex items-center space-x-2 px-4 py-3 mb-3 bg-gray-700 backdrop-blur-md rounded-xl">
                  <span className="text-gray-400">{cat.icon}</span>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    {cat.label}
                  </h3>
                </div>

                {/* Lista de itens */}
                <ul className="space-y-2">
                  {items.map(item => {
                    const isActive = activeSectionId === item.id;
                    
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleItemClick(item.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40 ${
                            isActive 
                              ? 'bg-gray-700 backdrop-blur-md shadow-lg' 
                              : 'bg-gray-800 hover:bg-gray-700 backdrop-blur-sm'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium transition-colors ${
                              isActive ? 'text-gray-100' : 'text-gray-400 hover:text-gray-100'
                            }`}>
                              {item.title}
                            </span>
                            {isActive && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          {isActive && (
                            <div className="mt-2">
                              <div className="w-6 h-0.5 bg-blue-500 rounded-full"></div>
                            </div>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Rodapé do menu */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-800 to-transparent">
          <div className="text-center">
            <p className="text-xs text-gray-400">
              SolutPag API v2.0
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Documentação completa
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}