import React, { useState, useRef, useEffect } from 'react';
import { X, ShieldCheck, Award, Calendar, Copy, Check, Printer, Sparkles } from 'lucide-react';
import { Certification } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { copyToClipboardSafe } from '../utils/clipboard';

interface CertificateModalProps {
  certification: Certification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certification, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const certRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!certification) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

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
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [certification, onClose]);

  if (!certification) return null;

  const certIdentifier = certification.certId || certification.regNo || 'VERIFIED-CREDENTIAL';

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!certRef.current) return;

    const rect = certRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = -((y - centerY) / centerY) * 10;
      const rotY = ((x - centerX) / centerX) * 10;

      setTilt({ x: rotX, y: rotY });
    });
  };

  const handlePointerLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setTilt({ x: 0, y: 0 });
  };

  const handleCopyId = async () => {
    const success = await copyToClipboardSafe(certIdentifier);
    if (success) {
      setCopied(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="certificate-viewer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="flex flex-wrap items-center justify-between p-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span id="cert-modal-title" className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 font-heading truncate">
              {certification.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopyId}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Copied ID</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Certificate Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Certificate Container */}
        <div className="p-4 sm:p-8 bg-zinc-100/70 dark:bg-zinc-950 flex flex-col items-center justify-center perspective-1200">
          <div
            ref={certRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
            className="relative w-full max-w-2xl select-none preserve-3d"
          >
            {/* Custom Interactive 3D Diploma Layout */}
            <div className="relative w-full bg-white dark:bg-zinc-900 border-8 border-double border-amber-600/50 dark:border-amber-500/40 rounded-xl p-6 sm:p-10 shadow-2xl space-y-6">
              {/* Background Guilloche watermark pattern */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] rounded-lg" />

              {/* Certificate Header */}
              <div className="text-center space-y-1.5 border-b border-amber-600/30 pb-4">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                    {certification.issuer}
                  </span>
                </div>
                <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
                  Official Certificate of Technical Completion
                </h2>
              </div>

              {/* Recipient Statement */}
              <div className="text-center space-y-3 py-2">
                <p className="text-xs sm:text-sm italic text-zinc-600 dark:text-zinc-400">
                  This verified credential is proud to certify that
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-heading">
                  {(certification.recipient || PERSONAL_INFO.name).toUpperCase()}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
                  has successfully fulfilled all curriculum requirements, practical examinations, and competencies for:
                </p>
                <div className="py-2 px-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 inline-block">
                  <span className="text-base sm:text-xl font-bold text-amber-900 dark:text-amber-200 font-heading">
                    {certification.title}
                  </span>
                </div>
              </div>

              {/* Skills & Curriculum Tags */}
              <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block text-center">
                  Curriculum Core Competencies
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {certification.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md border border-zinc-200 dark:border-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certificate Footer Meta: Seal, ID, Issue Date */}
              <div className="pt-4 border-t border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    {certification.regNo ? 'Official Reg Number' : 'Certificate Verification ID'}
                  </span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 select-all">
                    {certIdentifier}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-500 text-[11px] justify-center sm:justify-start">
                    <Calendar className="w-3 h-3" />
                    <span>Conferred: {certification.issueDate}</span>
                  </div>
                </div>

                {/* 3D Holographic Metallic Seal */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 text-amber-950 flex flex-col items-center justify-center p-1 shadow-md border-2 border-amber-700/60 font-bold text-[9px] uppercase tracking-tighter text-center">
                    <Sparkles className="w-3.5 h-3.5 mb-0.5" />
                    <span>VERIFIED</span>
                    <span className="text-[8px] font-semibold">AUTHENTIC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3D interactive tip */}
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center italic pt-2">
              (Interactive 3D Perspective: Move cursor across the certificate to tilt in 3D space)
            </p>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:px-6 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>Official accreditation record conforming to student portfolio records.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
