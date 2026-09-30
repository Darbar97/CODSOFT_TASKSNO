import React, { useState } from 'react';
import { 
  GraduationCap, 
  Languages, 
  Heart, 
  Code2, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  Award,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_LIST } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

export const About: React.FC = () => {
  const [profileImgError, setProfileImgError] = useState(false);
  return (
    <section id="about" className="py-20 bg-white dark:bg-[#121215] border-y border-zinc-200/80 dark:border-zinc-800 transition-colors scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-2">
              Biography &amp; Background
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-heading">
              Dedicated to craft, code, and continuous learning
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              A closer look into my educational foundations, technical drive, and academic journey in Gujarat, India.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Narrative, Profile Photo Card & Highlights */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7 space-y-8">
            
            {/* Profile Avatar Card and Bio Intro */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 p-6 sm:p-7 bg-zinc-50 dark:bg-zinc-900/70 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
              <div className="shrink-0 relative">
                {!profileImgError ? (
                  <img
                    src="/images/premkumar-parmar-profile.svg"
                    alt="Premkumar Parmar, Computer Science and Engineering student and frontend developer"
                    width="128"
                    height="128"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-900"
                    loading="lazy"
                    onError={() => setProfileImgError(true)}
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-zinc-900 text-white flex flex-col items-center justify-center font-bold text-2xl border border-zinc-700 shadow-xs">
                    <span>PP</span>
                    <span className="text-[10px] text-zinc-400 font-normal mt-1 tracking-wide uppercase">Premkumar</span>
                  </div>
                )}
                <div 
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-xs" 
                  title="Open to internships & junior developer roles"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </div>
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Halol, Gujarat, India</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50 font-heading">
                  Premkumar Parmar
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                  Computer Science &amp; Engineering Student | Frontend Developer | AI Enthusiast
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  ITM SLS Baroda University (2023–2026) • Halol, Gujarat
                </p>
              </div>
            </div>

            {/* Detailed Bio Narrative */}
            <div className="space-y-4 text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
              <p>
                Hello! I am <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{PERSONAL_INFO.name}</strong>, 
                a Computer Science &amp; Engineering diploma student at{' '}
                <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">ITM SLS Baroda University</strong>, Gujarat (Class of 2026).
              </p>
              <p>
                My focus centers on developing reliable, accessible, and high-performance web interfaces 
                using modern web technologies such as React, JavaScript, and Tailwind CSS. I enjoy translating 
                complex user requirements and UI designs into smooth, interactive digital products that work 
                flawlessly across diverse screen sizes.
              </p>
              <p>
                Beyond standard frontend development, I am deeply intrigued by generative AI technologies, autonomous 
                agents, and modern developer productivity tools. I have actively pursued verified credentials through 
                TCS iON and IBM SkillsBuild to ground my understanding of large language models and practical agent design.
              </p>
            </div>

            {/* Core Values / Work Principles */}
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/70 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                Engineering Principles I Follow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    title: 'Clean, Modular Architecture',
                    desc: 'Reusable component structures, well-scoped logic, and readable codebases.'
                  },
                  {
                    title: 'Responsive & Fluid UI',
                    desc: 'Mobile-first styling ensuring comfortable usability on all viewports.'
                  },
                  {
                    title: 'Form Validation & Security',
                    desc: 'Robust client-side checks and user feedback on authentication portals.'
                  },
                  {
                    title: 'AI-Enhanced Workflows',
                    desc: 'Leveraging prompt engineering and modern automation to accelerate delivery.'
                  }
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages & Personal Interests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Languages */}
              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  <Languages className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  <span>Languages Known</span>
                </div>
                <div className="space-y-2">
                  {PERSONAL_INFO.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{lang.name}</span>
                      <span className="text-zinc-500 dark:text-zinc-400">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests & Hobbies */}
              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  <Heart className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  <span>Interests &amp; Hobbies</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PERSONAL_INFO.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200/60 dark:border-zinc-700"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1">
                  Enjoy keeping up with tech podcasts, fitness, music, and AI tools.
                </p>
              </div>

            </div>

          </ScrollReveal>

          {/* Right Column: Formal Education Timeline */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-5 space-y-6">
            <div id="education" className="scroll-mt-20 sm:scroll-mt-24 p-6 sm:p-7 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                    Education &amp; Academics
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  Formal Records
                </span>
              </div>

              {/* Education Timeline Items */}
              <div className="space-y-6">
                {EDUCATION_LIST.map((edu) => (
                  <div key={`${edu.institution}-${edu.duration}`} className="relative pl-6 pb-2 border-l-2 border-zinc-200 dark:border-zinc-800 last:border-l-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-100" />
                    
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {edu.duration}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                          {edu.grade}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                        {edu.degree}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                        <span>{edu.institution}</span>
                      </div>

                      {edu.enrollmentNo && (
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Official Enrolment No: <span className="font-mono text-zinc-700 dark:text-zinc-300 font-medium">{edu.enrollmentNo}</span>
                        </p>
                      )}

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 pt-1 leading-relaxed">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* University Record Details Notice */}
              <div className="p-3.5 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1.5 text-xs">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                  Academic Profile Verification
                </span>
                <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                  Parmar Premkumar Rajeshkumar (DE / Diploma Engineering, Batch 2023–2026), 
                  ITM SLS Baroda University.
                </p>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
