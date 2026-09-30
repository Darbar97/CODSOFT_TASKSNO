import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText, Send, Github, Linkedin, Instagram, Mail, Sun, Moon, MessageCircle, Search } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommand?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenCommand }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);

        // Bottom of page check
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
          setActiveSection('contact');
          rafRef.current = null;
          return;
        }

        const sections = ['home', 'about', 'projects', 'skills', 'certifications', 'resume', 'contact'];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 180 && rect.bottom >= 180) {
              setActiveSection(section);
              break;
            }
          }
        }
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Resume', href: '#resume' },
  ];

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo / Brand */}
          <a
            href="#home"
            id="nav-brand-link"
            className="flex items-center gap-2.5 group text-zinc-900 dark:text-zinc-100 focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm tracking-tight transition-transform group-hover:scale-105 shadow-xs shrink-0">
              PP
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-sm sm:text-base tracking-tight leading-none text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors whitespace-nowrap">
                Premkumar Parmar
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-tight hidden sm:inline whitespace-nowrap mt-1">
                Frontend Developer &amp; AI Enthusiast
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  className={`px-3 py-1.5 h-9 inline-flex items-center text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-zinc-950 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 font-semibold shadow-2xs'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Quick Command / Search Button */}
            {onOpenCommand && (
              <button
                id="nav-search-cmd-btn"
                type="button"
                onClick={onOpenCommand}
                className="flex items-center gap-2 px-2.5 h-9 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100/90 dark:bg-zinc-800/90 hover:bg-zinc-200/90 dark:hover:bg-zinc-700/90 border border-zinc-200 dark:border-zinc-700 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
                title="Search & Quick Jump (⌘K / Ctrl+K)"
                aria-label="Search and Quick Jump"
              >
                <Search className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span className="hidden xl:inline whitespace-nowrap">Quick Jump</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 shrink-0">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer shrink-0"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700 transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Get in Touch CTA */}
            <a
              id="nav-contact-cta"
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 h-9 text-xs sm:text-sm font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <Send className="w-3.5 h-3.5 shrink-0" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="flex md:hidden items-center gap-1">
            {/* Mobile Search Button */}
            {onOpenCommand && (
              <button
                id="mobile-search-btn"
                type="button"
                onClick={onOpenCommand}
                className="w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                aria-label="Search and Quick Jump"
                title="Search (⌘K)"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Theme Toggle */}
            <button
              id="mobile-theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            <button
              id="mobile-resume-btn-quick"
              type="button"
              onClick={onOpenResume}
              className="w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
              aria-label="View Resume"
              title="View Resume"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div 
            id="mobile-menu-backdrop" 
            className="fixed inset-0 top-16 sm:top-20 z-30 bg-zinc-950/50 backdrop-blur-xs md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div 
            id="mobile-navigation-drawer" 
            className="relative z-40 md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[calc(100dvh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-150"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] px-3.5 py-2.5 text-base font-medium rounded-xl flex items-center transition-colors ${
                      isActive
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-semibold'
                        : 'text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2.5">
              {onOpenCommand && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommand();
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-zinc-500" />
                  <span>Quick Jump &amp; Search (⌘K)</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white rounded-xl shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Contact Premkumar Parmar</span>
              </a>
            </div>
            <div className="flex items-center justify-center gap-3 pt-3 text-zinc-600 dark:text-zinc-400">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 hover:text-pink-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:text-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email Address"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
