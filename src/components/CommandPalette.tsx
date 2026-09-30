import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  FileText, 
  Download,
  ExternalLink, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Mail, 
  Phone, 
  MessageCircle, 
  Sun, 
  Moon, 
  Github, 
  Linkedin, 
  Instagram,
  Sparkles,
  ArrowRight,
  CornerDownLeft,
  Check,
  RefreshCw
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS } from '../data/portfolioData';
import { Project, Certification } from '../types';
import { useTheme } from '../context/ThemeContext';
import { copyToClipboardSafe } from '../utils/clipboard';
import { safeOpenUrl } from '../utils/navigation';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSelectProject?: (project: Project) => void;
  onSelectCert?: (cert: Certification) => void;
  onSimulateFetch?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Live Projects' | 'Certifications' | 'Quick Actions' | 'Contact';
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onSelectProject,
  onSelectCert,
  onSimulateFetch,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  // Scroll to section helper
  const scrollTo = (elementId: string) => {
    onClose();
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Copy helper
  const copyText = async (text: string, label: string) => {
    const success = await copyToClipboardSafe(text);
    if (success) {
      setCopiedAction(label);
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedAction(null);
        onClose();
      }, 1200);
    }
  };

  // Build command items
  const items: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Home & Hero Showcase',
      subtitle: 'Overview, 3D card & interactive tech cube',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
      action: () => scrollTo('home'),
    },
    {
      id: 'nav-about',
      title: 'About & Academic Foundations',
      subtitle: 'Biography, university details & ITM SLS Baroda',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects & Demos',
      subtitle: 'Live web applications & authentication portal',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills & Tooling',
      subtitle: 'JavaScript, React, Python, Tailwind CSS & AI tools',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-certifications',
      title: 'Verified Certifications',
      subtitle: 'SCALER Topics, TCS iON, IBM SkillsBuild credentials',
      category: 'Navigation',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      action: () => scrollTo('certifications'),
    },
    {
      id: 'nav-resume',
      title: 'Official Resume & Credentials',
      subtitle: 'Download PDF or inspect academic transcripts',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      action: () => scrollTo('resume'),
    },
    {
      id: 'nav-contact',
      title: 'Contact Channels & Message Form',
      subtitle: 'Email, direct WhatsApp chat, and inquiry form',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
      action: () => scrollTo('contact'),
    },

    // Live Projects
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      subtitle: proj.subtitle,
      category: 'Live Projects' as const,
      icon: <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      badge: proj.liveUrl ? 'Live App' : 'Project',
      action: () => {
        onClose();
        if (onSelectProject) {
          onSelectProject(proj);
        } else if (proj.liveUrl) {
          safeOpenUrl(proj.liveUrl, '_blank');
        } else {
          scrollTo('projects');
        }
      },
    })),

    // Certifications
    ...CERTIFICATIONS.map((cert) => ({
      id: `cert-${cert.id}`,
      title: cert.title,
      subtitle: `${cert.issuer} • ${cert.issueDate}`,
      category: 'Certifications' as const,
      icon: <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      badge: cert.verificationBadge || 'Verified',
      action: () => {
        onClose();
        if (onSelectCert) {
          onSelectCert(cert);
        } else {
          scrollTo('certifications');
        }
      },
    })),

    // Quick Actions
    {
      id: 'action-download-resume',
      title: 'Download Resume (PDF)',
      subtitle: 'Direct PDF download (premkumar-parmar-resume.pdf)',
      category: 'Quick Actions',
      icon: <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      badge: 'PDF',
      action: () => {
        onClose();
        const a = document.createElement('a');
        a.href = '/premkumar-parmar-resume.pdf';
        a.download = 'premkumar-parmar-resume.pdf';
        a.click();
      },
    },
    {
      id: 'action-resume',
      title: 'Open Digital Resume',
      subtitle: 'Printable formatted resume with verified details',
      category: 'Quick Actions',
      icon: <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      badge: 'Modal',
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'action-theme',
      title: `Switch to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`,
      subtitle: 'Toggle theme preference across the portfolio',
      category: 'Quick Actions',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'action-simulate-fetch',
      title: 'Simulate Data Fetch (Skeleton Shimmer)',
      subtitle: 'View skeleton loading states across projects, skills & certificates',
      category: 'Quick Actions',
      icon: <RefreshCw className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      badge: 'Skeleton UI',
      action: () => {
        onClose();
        if (onSimulateFetch) {
          onSimulateFetch();
        }
      },
    },
    {
      id: 'action-copy-email',
      title: 'Copy Email Address',
      subtitle: PERSONAL_INFO.email,
      category: 'Quick Actions',
      icon: <Mail className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
      badge: copiedAction === 'email' ? 'Copied!' : 'Copy',
      action: () => copyText(PERSONAL_INFO.email, 'email'),
    },
    {
      id: 'action-copy-phone',
      title: 'Copy Phone Number',
      subtitle: PERSONAL_INFO.phone,
      category: 'Quick Actions',
      icon: <Phone className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
      badge: copiedAction === 'phone' ? 'Copied!' : 'Copy',
      action: () => copyText(PERSONAL_INFO.phone, 'phone'),
    },
    {
      id: 'action-whatsapp',
      title: 'Chat on WhatsApp',
      subtitle: `Instant chat with ${PERSONAL_INFO.name}`,
      category: 'Contact',
      icon: <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      badge: 'External',
      action: () => {
        safeOpenUrl(PERSONAL_INFO.whatsapp, '_blank');
        onClose();
      },
    },
    {
      id: 'action-github',
      title: 'GitHub Profile & Repositories',
      subtitle: 'Explore open source code and project commits',
      category: 'Contact',
      icon: <Github className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
      badge: 'External',
      action: () => {
        safeOpenUrl(PERSONAL_INFO.github, '_blank');
        onClose();
      },
    },
    {
      id: 'action-linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'Connect with Premkumar Parmar on LinkedIn',
      category: 'Contact',
      icon: <Linkedin className="w-4 h-4 text-blue-700 dark:text-blue-400" />,
      badge: 'External',
      action: () => {
        safeOpenUrl(PERSONAL_INFO.linkedin, '_blank');
        onClose();
      },
    },
  ];

  // Filter items by query
  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.badge?.toLowerCase().includes(q)
    );
  });

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open & lock scroll
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Autofocus input
    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, filteredItems, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-20 px-3 sm:px-4 bg-zinc-950/60 dark:bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="command-palette-container"
        className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[85dvh] sm:max-h-[80vh] transition-all transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Menu"
      >
        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            id="command-palette-input"
            type="text"
            placeholder="Type a command, project, or skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          id="command-palette-results"
          role="listbox"
          aria-label="Search suggestions and quick actions"
          className="overflow-y-auto p-2 space-y-1 flex-1 max-h-[50dvh] sm:max-h-[420px]"
        >
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 dark:text-zinc-400 space-y-1.5">
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Try searching for &ldquo;React&rdquo;, &ldquo;Scaler&rdquo;, &ldquo;Resume&rdquo;, or &ldquo;Contact&rdquo;.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  data-index={index}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-950 dark:text-zinc-50 shadow-2xs'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <span className="text-xs sm:text-sm font-semibold block truncate">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block truncate">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300/50 dark:border-zinc-700/60">
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center text-zinc-400 dark:text-zinc-500">
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts bar */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="hidden xs:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-200/70 dark:bg-zinc-800 rounded font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-zinc-200/70 dark:bg-zinc-800 rounded font-mono text-[10px]">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-200/70 dark:bg-zinc-800 rounded font-mono text-[10px]">↵</kbd>
              <span>tap or press to select</span>
            </span>
          </div>
          <span className="hidden sm:inline text-[10px] text-zinc-400 dark:text-zinc-500">
            Parmar Premkumar • Portfolio Quick Jump
          </span>
        </div>
      </div>
    </div>
  );
};
