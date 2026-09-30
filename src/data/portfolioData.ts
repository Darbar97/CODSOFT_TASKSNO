import { Project, SkillCategory, Certification, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: "Premkumar Parmar",
  legalName: "Parmar Premkumar Rajeshkumar",
  role: "Computer Science & Engineering Student | Frontend Developer | AI Enthusiast",
  headline: "Building functional, responsive web applications and exploring modern AI technologies",
  location: "Halol, Gujarat, India",
  phone: "+91 91063 5073",
  whatsappNumber: "+91 9106635073",
  whatsapp: "https://wa.me/919106635073",
  email: "premparmar9161@gmail.com",
  linkedin: "https://www.linkedin.com/in/prem-parmar-196b3731a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/premparmar",
  instagram: "https://www.instagram.com/_prem_.97?igsh=ampubWdhbG9hNTg2",
  resumeUrl: "/premkumar-parmar-resume.pdf",
  status: "Open to Internships & Junior Web Developer Opportunities",
  bio: "Dedicated Computer Science & Engineering student passionate about building functional, responsive web applications and exploring modern AI technologies. Skilled in turning design concepts into reliable web interfaces using modern frontend tools, with a strong focus on clean code, accessible design, and high performance.",
  languages: [
    { name: "English", level: "Professional working proficiency" },
    { name: "Hindi", level: "Fluent / Native" },
    { name: "Gujarati", level: "Native" }
  ],
  interests: ["Music", "Sports", "Gaming", "Exploring AI Tools & Workflows"]
};

