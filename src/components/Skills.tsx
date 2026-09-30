import React, { useState, useRef, useEffect } from 'react';
import { 
  Code, 
  FileCode, 
  Cpu, 
  Layers, 
  Globe, 
  Palette, 
  Sparkles, 
  GitBranch, 
  Github, 
  Cloud, 
  FileSpreadsheet, 
  Bot, 
  Terminal, 
  Wand2,
  CheckCircle,
  Search,
  RefreshCw
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { SkillsGridSkeleton } from './skeletons';

interface SkillsProps {
  isLoading?: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ isLoading: parentLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Icon mapper helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'FileCode': return <FileCode className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Layers': return <Layers className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Globe': return <Globe className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Palette': return <Palette className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Github': return <Github className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Cloud': return <Cloud className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Bot': return <Bot className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case 'Wand2': return <Wand2 className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      default: return <Code className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Proficient':
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700';
      case 'Intermediate':
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
    }
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => ({
    ...cat,
    skills: cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.category.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-[#121215] border-y border-zinc-200/80 dark:border-zinc-800 transition-colors scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-2">
                Technical Competencies
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-heading">
                Languages, frameworks &amp; modern developer tools
              </h2>
              <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                Proficiencies gained through diploma coursework at ITM SLS Baroda University, hands-on web projects, and AI credentials.
              </p>
            </div>

            {/* Quick Skill Search & Refresh */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  id="skill-search-input"
                  type="text"
                  placeholder="Filter skills or tech..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-base sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-700 dark:focus:ring-olive-400 focus:bg-white dark:focus:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all"
                />
              </div>
              <button
                type="button"
                onClick={handleSimulateFetch}
                disabled={isLoading}
                className="w-11 h-11 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-xl border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer shrink-0"
                title="Simulate data fetch (test skeleton loading)"
                aria-label="Simulate fetching skills data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-zinc-900 dark:text-zinc-100' : ''}`} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Categories Grid or Skeleton State */}
        {isLoading ? (
          <div className="animate-in fade-in duration-200">
            <SkillsGridSkeleton count={4} />
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((group) => (
            <StaggerItem key={group.category} className="h-full">
              <div
                id={`skill-category-${group.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="bg-[#f7f8f3] dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xs h-full"
              >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                    {group.category}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {group.skills.length} competencies
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  {group.description}
                </p>

                {/* Skills inside category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 flex flex-col justify-between space-y-2 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-700/60 shrink-0">
                            {getIcon(skill.iconName)}
                          </div>
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                            {skill.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getLevelBadge(skill.level)} shrink-0`}>
                          {skill.level}
                        </span>
                      </div>

                      {skill.note && (
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug pt-0.5">
                          {skill.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag note */}
              <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified in academic course projects and practical implementations</span>
              </div>
            </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        )}

        {!isLoading && filteredCategories.length === 0 && (
          <div className="text-center py-12 p-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              No skills found matching &ldquo;{searchTerm}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="mt-3 text-xs font-semibold text-zinc-900 dark:text-zinc-100 underline cursor-pointer"
            >
              Reset search
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
