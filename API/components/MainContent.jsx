/**
 * MainContent - Área principal de conteúdo
 * Layout moderno com gradientes e espaçamento premium
 * @version 2.0.0
 */
import React from 'react';
import SectionContent from './SectionContent';

export default function MainContent({ activeSection }) {
  return (
    <main className="flex-1 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <SectionContent section={activeSection} />
      </div>
    </main>
  );
}