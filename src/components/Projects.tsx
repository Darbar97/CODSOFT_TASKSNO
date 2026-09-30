import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Filter, Code2, Layers, RefreshCw } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { Card3D } from './Card3D';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { ProjectsGridSkeleton, LiveDeploymentsSkeleton } from './skeletons';

interface ProjectsProps {
  externalSelectedProject?: Project | null;
  onClearExternalProject?: () => void;
  isLoading?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ 
  externalSelectedProject, 
  onClearExternalProject,
  isLoading: parentLoading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [internalModalProject, setInternalModalProject] = useState<Project | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const fetchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
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

  const activeModalProject = externalSelectedProject !== undefined ? (externalSelectedProject || internalModalProject) : internalModalProject;

  const handleCloseModal = () => {
    setInternalModalProject(null);
    if (onClearExternalProject) {
      onClearExternalProject();
    }
  };

  const categories = ['All', 'Web Applications', 'Frontend', 'AI & Automation'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-[#fafaf9] dark:bg-[#0c0c0e] transition-colors scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-2">
                Featured Work &amp; 3D Project Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-heading">
                Practical software engineering &amp; modern web interfaces
              </h2>
              <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                Selected projects highlighting component modularity, client-side validation, authentication, and continuous deployment.
              </p>
            </div>

            {/* Category Filter Tabs & Refresh Action */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <div className="flex items-center gap-1.5 p-1 bg-zinc-200/70 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-x-auto no-scrollbar shrink-0">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      id={`filter-category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 min-h-[38px] text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleSimulateFetch}
                disabled={isLoading}
                className="w-10 h-10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-200/70 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer shrink-0"
                title="Simulate data fetch (test skeleton loading)"
                aria-label="Simulate fetching projects data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-zinc-900 dark:text-zinc-100' : ''}`} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Content or Skeleton Loading State */}
        {isLoading ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            <ProjectsGridSkeleton count={3} />
            <LiveDeploymentsSkeleton />
          </div>
        ) : (
          <>
            {/* Projects 3D Grid */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredProjects.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <Card3D
                id={`project-card-3d-${project.id}`}
                maxTilt={6}
                className="h-full"
              >
              <article
                id={`project-card-${project.id}`}
                className="group h-full flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl p-6 sm:p-7 transition-all duration-200 shadow-xs"
              >
                <div className="flex-1 flex flex-col space-y-4">
                  
                  {/* Project Image */}
                  {project.imageUrl && (
                    <div className="relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 aspect-[16/9] w-full shrink-0 shadow-2xs">
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt || `${project.title} - Premkumar Parmar`}
                        width={640}
                        height={360}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Meta Badge Row */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700">
                      {project.category}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-mono">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors font-heading">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Quick Highlights Preview */}
                  <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Key Highlights
                    </p>
                    <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                      {project.highlights.slice(0, 2).map((item, i) => (
                        <li key={`${project.id}-hl-${i}`} className="flex items-start gap-1.5">
                          <span className="text-zinc-400 mt-0.5">•</span>
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded border border-zinc-200/80 dark:border-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Action Buttons - Pinned to Bottom */}
                <div className="pt-6 mt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setInternalModalProject(project)}
                    className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors cursor-pointer py-1"
                  >
                    <span>Details &amp; Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        title="View GitHub Repository"
                        aria-label={`${project.title} GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white rounded-md transition-colors shadow-2xs"
                        title="Open Live Website"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

              </article>
            </Card3D>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Live Production Deployments Matrix */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="mt-14 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Verified Live Production Deployments on Vercel</span>
              </h3>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                2 Active Deployments
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Live App 1 */}
              <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col justify-between gap-4 shadow-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Production Live
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Final Year Project</span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Web Application &amp; Authentication Portal
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono truncate">
                    frontend-five-nu-xvp54qnk44.vercel.app
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      const proj = PROJECTS.find((p) => p.id === 'web-app-auth-portal');
                      if (proj) setInternalModalProject(proj);
                    }}
                    className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium cursor-pointer"
                  >
                    View Specs
                  </button>
                  <a
                    href="https://frontend-five-nu-xvp54qnk44.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white rounded-lg transition-colors shadow-2xs"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Live App 2 */}
              <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col justify-between gap-4 shadow-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Production Live
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Identity &amp; Portfolio</span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Personal Portfolio Website
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono truncate">
                    personal-portfolio-zeta-three-20.vercel.app
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      const proj = PROJECTS.find((p) => p.id === 'personal-portfolio-site');
                      if (proj) setInternalModalProject(proj);
                    }}
                    className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium cursor-pointer"
                  >
                    View Specs
                  </button>
                  <a
                    href="https://personal-portfolio-zeta-three-20.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white rounded-lg transition-colors shadow-2xs"
                  >
                    <span>Launch Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        </>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={handleCloseModal}
      />
    </section>
  );
};
