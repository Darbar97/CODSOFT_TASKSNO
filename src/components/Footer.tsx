import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail, Heart, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="portfolio-footer" className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal direction="up">
          {/* Top Row: Identity & Social Links */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 pb-8 border-b border-zinc-800/80 text-center lg:text-left">
            
            {/* Brand & Tagline */}
            <div className="space-y-1.5 max-w-xl">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="text-xl font-bold text-white font-heading">
                  {PERSONAL_INFO.name}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Open to Opportunities
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Computer Science &amp; Engineering Student | Frontend Developer | AI Enthusiast • Halol, Gujarat, India
              </p>
            </div>

            {/* Social Profiles & Back to Top */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-xl transition-all"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-xl transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2.5 text-pink-400 hover:text-pink-300 hover:bg-zinc-900 border border-zinc-800/80 hover:border-pink-900/50 rounded-xl transition-all"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="p-2.5 text-emerald-400 hover:text-emerald-300 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-900/50 rounded-xl transition-all"
                title="WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email Me"
                className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-xl transition-all"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              
              <button
                id="back-to-top-btn"
                type="button"
                onClick={scrollToTop}
                className="ml-1 p-2.5 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors cursor-pointer"
                title="Back to Top"
                aria-label="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Dedicated Navigation Bar: Clean, Evenly Spaced, No Awkward Breaks */}
          <nav aria-label="Footer Navigation" className="py-2">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 sm:gap-x-8 gap-y-3 text-xs sm:text-sm font-medium text-zinc-300">
              <a href="#about" className="hover:text-white transition-colors py-1">About</a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <a href="#projects" className="hover:text-white transition-colors py-1">Projects</a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <a href="#skills" className="hover:text-white transition-colors py-1">Skills</a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <a href="#certifications" className="hover:text-white transition-colors py-1">Certifications</a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <a href="#resume" className="hover:text-white transition-colors py-1">Resume</a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <a href="#contact" className="hover:text-white transition-colors py-1">Contact</a>
            </div>
          </nav>

          {/* Bottom Attribution */}
          <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Premkumar Parmar. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-zinc-500">
              <span>Built with React, TypeScript &amp; Tailwind CSS</span>
              <span>•</span>
              <span className="text-emerald-500/80 font-medium">Core Web Vitals Monitored</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
