import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Instagram,
  ArrowRight, 
  FileText, 
  Download,
  Check, 
  Copy, 
  GraduationCap, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Box,
  MessageCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Card3D } from './Card3D';
import { TechCube3D } from './TechCube3D';
import { copyToClipboardSafe } from '../utils/clipboard';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [heroViewMode, setHeroViewMode] = useState<'card' | 'cube'>('card');
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    const success = await copyToClipboardSafe(text);
    if (success) {
      setCopiedField(label);
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            
            {/* Status chip */}
            <div 
              id="hero-status-badge"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Open to Internships &amp; Junior Web Developer Opportunities</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 
                id="hero-name-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-heading"
              >
                <span className="block text-2xl sm:text-3xl font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  Hi, I&apos;m
                </span>
                {PERSONAL_INFO.name}
              </h1>
              <p 
                id="hero-role-title"
                className="text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300"
              >
                Frontend Developer &amp; AI Enthusiast
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Computer Science &amp; Engineering Student • Halol, Gujarat, India
              </p>
            </div>

            {/* Location & Quick Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span>ITM SLS Baroda University (2023–2026)</span>
              </div>
            </div>

            {/* Bio Narrative */}
            <p 
              id="hero-bio-summary"
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl"
            >
              Dedicated Computer Science &amp; Engineering student passionate about building functional, 
              responsive web applications and exploring modern AI technologies. Skilled in turning design 
              concepts into reliable web interfaces using modern frontend tools, with a strong focus on 
              clean code and performance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <a
                id="hero-explore-projects-btn"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white rounded-xl transition-colors shadow-xs w-full sm:w-auto text-center"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="hero-download-resume-btn"
                href="/premkumar-parmar-resume.pdf"
                download="premkumar-parmar-resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl transition-colors shadow-xs w-full sm:w-auto text-center"
                title="Download Official Resume PDF"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <button
                id="hero-resume-modal-btn"
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-xl transition-colors shadow-2xs cursor-pointer w-full sm:w-auto text-center"
              >
                <FileText className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>View Digital Resume</span>
              </button>

              <a
                id="hero-contact-anchor-btn"
                href="#contact"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 min-h-[44px] text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors w-full sm:w-auto text-center"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Direct Contact Links */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                id="hero-github-link"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
              </a>

              <a
                id="hero-linkedin-link"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
              </a>

              <a
                id="hero-instagram-link"
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-medium text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/40 hover:bg-pink-100 dark:hover:bg-pink-900/50 border border-pink-200 dark:border-pink-800/60 rounded-lg transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                <span>Instagram</span>
                <ExternalLink className="w-2.5 h-2.5 text-pink-400" />
              </a>

              <a
                id="hero-whatsapp-link"
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/80 rounded-lg transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
                <ExternalLink className="w-2.5 h-2.5 text-emerald-500/70" />
              </a>

              {/* Quick Copy Email */}
              <button
                id="hero-copy-email-btn"
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>{PERSONAL_INFO.email}</span>
                {copiedField === 'email' ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-zinc-400" />
                )}
              </button>

              {/* Quick Copy Phone */}
              <button
                id="hero-copy-phone-btn"
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
                title="Click to copy phone number"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>{PERSONAL_INFO.phone}</span>
                {copiedField === 'phone' ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-zinc-400" />
                )}
              </button>
            </div>

            {copiedField && (
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                ✓ {copiedField === 'email' ? 'Email' : 'Phone number'} copied to clipboard!
              </div>
            )}
          </motion.div>

          {/* Profile & Showcase Card Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-center w-full"
          >
            
            {/* 3D View Switcher */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700/80 mb-3 shadow-2xs max-w-full">
              <button
                type="button"
                onClick={() => setHeroViewMode('card')}
                aria-pressed={heroViewMode === 'card'}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  heroViewMode === 'card'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>3D Profile</span>
              </button>
              <button
                type="button"
                onClick={() => setHeroViewMode('cube')}
                aria-pressed={heroViewMode === 'cube'}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  heroViewMode === 'cube'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>3D Tech Cube</span>
              </button>
            </div>

            {heroViewMode === 'cube' ? (
              <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    3D Tech Space
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                    Core Technical Ecosystem
                  </h3>
                </div>
                <TechCube3D />
              </div>
            ) : (
              <Card3D maxTilt={7} className="w-full" id="hero-profile-card-3d">
                <div 
                  id="hero-profile-card"
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden space-y-6"
                >
                  {/* Subtle top decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-900 dark:bg-zinc-100" />

                  {/* Profile Card Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src="/images/premkumar-parmar-profile.svg"
                        alt="Premkumar Parmar"
                        width="72"
                        height="72"
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 bg-zinc-900 shadow-xs"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-xs" title="Available for hire">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                          {PERSONAL_INFO.name}
                        </h2>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        Enrolment: 23C11086
                      </p>
                      <div className="inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-300">
                        <GraduationCap className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                        <span>Diploma in Computer Science</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Credentials Strip */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-700/60">
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">University CGPA</span>
                      <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">6.59 / 10</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">ITM SLS Baroda Univ.</span>
                    </div>
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-700/60">
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Certifications</span>
                      <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">4 Verified</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">TCS iON, IBM, IIBF</span>
                    </div>
                  </div>

                  {/* Core Skill Focus */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide uppercase">
                      Primary Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'JavaScript', 'HTML5', 'CSS3', 'Python', 'Git', 'Vercel', 'GenAI'].map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-md border border-zinc-200/60 dark:border-zinc-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Live Project Spotlight */}
                  <div className="p-3.5 bg-zinc-50/80 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/70 dark:border-zinc-700/70 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                        Featured Project
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Final Year 2026</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                      Web Application &amp; Authentication Portal
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">React • CSS3 • Vercel</span>
                      <a
                        href="https://frontend-five-nu-xvp54qnk44.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Resume Quick Action */}
                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-xl transition-colors cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    <span>Open Digital Resume &amp; Academic Records</span>
                  </button>

                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center italic">
                    (Interactive 3D Card: hover &amp; tilt with pointer)
                  </p>
                </div>
              </Card3D>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
