import React, { useState, useRef, useEffect } from 'react';
import { 
  Award, 
  Check, 
  Copy, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  ExternalLink,
  Layers,
  Search,
  RefreshCw
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types';
import { Card3D } from './Card3D';
import { CertificateModal } from './CertificateModal';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { CertificationsGridSkeleton } from './skeletons';
import { copyToClipboardSafe } from '../utils/clipboard';

interface CertificationsProps {
  externalSelectedCert?: Certification | null;
  onClearExternalCert?: () => void;
  isLoading?: boolean;
}

export const Certifications: React.FC<CertificationsProps> = ({
  externalSelectedCert,
  onClearExternalCert,
  isLoading: parentLoading = false,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [internalSelectedCert, setInternalSelectedCert] = useState<Certification | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);
  const fetchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      if (fetchTimeoutRef.current !== null) {
        window.clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  const isLoading = parentLoading || localLoading;

  const handleSimulateFetch = () => {
    setLocalLoading(true);
    if (fetchTimeoutRef.current !== null) {
      window.clearTimeout(fetchTimeoutRef.current);
    }
    fetchTimeoutRef.current = window.setTimeout(() => {
      setLocalLoading(false);
      fetchTimeoutRef.current = null;
    }, 850);
  };

  const selectedCert = externalSelectedCert !== undefined ? (externalSelectedCert || internalSelectedCert) : internalSelectedCert;

  const handleCloseModal = () => {
    setInternalSelectedCert(null);
    if (onClearExternalCert) {
      onClearExternalCert();
    }
  };

  const copyCertId = async (id: string, text: string) => {
    const success = await copyToClipboardSafe(text);
    if (success) {
      setCopiedId(id);
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedId(null);
        copyTimeoutRef.current = null;
      }, 2000);
    }
  };

  const categories = [
    { id: 'all', label: `All Certificates (${CERTIFICATIONS.length})` },
    { id: 'Core CS & Engineering', label: `Core CS & Scaler (${CERTIFICATIONS.filter(c => c.category === 'Core CS & Engineering').length})` },
    { id: 'AI & Emerging Tech', label: `AI & Emerging Tech (${CERTIFICATIONS.filter(c => c.category === 'AI & Emerging Tech').length})` },
    { id: 'Professional & Industry', label: `Banking & Professional (${CERTIFICATIONS.filter(c => c.category === 'Professional & Industry').length})` },
  ];

  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    if (activeCategory === 'all') return true;
    return cert.category === activeCategory;
  });

  return (
    <section id="certifications" className="py-20 bg-[#fafaf9] dark:bg-[#0c0c0e] transition-colors scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                  Verified Credentials &amp; 3D Inspection
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  <Sparkles className="w-2.5 h-2.5" />
                  2 Newly Added
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-heading">
                Technical &amp; AI Certifications
              </h2>
              <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                Verified certifications from SCALER Topics, TCS iON, IBM SkillsBuild, IndiaAI, and IIBF validating practical competencies in DBMS, KMP String Algorithms, Generative AI, and Autonomous Agents.
              </p>
            </div>

            {/* Category Filter Tabs & Refresh Action */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <div className="flex items-center gap-1.5 p-1 bg-zinc-200/70 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-x-auto no-scrollbar shrink-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSimulateFetch}
                disabled={isLoading}
                className="w-10 h-10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer shrink-0"
                title="Simulate data fetch (test skeleton loading)"
                aria-label="Simulate fetching certifications data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-zinc-900 dark:text-zinc-100' : ''}`} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Certifications 3D Grid or Skeleton State */}
        {isLoading ? (
          <div className="animate-in fade-in duration-200">
            <CertificationsGridSkeleton count={4} />
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCerts.map((cert) => {
            const certIdentifier = cert.certId || cert.regNo;
            return (
              <StaggerItem key={cert.id} className="h-full">
                <Card3D
                  id={`cert-card-3d-${cert.id}`}
                  maxTilt={7}
                  className="h-full"
                >
                <div
                  id={`cert-card-${cert.id}`}
                  className={`h-full bg-white dark:bg-zinc-900 rounded-2xl border p-6 sm:p-7 flex flex-col justify-between space-y-5 transition-all shadow-xs ${
                    cert.isFeatured
                      ? 'border-amber-400/80 dark:border-amber-500/50 ring-1 ring-amber-400/20'
                      : 'border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Issuer & Status Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          {cert.issuer}
                        </span>
                        {cert.isFeatured && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                            <Sparkles className="w-2.5 h-2.5" />
                            Featured
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3" />
                        {cert.issueDate}
                      </span>
                    </div>

                    {/* Title & Badge */}
                    <div>
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 font-heading">
                        {cert.title}
                      </h3>
                      {cert.verificationBadge && (
                        <span className="inline-block mt-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/60">
                          ✓ {cert.verificationBadge}
                        </span>
                      )}
                      {cert.description && (
                        <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {/* Identifier (Cert ID or Reg No) */}
                    {certIdentifier && (
                      <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 flex items-center justify-between gap-2">
                        <div className="truncate">
                          <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 block">
                            {cert.regNo ? 'Registration Number' : 'Certificate ID'}
                          </span>
                          <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 select-all truncate block">
                            {certIdentifier}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyCertId(cert.id, certIdentifier);
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded border border-zinc-300 dark:border-zinc-700 transition-colors shrink-0 cursor-pointer"
                          title="Copy credential ID"
                        >
                          {copiedId === cert.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 dark:text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                              <span>Copy ID</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Skills Covered Tags */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                        Curriculum &amp; Skills Covered
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skillsCovered.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & 3D Inspector trigger */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setInternalSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Inspect in 3D</span>
                    </button>

                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Verified Credential</span>
                    </div>
                  </div>
                </div>
              </Card3D>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        )}

        {/* Certificate Inspection Modal */}
        <CertificateModal
          certification={selectedCert}
          onClose={handleCloseModal}
        />

      </div>
    </section>
  );
};
