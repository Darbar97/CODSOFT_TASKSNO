import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Standard Letter size (612 x 792 points)
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const margin = 40;
  const contentWidth = width - margin * 2;
  let y = height - 42;

  // Colors
  const primaryColor = rgb(0.08, 0.08, 0.1); // Dark charcoal
  const accentColor = rgb(0.15, 0.23, 0.45); // Deep navy
  const mutedColor = rgb(0.35, 0.35, 0.38); // Slate gray
  const lineColor = rgb(0.85, 0.85, 0.88); // Light gray line

  // Name Header
  page.drawText('PREMKUMAR PARMAR', {
    x: margin,
    y,
    size: 20,
    font: helveticaBold,
    color: primaryColor,
  });
  y -= 16;

  page.drawText('Computer Science & Engineering Student | Frontend Developer | AI Enthusiast', {
    x: margin,
    y,
    size: 9.5,
    font: helveticaBold,
    color: accentColor,
  });
  y -= 14;

  // Contact line 1
  page.drawText('Halol, Gujarat, India  |  Email: premparmar9161@gmail.com  |  Phone: +91 91063 5073', {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: mutedColor,
  });
  y -= 12;

  // Contact line 2
  page.drawText('Portfolio: https://personal-portfolio-zeta-three-20.vercel.app  |  GitHub: github.com/premparmar', {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: mutedColor,
  });
  y -= 14;

  // Horizontal Rule
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: lineColor,
  });
  y -= 16;

  // Helper for section header
  const drawSectionHeader = (title: string) => {
    page.drawText(title.toUpperCase(), {
      x: margin,
      y,
      size: 10,
      font: helveticaBold,
      color: accentColor,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.75,
      color: lineColor,
    });
    y -= 12;
  };

  // 1. PROFESSIONAL SUMMARY
  drawSectionHeader('Professional Summary');
  const summaryText = 'Dedicated Computer Science & Engineering student passionate about building functional, responsive web applications and exploring modern AI technologies. Skilled in turning design concepts into reliable, clean web interfaces with modern frontend tools (React, Tailwind CSS, TypeScript) and established software engineering practices.';
  
  // Word wrap
  const words = summaryText.split(' ');
  let currentLine = '';
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = helvetica.widthOfTextAtSize(testLine, 8.5);
    if (testWidth > contentWidth) {
      page.drawText(currentLine, { x: margin, y, size: 8.5, font: helvetica, color: primaryColor });
      y -= 11;
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    page.drawText(currentLine, { x: margin, y, size: 8.5, font: helvetica, color: primaryColor });
    y -= 15;
  }

  // 2. EDUCATION
  drawSectionHeader('Education');
  
  // Edu 1
  page.drawText('Diploma in Computer Science & Engineering', { x: margin, y, size: 9, font: helveticaBold, color: primaryColor });
  page.drawText('2023 – 2026', { x: width - margin - 50, y, size: 8.5, font: helveticaBold, color: primaryColor });
  y -= 11;
  page.drawText('ITM SLS Baroda University, Vadodara, Gujarat  |  CGPA: 6.59 / 10.0  |  Enrolment No: 23C11086', {
    x: margin,
    y,
    size: 8,
    font: helveticaOblique,
    color: mutedColor,
  });
  y -= 10;
  page.drawText('Core Coursework: Data Structures, DBMS, Web Development, Object-Oriented Programming, Algorithms.', {
    x: margin,
    y,
    size: 8,
    font: helvetica,
    color: primaryColor,
  });
  y -= 14;

  // Edu 2
  page.drawText('Secondary School Certificate (SSC, 10th Grade)', { x: margin, y, size: 9, font: helveticaBold, color: primaryColor });
  page.drawText('2023', { x: width - margin - 25, y, size: 8.5, font: helveticaBold, color: primaryColor });
  y -= 11;
  page.drawText('GSEB Board, Gujarat  |  Percentage: 61.16%', {
    x: margin,
    y,
    size: 8,
    font: helveticaOblique,
    color: mutedColor,
  });
  y -= 15;

  // 3. TECHNICAL COMPETENCIES
  drawSectionHeader('Technical Skills');
  const skillsList = [
    { label: 'Web Technologies & Frameworks:', val: 'React, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), TypeScript' },
    { label: 'Programming & Databases:', val: 'Python, JavaScript, C, SQL, Database Management Systems (DBMS)' },
    { label: 'Tools & Platforms:', val: 'Git, GitHub, Vercel, Responsive Web Design, MS Office' },
    { label: 'AI & Modern Technologies:', val: 'Generative AI Foundations, AI Agents, Prompt Engineering, Modern AI Developer Tools' },
  ];

  for (const skill of skillsList) {
    page.drawText(`• ${skill.label}`, { x: margin, y, size: 8.5, font: helveticaBold, color: primaryColor });
    const labelWidth = helveticaBold.widthOfTextAtSize(`• ${skill.label} `, 8.5);
    page.drawText(skill.val, { x: margin + labelWidth, y, size: 8.5, font: helvetica, color: primaryColor });
    y -= 12;
  }
  y -= 4;

  // 4. PROJECTS
  drawSectionHeader('Selected Software Projects');
  
  // Project 1
  page.drawText('Web Application & Authentication Portal (Final Year Project)', { x: margin, y, size: 9, font: helveticaBold, color: primaryColor });
  page.drawText('2026', { x: width - margin - 25, y, size: 8.5, font: helveticaBold, color: primaryColor });
  y -= 11;
  page.drawText('Tech: React, JavaScript (ES6+), CSS3, Vercel  |  Live: frontend-five-nu-xvp54qnk44.vercel.app', {
    x: margin,
    y,
    size: 8,
    font: helveticaOblique,
    color: mutedColor,
  });
  y -= 10;
  page.drawText('• Engineered responsive web portal featuring client-side form validation, secure user authentication workflows, and modern UI components.', { x: margin, y, size: 8, font: helvetica, color: primaryColor });
  y -= 10;
  page.drawText('• Configured Git repository CI/CD pipeline and automated deployment on Vercel cloud hosting.', { x: margin, y, size: 8, font: helvetica, color: primaryColor });
  y -= 14;

  // Project 2
  page.drawText('Personal Portfolio Website (Responsive Web Design)', { x: margin, y, size: 9, font: helveticaBold, color: primaryColor });
  page.drawText('2025 – 2026', { x: width - margin - 50, y, size: 8.5, font: helveticaBold, color: primaryColor });
  y -= 11;
  page.drawText('Tech: HTML5, CSS3, JavaScript, React, Tailwind CSS  |  Live: personal-portfolio-zeta-three-20.vercel.app', {
    x: margin,
    y,
    size: 8,
    font: helveticaOblique,
    color: mutedColor,
  });
  y -= 10;
  page.drawText('• Designed clean, modern portfolio showcasing technical competencies, verified certifications, 3D interaction, and accessible contact actions.', { x: margin, y, size: 8, font: helvetica, color: primaryColor });
  y -= 10;
  page.drawText('• Built with mobile-first responsive architecture ensuring optimal performance across mobile, tablet, and desktop screens.', { x: margin, y, size: 8, font: helvetica, color: primaryColor });
  y -= 14;

  // Project 3
  page.drawText('AI Agent & Workflow Prototype (Applied Generative AI)', { x: margin, y, size: 9, font: helveticaBold, color: primaryColor });
  page.drawText('2026', { x: width - margin - 25, y, size: 8.5, font: helveticaBold, color: primaryColor });
  y -= 11;
  page.drawText('Tech: Python, Generative AI, IBM SkillsBuild, Prompt Architecture', {
    x: margin,
    y,
    size: 8,
    font: helveticaOblique,
    color: mutedColor,
  });
  y -= 10;
  page.drawText('• Explored autonomous agent design and conversational task execution based on IBM SkillsBuild & TCS iON curriculum.', { x: margin, y, size: 8, font: helvetica, color: primaryColor });
  y -= 15;

  // 5. VERIFIED CERTIFICATIONS
  drawSectionHeader('Verified Certifications & Credentials');
  const certs = [
    { title: 'DBMS Course - Master Fundamentals & Advanced Concepts', issuer: 'SCALER Topics', id: 'SCALER-DBMS-2026', date: 'Sept 2026' },
    { title: 'String Pattern Matching: KMP Algorithm', issuer: 'SCALER Topics', id: 'SCALER-KMP-2026', date: 'Sept 2026' },
    { title: 'Generative AI Essentials', issuer: 'TCS iON', id: '8773-32296296-1016', date: 'June 2026' },
    { title: 'Build an AI Agent', issuer: 'IBM SkillsBuild (Credly Verified)', id: 'Verified Badge', date: 'May 2026' },
    { title: 'YUVA AI For All', issuer: 'TCS iON & IndiaAI', id: 'National Initiative', date: 'May 2026' },
    { title: 'Business Correspondent Certificate (Basic)', issuer: 'IIBF (Banking & Finance)', id: 'Reg No: 802906457', date: 'July 2026' },
  ];

  for (const cert of certs) {
    page.drawText(`• ${cert.title} — ${cert.issuer}`, { x: margin, y, size: 8, font: helveticaBold, color: primaryColor });
    page.drawText(`(${cert.id}, ${cert.date})`, { x: margin + 350, y, size: 7.5, font: helveticaOblique, color: mutedColor });
    y -= 11;
  }
  y -= 4;

  // 6. LANGUAGES & DETAILS
  drawSectionHeader('Personal Details & Languages');
  page.drawText('Languages: English (Professional Working Proficiency), Hindi (Fluent / Native), Gujarati (Native)', {
    x: margin,
    y,
    size: 8,
    font: helvetica,
    color: primaryColor,
  });
  y -= 11;
  page.drawText('Location: Halol, Gujarat, India  |  Legal Name (University Records): Parmar Premkumar Rajeshkumar', {
    x: margin,
    y,
    size: 8,
    font: helvetica,
    color: mutedColor,
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public', 'premkumar-parmar-resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Resume successfully generated at: ${outputPath} (${pdfBytes.length} bytes)`);
}

generateResume().catch((err) => {
  console.error('Failed to generate resume PDF:', err);
  process.exit(1);
});