export const PROJECTS: Project[] = [
  {
    id: "web-app-auth-portal",
    title: "Web Application & Authentication Portal",
    subtitle: "Final Year Academic Project",
    year: "2026",
    category: "Web Applications",
    description: "A comprehensive, responsive web portal featuring client-side form validation, secure user authentication workflows, and interactive login interfaces engineered with modern React and CSS.",
    highlights: [
      "Designed and developed a responsive web portal featuring robust client-side form validation, secure user authentication workflows, and interactive login interfaces.",
      "Implemented reusable, modular component architecture ensuring seamless cross-browser compatibility and mobile responsiveness.",
      "Configured continuous integration and production deployment pipeline via Git and Vercel cloud hosting."
    ],
    techStack: ["React", "JavaScript (ES6+)", "CSS3", "Vercel", "Git"],
    imageUrl: "/images/projects/web-app-auth-portal.svg",
    imageAlt: "Web Application and Authentication Portal interface preview built with React by Premkumar Parmar",
    liveUrl: "https://frontend-five-nu-xvp54qnk44.vercel.app",
    githubUrl: "https://github.com/premparmar",
    architectureDetails: "Engineered with modular functional React components, custom hook-based form management, accessible form inputs with instant feedback, and secure token/credential handling patterns.",
    metricsOrOutcome: "100% responsive across mobile, tablet, and desktop breakpoints with zero-downtime Vercel deployment."
  },
  {
    id: "personal-portfolio-site",
    title: "Personal Portfolio Website",
    subtitle: "Responsive Web Design & Identity",
    year: "2025 – 2026",
    category: "Frontend",
    description: "A clean, modern personal portfolio website built to showcase technical competencies, academic projects, verified certifications, and professional contact channels.",
    highlights: [
      "Built a clean, modern personal portfolio website to showcase technical competencies, projects, and certifications.",
      "Designed adaptive layouts with fluid UI styling optimized for mobile screens, tablets, and desktop browsers.",
      "Implemented smooth navigation, interactive filtering, and accessible contact actions."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    imageUrl: "/images/projects/personal-portfolio-site.svg",
    imageAlt: "Premkumar Parmar personal portfolio website preview interface",
    liveUrl: "https://personal-portfolio-zeta-three-20.vercel.app",
    githubUrl: "https://github.com/premparmar",
    architectureDetails: "Structured with semantic HTML5 landmarks, responsive flexbox and grid hierarchies, and accessible keyboard navigation.",
    metricsOrOutcome: "Fast load times, pristine contrast ratio meeting WCAG AA standards, and fluid layout scaling."
  },
  {
    id: "ai-agent-exploration",
    title: "AI Agent & Workflow Prototype",
    subtitle: "Applied Generative AI & Automation",
    year: "2026",
    category: "AI & Automation",
    description: "A task-driven automation showcase implementing prompt orchestration, structured agent reasoning, and developer tooling inspired by IBM SkillsBuild and TCS iON frameworks.",
    highlights: [
      "Explored autonomous agent design and conversational task execution based on IBM SkillsBuild & TCS iON curriculum.",
      "Implemented clean prompt chaining and task-oriented tooling for automated content summarization and developer assistance.",
      "Investigated multi-modal AI interfaces and reliable prompt engineering methodologies."
    ],
    techStack: ["Python", "Generative AI", "IBM SkillsBuild", "Prompt Architecture"],
    imageUrl: "/images/projects/ai-agent-exploration.svg",
    imageAlt: "AI Agent and prompt orchestration workflow architecture diagram by Premkumar Parmar",
    githubUrl: "https://github.com/premparmar",
    architectureDetails: "Utilizes Python-based reasoning loops with structured input/output schemas for document parsing and interactive query answering.",
    metricsOrOutcome: "Demonstrates practical integration of generative AI tools for modern software development."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming Languages",
    description: "Core languages used for problem solving, web development, and computational logic",
    skills: [
      { name: "JavaScript (ES6+)", level: "Proficient", iconName: "Code", note: "Modern syntax, async/await, DOM APIs" },
      { name: "Python", level: "Intermediate", iconName: "FileCode", note: "Scripting, AI tooling, data handling" },
      { name: "C", level: "Intermediate", iconName: "Cpu", note: "Algorithms, memory basics, procedural logic" }
    ]
  },
  {
    category: "Web Technologies",
    description: "Modern frontend libraries and styling tools for building responsive interfaces",
    skills: [
      { name: "React", level: "Proficient", iconName: "Layers", note: "Components, hooks, state, routing" },
      { name: "HTML5", level: "Advanced", iconName: "Globe", note: "Semantic structure, SEO, accessibility" },
      { name: "CSS3", level: "Proficient", iconName: "Palette", note: "Flexbox, CSS Grid, animations, media queries" },
      { name: "Tailwind CSS", level: "Proficient", iconName: "Sparkles", note: "Utility-first design, responsive layouts" }
    ]
  },
  {
    category: "Developer Tools & Platforms",
    description: "Version control, hosting, and productivity environments for continuous shipping",
    skills: [
      { name: "Git", level: "Proficient", iconName: "GitBranch", note: "Branching, committing, merge resolution" },
      { name: "GitHub", level: "Proficient", iconName: "Github", note: "Repositories, collaboration, issues" },
      { name: "Vercel", level: "Proficient", iconName: "Cloud", note: "Deployments, preview branches, CI" },
      { name: "MS Office", level: "Proficient", iconName: "FileSpreadsheet", note: "Documentation, presentation, spreadsheets" }
    ]
  },
  {
    category: "AI & Modern Technologies",
    description: "Continuous learning in generative AI, agentic systems, and emerging developer tooling",
    skills: [
      { name: "Generative AI", level: "Intermediate", iconName: "Bot", note: "TCS iON Certified essentials" },
      { name: "AI Agents", level: "Intermediate", iconName: "Cpu", note: "IBM SkillsBuild Credly verified" },
      { name: "Prompt Engineering", level: "Intermediate", iconName: "Terminal", note: "Task structuring, context windows" },
      { name: "Modern AI Tools", level: "Proficient", iconName: "Wand2", note: "Workflow automation, code assistance" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "scaler-dbms",
    title: "DBMS Course - Master the Fundamentals and Advanced Concepts",
    issuer: "SCALER Topics",
    issueDate: "10 September 2026",
    certId: "SCALER-DBMS-2026",
    verificationBadge: "Certificate of Excellence",
    isFeatured: true,
    category: "Core CS & Engineering",
    description: "Certificate of Excellence awarded to ParmarPremkumar in recognition of the completion of the tutorial: DBMS Course - Master the Fundamentals and Advanced Concepts. Covering relational theory, SQL queries, transaction management, ACID properties, and indexing.",
    skillsCovered: ["Database Management Systems (DBMS)", "SQL Querying", "Relational Architecture", "Transactions & ACID", "Indexing & Optimization", "16 Challenges Completed"],
    recipient: "ParmarPremkumar",
    signatory: "Anshuman Singh, Co-founder SCALER",
    modules: "74 Video Tutorials • 16 Modules • 16 Challenges"
  },
  {
    id: "scaler-kmp",
    title: "String Pattern Matching: KMP Algorithm",
    issuer: "SCALER Topics",
    issueDate: "10 September 2026",
    certId: "SCALER-KMP-2026",
    verificationBadge: "Certificate of Excellence",
    isFeatured: true,
    category: "Core CS & Engineering",
    description: "Certificate of Excellence awarded to ParmarPremkumar in recognition of the completion of the tutorial: String Pattern Matching: KMP Algorithm. Comprehensive analysis of prefix-function preprocessing and O(N+M) pattern search.",
    skillsCovered: ["KMP Algorithm", "String Pattern Matching", "Prefix Function & LPS Table", "Time & Space Complexity", "Competitive DSA"],
    recipient: "ParmarPremkumar",
    signatory: "Anshuman Singh, Co-founder SCALER",
    modules: "8 Video Tutorials • 1 Modules"
  },
  {
    id: "tcs-genai",
    title: "Generative AI Essentials",
    issuer: "TCS iON",
    issueDate: "June 2026",
    certId: "8773-32296296-1016",
    verificationBadge: "TCS iON Verified",
    isFeatured: true,
    category: "AI & Emerging Tech",
    description: "In-depth certification in generative models, foundation LLMs, prompt structuring, and practical AI applications across modern enterprise engineering workflows.",
    skillsCovered: ["Generative AI Foundations", "Large Language Models", "Prompt Design", "AI Ethics & Applications"]
  },
  {
    id: "ibm-ai-agent",
    title: "Build an AI Agent",
    issuer: "IBM SkillsBuild",
    issueDate: "May 2026",
    certId: "Credly Verified Badge",
    verificationBadge: "Credly Verified",
    isFeatured: true,
    category: "AI & Emerging Tech",
    description: "Hands-on engineering certification covering autonomous agent reasoning loops, tool usage, action execution, and interactive conversational agent systems.",
    skillsCovered: ["Autonomous AI Agents", "Task Automation", "Tool Usage", "Conversational AI Systems"]
  },
  {
    id: "tcs-yuva-ai",
    title: "YUVA AI For All",
    issuer: "TCS iON & IndiaAI",
    issueDate: "May 2026",
    certId: "IndiaAI National Initiative",
    verificationBadge: "Govt of India & TCS iON",
    isFeatured: false,
    category: "AI & Emerging Tech",
    description: "National AI literacy program conducted jointly by IndiaAI and TCS iON exploring AI democratization, digital transformation, and responsible AI practices.",
    skillsCovered: ["National AI Literacy", "Applied AI Tools", "Digital Transformation", "Responsible AI"]
  },
  {
    id: "iibf-bc",
    title: "IIBF Business Correspondent Certificate (Basic)",
    issuer: "Indian Institute of Banking & Finance",
    issueDate: "July 2026",
    regNo: "802906457",
    verificationBadge: "IIBF Certified",
    isFeatured: false,
    category: "Professional & Industry",
    description: "Accredited certification under the Indian Institute of Banking & Finance covering banking operations, customer verification protocols, and digital payment systems.",
    skillsCovered: ["Financial Inclusion", "Customer Service", "Banking Protocols", "Digital Transactions"]
  }
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "Diploma in Computer Science & Engineering",
    institution: "ITM SLS Baroda University",
    location: "Vadodara / Gujarat, India",
    duration: "2023 – 2026",
    details: "Coursework in Data Structures, Object-Oriented Programming, Database Management Systems, Web Development, and Software Engineering. Active in tech workshops and final year project development.",
    grade: "CGPA: 6.59",
    enrollmentNo: "23C11086"
  },
  {
    degree: "Secondary School Certificate (SSC, 10th Grade)",
    institution: "GSEB Board, Gujarat",
    location: "Gujarat, India",
    duration: "2023",
    details: "Fundamental studies with strong foundations in Mathematics, Science, and Languages.",
    grade: "Percentage: 61.16%"
  }
];
