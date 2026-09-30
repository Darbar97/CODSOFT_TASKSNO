#!/usr/bin/env python3
"""
Generates a valid, standards-compliant PDF/1.4 resume for Premkumar Parmar.
Includes verified academic credentials, projects, certifications, and contact channels.
"""
import sys

def escape_pdf(text):
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

def build_pdf():
    # 595.28 x 841.89 points (A4)
    # We will build a structured stream of commands
    stream_lines = []
    
    # Helper to add text
    # F1 = Helvetica, F2 = Helvetica-Bold
    
    # Background / layout lines
    # Top header bar
    stream_lines.append("0.1 0.1 0.12 rg") # dark text / header line
    stream_lines.append("50 788 495 1.5 re f") # separator line under header
    
    # Text objects
    stream_lines.append("BT")
    
    # Name
    stream_lines.append("/F2 20 Tf")
    stream_lines.append("50 805 Td")
    stream_lines.append(f"({escape_pdf('PREMKUMAR PARMAR')}) Tj")
    
    # Subtitle
    stream_lines.append("/F1 10 Tf")
    stream_lines.append("0 -15 Td")
    stream_lines.append(f"({escape_pdf('Computer Science & Engineering Student | Frontend Developer | AI Enthusiast')}) Tj")
    
    # Contact Info Bar
    stream_lines.append("/F1 8.5 Tf")
    stream_lines.append("0 -18 Td")
    stream_lines.append(f"({escape_pdf('Halol, Gujarat, India  |  +91 91063 5073  |  premparmar9161@gmail.com')}) Tj")
    
    # Links
    stream_lines.append("0 -12 Td")
    stream_lines.append(f"({escape_pdf('Portfolio: https://personal-portfolio-zeta-three-20.vercel.app/  |  GitHub: github.com/premparmar')}) Tj")
    
    # Section: ABOUT ME
    stream_lines.append("/F2 10.5 Tf")
    stream_lines.append("0 -24 Td")
    stream_lines.append(f"({escape_pdf('PROFESSIONAL SUMMARY')}) Tj")
    
    stream_lines.append("/F1 9 Tf")
    stream_lines.append("0 -14 Td")
    stream_lines.append(f"({escape_pdf('Dedicated Computer Science & Engineering student passionate about building functional, responsive web applications')}) Tj")
    stream_lines.append("0 -12 Td")
    stream_lines.append(f"({escape_pdf('and exploring modern AI technologies. Skilled in turning design concepts into accessible interfaces with modern frontend tools.')}) Tj")
    
    # Section: EDUCATION
    stream_lines.append("/F2 10.5 Tf")
    stream_lines.append("0 -22 Td")
    stream_lines.append(f"({escape_pdf('EDUCATION')}) Tj")
    
    stream_lines.append("/F2 9.5 Tf")
    stream_lines.append("0 -14 Td")
    stream_lines.append(f"({escape_pdf('Diploma in Computer Science & Engineering (2023 - 2026)  |  CGPA: 6.59 / 10.0')}) Tj")
    stream_lines.append("/F1 8.5 Tf")
    stream_lines.append("0 -12 Td")
    stream_lines.append(f"({escape_pdf('ITM SLS Baroda University, Vadodara, Gujarat  (Enrolment No: 23C11086)')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('Coursework: Data Structures, Web Development, DBMS, Algorithms, Object-Oriented Programming, Software Engineering')}) Tj")
    
    stream_lines.append("/F2 9.5 Tf")
    stream_lines.append("0 -16 Td")
    stream_lines.append(f"({escape_pdf('Secondary School Certificate (SSC, 10th Grade) (2023)  |  Percentage: 61.16%')}) Tj")
    stream_lines.append("/F1 8.5 Tf")
    stream_lines.append("0 -12 Td")
    stream_lines.append(f"({escape_pdf('GSEB Board, Gujarat, India - Strong foundations in Mathematics, Science, and English')}) Tj")
    
    # Section: TECHNICAL SKILLS
    stream_lines.append("/F2 10.5 Tf")
    stream_lines.append("0 -22 Td")
    stream_lines.append(f"({escape_pdf('TECHNICAL SKILLS')}) Tj")
    
    stream_lines.append("/F2 9 Tf")
    stream_lines.append("0 -14 Td")
    stream_lines.append(f"({escape_pdf('Languages: ')}) Tj")
    stream_lines.append("/F1 9 Tf")
    stream_lines.append(f"({escape_pdf('Python, JavaScript (ES6+), C, HTML5, CSS3')}) Tj")
    
    stream_lines.append("/F2 9 Tf")
    stream_lines.append("0 -13 Td")
    stream_lines.append(f"({escape_pdf('Frontend & Libraries: ')}) Tj")
    stream_lines.append("/F1 9 Tf")
    stream_lines.append(f"({escape_pdf('React, Tailwind CSS, Responsive Web Design, Component Architecture, DOM APIs')}) Tj")
    
    stream_lines.append("/F2 9 Tf")
    stream_lines.append("0 -13 Td")
    stream_lines.append(f"({escape_pdf('Developer Tools & Platforms: ')}) Tj")
    stream_lines.append("/F1 9 Tf")
    stream_lines.append(f"({escape_pdf('Git, GitHub, Vercel, Vite, npm, MS Office, Modern AI developer tools')}) Tj")
    
    stream_lines.append("/F2 9 Tf")
    stream_lines.append("0 -13 Td")
    stream_lines.append(f"({escape_pdf('Core CS & AI Focus: ')}) Tj")
    stream_lines.append("/F1 9 Tf")
    stream_lines.append(f"({escape_pdf('DBMS, SQL, Relational Design, KMP String Algorithm, Generative AI Essentials, AI Agents')}) Tj")
    
    # Section: FEATURED PROJECTS
    stream_lines.append("/F2 10.5 Tf")
    stream_lines.append("0 -22 Td")
    stream_lines.append(f"({escape_pdf('FEATURED PROJECTS')}) Tj")
    
    # Project 1
    stream_lines.append("/F2 9.5 Tf")
    stream_lines.append("0 -14 Td")
    stream_lines.append(f"({escape_pdf('Web Application & Authentication Portal (2026)')}) Tj")
    stream_lines.append("/F1 8.5 Tf")
    stream_lines.append("0 -12 Td")
    stream_lines.append(f"({escape_pdf('Stack: React, JavaScript (ES6+), CSS3, Vercel  |  Live: frontend-five-nu-xvp54qnk44.vercel.app')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('- Engineered a responsive web portal featuring client-side form validation and secure authentication workflows.')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('- Implemented modular functional component architecture ensuring cross-browser compatibility and zero-downtime deployment.')}) Tj")
    
    # Project 2
    stream_lines.append("/F2 9.5 Tf")
    stream_lines.append("0 -16 Td")
    stream_lines.append(f"({escape_pdf('Personal Portfolio Website (2025 - 2026)')}) Tj")
    stream_lines.append("/F1 8.5 Tf")
    stream_lines.append("0 -12 Td")
    stream_lines.append(f"({escape_pdf('Stack: React, Tailwind CSS, TypeScript, Motion  |  Live: personal-portfolio-zeta-three-20.vercel.app')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('- Designed and developed a fast, accessible personal portfolio website showcasing projects, skills, and credentials.')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('- Optimized Core Web Vitals, semantic HTML5 structure, schema.org structured data, and responsive layouts.')}) Tj")
    
    # Project 3
    stream_lines.append("/F2 9.5 Tf")
    stream_lines.append("0 -16 Td")
    stream_lines.append(f"({escape_pdf('AI Agent & Workflow Prototype (2026)')}) Tj")
    stream_lines.append("/F1 8.5 Tf")
    stream_lines.append("0 -12 Td")
    stream_lines.append(f"({escape_pdf('Stack: Python, Generative AI, IBM SkillsBuild Framework, Prompt Architecture')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('- Implemented autonomous agent reasoning loops and task orchestration for developer assistance and data parsing.')}) Tj")
    
    # Section: VERIFIED CERTIFICATIONS
    stream_lines.append("/F2 10.5 Tf")
    stream_lines.append("0 -22 Td")
    stream_lines.append(f"({escape_pdf('VERIFIED CERTIFICATIONS')}) Tj")
    
    stream_lines.append("/F1 8.5 Tf")
    stream_lines.append("0 -13 Td")
    stream_lines.append(f"({escape_pdf('* SCALER Topics: DBMS Course - Master the Fundamentals & Advanced Concepts (ID: SCALER-DBMS-2026, Sept 2026)')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('* SCALER Topics: String Pattern Matching: KMP Algorithm (ID: SCALER-KMP-2026, Sept 2026)')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('* TCS iON: Generative AI Essentials (ID: 8773-32296296-1016, June 2026)')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('* IBM SkillsBuild: Build an AI Agent (Credly Verified Badge, May 2026)')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('* TCS iON & IndiaAI: YUVA AI For All (May 2026)')}) Tj")
    stream_lines.append("0 -11 Td")
    stream_lines.append(f"({escape_pdf('* IIBF: Business Correspondent Certificate (Basic) (Reg No: 802906457, July 2026)')}) Tj")
    
    # Languages
    stream_lines.append("/F2 9.5 Tf")
    stream_lines.append("0 -18 Td")
    stream_lines.append(f"({escape_pdf('LANGUAGES & DETAILS: ')}) Tj")
    stream_lines.append("/F1 8.5 Tf")
    stream_lines.append(f"({escape_pdf('English (Professional Working), Hindi (Fluent/Native), Gujarati (Native)')}) Tj")
    
    stream_lines.append("ET")
    
    stream_content = "\n".join(stream_lines)
    stream_bytes = stream_content.encode('latin1')
    stream_length = len(stream_bytes)
    
    objects = []
    # Obj 1: Catalog
    objects.append("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj")
    # Obj 2: Pages
    objects.append("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj")
    # Obj 3: Page
    objects.append("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj")
    # Obj 4: Content Stream
    objects.append(f"4 0 obj\n<< /Length {stream_length} >>\nstream\n{stream_content}\nendstream\nendobj")
    # Obj 5: Font F1
    objects.append("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj")
    # Obj 6: Font F2
    objects.append("6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj")
    
    # Build PDF with xref
    header = "%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"
    pdf_parts = [header.encode('latin1')]
    
    offsets = []
    current_offset = len(header.encode('latin1'))
    
    for obj_str in objects:
        offsets.append(current_offset)
        obj_bytes = (obj_str + "\n").encode('latin1')
        pdf_parts.append(obj_bytes)
        current_offset += len(obj_bytes)
        
    xref_offset = current_offset
    xref_lines = [f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n"]
    for off in offsets:
        xref_lines.append(f"{off:010d} 00000 n \n")
        
    trailer = f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n"
    pdf_parts.append("".join(xref_lines).encode('latin1'))
    pdf_parts.append(trailer.encode('latin1'))
    
    return b"".join(pdf_parts)

if __name__ == '__main__':
    data = build_pdf()
    out_path = sys.argv[1] if len(sys.argv) > 1 else 'public/premkumar-parmar-resume.pdf'
    with open(out_path, 'wb') as f:
        f.write(data)
    print(f"Successfully generated {out_path} ({len(data)} bytes)")
