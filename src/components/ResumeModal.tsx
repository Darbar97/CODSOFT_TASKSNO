import React, { useState, useEffect, useRef } from 'react';
import { X, Printer, Copy, Check, ExternalLink, Download, FileText } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS, EDUCATION_LIST } from '../data/portfolioData';
import { copyToClipboardSafe } from '../utils/clipboard';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key to dismiss modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = async () => {
    const resumeText = `
PREMKUMAR PARMAR
Computer Science & Engineering Student | Frontend Developer | AI Enthusiast
Halol, Gujarat, India | Phone: ${PERSONAL_INFO.phone} | WhatsApp: ${PERSONAL_INFO.whatsappNumber}
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

ABOUT ME
${PERSONAL_INFO.bio}

EDUCATION
1. Diploma in Computer Science & Engineering (2023–2026)
   ITM SLS Baroda University — CGPA: 6.59 | Enrollment No: 23C11086
   (Parmar Premkumar Rajeshkumar / Diploma Engineering)
2. Secondary School Certificate (SSC, 10th Grade) (2023)
   GSEB Board, Gujarat — Percentage: 61.16%

TECHNICAL SKILLS
- Programming Languages: Python, JavaScript, C
- Web Technologies: React, HTML5, CSS3, Tailwind CSS
- Developer Tools & Platforms: Git, GitHub, Vercel, MS Office
- Core CS & Emerging Tech: DBMS, SQL, KMP Pattern Matching, Generative AI, AI Agents

PROJECTS
1. Web Application & Authentication Portal (Final Year Project, 2026)
   Tech: React, JavaScript, CSS3, Vercel
   Live: https://frontend-five-nu-xvp54qnk44.vercel.app
   - Designed and developed a responsive web portal featuring client-side form validation, secure user authentication workflows, and interactive login interfaces.
   - Implemented reusable, modular component architecture ensuring seamless cross-browser compatibility and mobile responsiveness.
   - Configured continuous integration and production deployment via Git and Vercel hosting.

2. Personal Portfolio Website (Responsive Web Design, 2025–2026)
   Tech: HTML5, CSS3, JavaScript, React, Tailwind CSS
   Live: https://personal-portfolio-zeta-three-20.vercel.app
   - Built a clean, modern personal portfolio website to showcase technical competencies, projects, and certifications.
   - Designed adaptive layouts with fluid UI styling optimized for mobile screens, tablets, and desktop browsers.

CERTIFICATIONS
- DBMS Course - Master the Fundamentals and Advanced Concepts — SCALER Topics (Cert ID: SCALER-DBMS-2026), 10 September 2026
- String Pattern Matching: KMP Algorithm — SCALER Topics (Cert ID: SCALER-KMP-2026), 10 September 2026
- IIBF Business Correspondent Certificate (Basic) — Indian Institute of Banking & Finance (Reg No: 802906457), July 2026
- Generative AI Essentials — TCS iON (Cert ID: 8773-32296296-1016), June 2026
- Build an AI Agent — IBM SkillsBuild (Credly Verified), May 2026
- YUVA AI For All — TCS iON & IndiaAI, May 2026

PERSONAL DETAILS
- Languages Known: English, Hindi, Gujarati
- Interests & Hobbies: Music, Sports, Gaming, Exploring AI Tools
    `.trim();

    const success = await copyToClipboardSafe(resumeText);
    if (success) {
      setCopied(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      id="digital-resume-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-zinc-950/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-3.5 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileText className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
            <span id="resume-modal-title" className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 font-heading truncate">
              Digital Resume<span className="hidden sm:inline"> — Premkumar Parmar</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href="/premkumar-parmar-resume.pdf"
              download="premkumar-parmar-resume.pdf"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              title="Download PDF file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
              title="Copy plain text CV"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span className="hidden sm:inline">Copy Text</span>
                  <span className="sm:hidden">Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Resume Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Canvas */}
        <div className="p-4 sm:p-8 sm:p-10 max-h-[82dvh] sm:max-h-[75vh] overflow-y-auto space-y-6 sm:space-y-7 text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 print:p-0">
          
          {/* Resume Header */}
          <div className="border-b-2 border-zinc-900 dark:border-zinc-100 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 uppercase tracking-tight font-heading">
                PREMKUMAR PARMAR
              </h2>
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 italic mt-0.5">
                Computer Science &amp; Engineering Student | Frontend Developer | AI Enthusiast
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                <span>{PERSONAL_INFO.location}</span>
                <span>•</span>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:underline text-zinc-800 dark:text-zinc-200">
                  {PERSONAL_INFO.phone}
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-600 dark:text-emerald-400 font-medium">
                  WhatsApp: {PERSONAL_INFO.whatsappNumber}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline text-zinc-800 dark:text-zinc-200">
                  {PERSONAL_INFO.email}
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-blue-400 font-medium">
                  LinkedIn
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-800 dark:text-zinc-200 font-medium">
                  GitHub
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline text-pink-600 dark:text-pink-400 font-medium">
                  Instagram
                </a>
              </div>
            </div>

            {/* Quick Badge */}
            <div className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Status</span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Available For Hire</span>
            </div>
          </div>

          {/* Section: About Me */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              ABOUT ME
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Section: Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              EDUCATION
            </h3>
            <div className="space-y-3">
              {EDUCATION_LIST.map((edu) => (
                <div key={`${edu.institution}-${edu.duration}`} className="space-y-0.5">
                  <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
                    <span>{edu.degree}</span>
                    <span className="font-normal text-zinc-600 dark:text-zinc-400 text-xs">{edu.duration}</span>
                  </div>
                  <div className="text-xs text-zinc-700 dark:text-zinc-300 flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{edu.institution}</span>
                    <span>—</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{edu.grade}</span>
                    {edu.enrollmentNo && (
                      <>
                        <span>|</span>
                        <span className="text-zinc-600 dark:text-zinc-400">Enrolment: {edu.enrollmentNo}</span>
                      </>
                    )}
                  </div>
                  {edu.enrollmentNo && (
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                      Legal Name (University Records): Parmar Premkumar Rajeshkumar | Course: Diploma Engineering (DE) | Passout Batch: 2026
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              TECHNICAL SKILLS
            </h3>
            <div className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <p>
                <strong className="font-semibold text-zinc-950 dark:text-zinc-100">Programming Languages:</strong> Python, JavaScript, C
              </p>
              <p>
                <strong className="font-semibold text-zinc-950 dark:text-zinc-100">Web Technologies:</strong> React, HTML5, CSS3, Tailwind CSS
              </p>
              <p>
                <strong className="font-semibold text-zinc-950 dark:text-zinc-100">Developer Tools &amp; Platforms:</strong> Git, GitHub, Vercel, MS Office
              </p>
              <p>
                <strong className="font-semibold text-zinc-950 dark:text-zinc-100">AI Competencies:</strong> Generative AI Essentials, AI Agents, Prompt Engineering
              </p>
            </div>
          </div>

          {/* Section: Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              PROJECTS
            </h3>
            
            {/* Project 1 */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
                <span>Web Application &amp; Authentication Portal (Final Year Project)</span>
                <span className="font-normal text-zinc-600 dark:text-zinc-400 text-xs">2026</span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 flex flex-wrap items-center gap-2">
                <span>React, JavaScript, CSS3, Vercel</span>
                <span>|</span>
                <a 
                  href="https://frontend-five-nu-xvp54qnk44.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline font-medium"
                >
                  Live: frontend-five-nu-xvp54qnk44.vercel.app
                </a>
              </div>
              <ul className="list-disc list-inside text-xs text-zinc-700 dark:text-zinc-300 space-y-1 pt-1 leading-relaxed">
                <li>Designed and developed a responsive web portal featuring client-side form validation, secure user authentication workflows, and interactive login interfaces.</li>
                <li>Implemented reusable, modular component architecture ensuring seamless cross-browser compatibility and mobile responsiveness.</li>
                <li>Configured continuous integration and production deployment via Git and Vercel hosting.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
                <span>Personal Portfolio Website (Responsive Web Design)</span>
                <span className="font-normal text-zinc-600 dark:text-zinc-400 text-xs">2025 – 2026</span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 flex flex-wrap items-center gap-2">
                <span>HTML5, CSS3, JavaScript, React, Tailwind CSS</span>
                <span>|</span>
                <a 
                  href="https://personal-portfolio-zeta-three-20.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline font-medium"
                >
                  Live: personal-portfolio-zeta-three-20.vercel.app
                </a>
              </div>
              <ul className="list-disc list-inside text-xs text-zinc-700 dark:text-zinc-300 space-y-1 pt-1 leading-relaxed">
                <li>Built a clean, modern personal portfolio website to showcase technical competencies, projects, and certifications.</li>
                <li>Designed adaptive layouts with fluid UI styling optimized for mobile screens, tablets, and desktop browsers.</li>
              </ul>
            </div>
          </div>

          {/* Section: Certifications */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              CERTIFICATIONS
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.id} className="flex items-start gap-1.5">
                  <span className="text-zinc-400 dark:text-zinc-500">•</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{cert.title}</strong> — {cert.issuer}
                    {cert.certId && ` (Cert ID: ${cert.certId})`}
                    {cert.regNo && ` (Reg No: ${cert.regNo})`}
                    {`, ${cert.issueDate}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Personal Details */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              PERSONAL DETAILS
            </h3>
            <div className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
              <p>
                <strong className="font-semibold text-zinc-950 dark:text-zinc-100">Languages Known:</strong> English, Hindi, Gujarati
              </p>
              <p>
                <strong className="font-semibold text-zinc-950 dark:text-zinc-100">Interests &amp; Hobbies:</strong> Music, Sports, Gaming, Exploring AI Tools
              </p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:px-6 bg-zinc-50 dark:bg-zinc-800/60 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Official curriculum data matching CV records
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
