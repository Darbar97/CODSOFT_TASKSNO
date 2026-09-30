import React from 'react';
import { Download, FileText, Printer, CheckCircle2, GraduationCap, Award, MapPin } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_LIST } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="resume" className="py-20 bg-white dark:bg-[#121215] border-t border-zinc-200/80 dark:border-zinc-800 transition-colors scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-2">
              Curriculum Vitae &amp; Documentation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-heading">
              Official Resume &amp; Academic Credentials
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              Download the official PDF resume of Premkumar Parmar or view verified academic records and certifications online.
            </p>
          </div>
        </ScrollReveal>

        {/* Resume Action & Preview Card */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="bg-[#fafaf9] dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 md:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Summary of Credentials */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Ready for Download • PDF Document (A4/Letter)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50 font-heading">
                    Premkumar Parmar — Software Engineering Resume
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Includes verified diploma course records at ITM SLS Baroda University, comprehensive frontend and AI technical skillsets, final-year authentication portal architecture, and credentials from SCALER, TCS iON, and IBM SkillsBuild.
                  </p>
                </div>

                {/* Key Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Diploma in CSE (2023–2026)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>University CGPA: 6.59 / 10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Frontend &amp; AI Specialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Halol, Gujarat, India</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    id="section-download-resume-btn"
                    href="/premkumar-parmar-resume.pdf"
                    download="premkumar-parmar-resume.pdf"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer w-full sm:w-auto text-center"
                    title="Download premkumar-parmar-resume.pdf"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume (PDF)</span>
                  </a>

                  <button
                    id="section-view-resume-modal-btn"
                    type="button"
                    onClick={onOpenResume}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-xl transition-colors shadow-2xs cursor-pointer w-full sm:w-auto text-center"
                  >
                    <FileText className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    <span>Open Digital Viewer</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Document Badge Card */}
              <div className="lg:col-span-5 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/90 dark:border-zinc-700 p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    File Details
                  </span>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    PDF 1.4 Format
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Document Name:</span>
                    <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200">premkumar-parmar-resume.pdf</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Applicant:</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{PERSONAL_INFO.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Legal Name:</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{PERSONAL_INFO.legalName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Location:</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Institution:</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">ITM SLS Baroda University</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-700">
                  <a
                    href="/premkumar-parmar-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-700/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    <span>View in Browser Tab</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
