import React from 'react';
import { 
  FaBookOpen, 
  FaGamepad, 
  FaBolt, 
  FaGraduationCap, 
  FaCommentDots,
  FaGithub,
  FaTwitter,
  FaDiscord
} from 'react-icons/fa';

export default function Footer() {
  const links = [
    { label: 'Documentação', href: '#', icon: <FaBookOpen className="w-5 h-5" />, description: 'Guia completo da API' },
    { label: 'Playground', href: '#', icon: <FaGamepad className="w-5 h-5" />, description: 'Teste a API em tempo real' },
    { label: 'Quick Start', href: '#', icon: <FaBolt className="w-5 h-5" />, description: 'Comece em 5 minutos' },
    { label: 'Guias Avançados', href: '#', icon: <FaGraduationCap className="w-5 h-5" />, description: 'Tutoriais detalhados' },
    { label: 'Suporte', href: '#', icon: <FaCommentDots className="w-5 h-5" />, description: 'Ajuda e suporte técnico' },
  ];

  return (
    <footer className="relative bg-[var(--color-panel)] backdrop-blur-xl">
      <div className="relative max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* Logo e marca */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 lg:mb-12">
          <div className="flex items-center gap-3 group">
              <img 
                src="/images/logo.png" 
                alt="SolutPag" 
                className="h-8 w-8"
              />
            <div className="flex flex-col">
              <span className="text-[var(--color-text)] font-semibold text-lg">SolutPag API</span>
              <span className="text-[var(--color-muted)] text-sm">v2.0.0</span>
            </div>
          </div>

          {/* Links sociais */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="h-10 w-10 rounded-full flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="h-10 w-10 rounded-full flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-all hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="h-10 w-10 rounded-full flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-all hover:scale-110"
              aria-label="Discord"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Grid de links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 lg:mb-12">
          {links.map((link) => (
            <div key={link.label} className="group">
              <a 
                href={link.href}
                className="block p-4 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-panel)] hover:border-[var(--color-primary)]/40 transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl text-[var(--color-muted)]">{link.icon}</span>
                  <span className="text-[var(--color-text)] font-semibold text-sm transition-colors">
                    {link.label}
                  </span>
                </div>
                <p className="text-[var(--color-muted)] text-xs leading-relaxed">
                  {link.description}
                </p>
              </a>
            </div>
          ))}
        </div>

        {/* Rodapé inferior */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6">
          <div className="text-center lg:text-left">
            <p className="text-[var(--color-muted)] text-sm">
              © 2024 SolutPag. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-xs text-[var(--color-muted)]">
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
              Cookies
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}