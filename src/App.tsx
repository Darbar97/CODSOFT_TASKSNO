/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { ScrollProgress } from './components/ScrollProgress';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { Project, Certification } from './types';

function PortfolioApp() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  // Default to false for fastest First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
  const [isDataFetching, setIsDataFetching] = useState(false);
  const fetchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current !== null) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  const handleSimulateFetch = () => {
    setIsDataFetching(true);
    if (fetchTimeoutRef.current !== null) {
      clearTimeout(fetchTimeoutRef.current);
    }
    fetchTimeoutRef.current = window.setTimeout(() => {
      setIsDataFetching(false);
      fetchTimeoutRef.current = null;
    }, 950);
  };

  // Global keyboard shortcut for Command Menu: ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 dark:selection:bg-zinc-100 selection:text-white dark:selection:text-zinc-900 transition-colors overflow-x-hidden w-full relative">
      {/* Scroll Progress Bar & Floating Scroll to Top */}
      <ScrollProgress />

      {/* Navigation Bar with Quick Jump Command Trigger */}
      <Navbar 
        onOpenResume={() => setResumeModalOpen(true)} 
        onOpenCommand={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero onOpenResume={() => setResumeModalOpen(true)} />
        <About />
        <Projects 
          externalSelectedProject={selectedProject}
          onClearExternalProject={() => setSelectedProject(null)}
          isLoading={isDataFetching}
        />
        <Skills 
          isLoading={isDataFetching}
        />
        <Certifications 
          externalSelectedCert={selectedCert}
          onClearExternalCert={() => setSelectedCert(null)}
          isLoading={isDataFetching}
        />
        <ResumeSection onOpenResume={() => setResumeModalOpen(true)} />
        <Contact />
      </main>

      {/* Interactive Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
        onSimulateFetch={handleSimulateFetch}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCert={(cert) => {
          setSelectedCert(cert);
          document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Global Digital Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Core Web Vitals (LCP, INP, CLS) Performance Monitor */}
      <PerformanceMonitor
        logToConsole={true}
        reportToAnalytics={true}
        enableDevWidget={true}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
