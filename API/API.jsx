import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import defaultSections from './data';
import ApiOverview from './components/ApiOverview';
import { FaInfoCircle, FaPlug } from 'react-icons/fa';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx';
import './themes.css';

function APIContent() {
  const [sections] = useState(defaultSections);
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  const activeSection = useMemo(
    () => sections.find(s => s.id === activeSectionId),
    [sections, activeSectionId]
  );

  const handleSelectSection = (id) => {
    setActiveSectionId(id);
    closeMobileMenu();
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="api-theme h-screen flex flex-col overflow-hidden text-white relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-scarlet/5 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-scarlet/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-scarlet/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-scarlet/3 to-transparent -z-20"></div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] -z-10"></div>
      <Header 
        title="SolutPag API" 
        isMobileMenuOpen={isMobileMenuOpen} 
        onToggleMobileMenu={toggleMobileMenu} 
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        sections={sections}
        activeSectionId={activeSectionId}
        onSelectSection={handleSelectSection}
        onClose={closeMobileMenu}
      />

      <div className="flex-1 flex relative z-10 overflow-hidden">
        <aside aria-labelledby="api-documentation" id="api-content" role="region" className="contents">
          <Sidebar
            sections={sections}
            activeSectionId={activeSectionId}
            onSelectSection={handleSelectSection}
          />
          <MainContent activeSection={activeSection} />
        </aside>
      </div>
    </div>
  );
}

export default function APIDocumentation() {
  return (
    <ThemeProvider>
      <APIContent />
    </ThemeProvider>
  );
}