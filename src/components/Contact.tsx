import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram,
  Send, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Clock,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import { copyToClipboardSafe } from '../utils/clipboard';

export const Contact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);
  
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Internship Opportunity',
    message: ''
  });

  // Validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    const success = await copyToClipboardSafe(text);
    if (success) {
      setCopiedField(label);
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const presetTopics = [
    'Internship Opportunity',
    'Junior Web Developer Role',
    'Freelance Project Inquiry',
    'Technical Discussion'
  ];

  const validateField = (field: 'name' | 'email' | 'message', value: string) => {
    let error: string | undefined = undefined;
    const trimmed = value.trim();

    if (field === 'name') {
      if (!trimmed) {
        error = 'Please enter your full name.';
      } else if (trimmed.length < 2) {
        error = 'Name must be at least 2 characters.';
      }
    } else if (field === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!trimmed) {
        error = 'Please enter your email address.';
      } else if (!emailRegex.test(trimmed)) {
        error = 'Please enter a valid email address (e.g. name@domain.com).';
      }
    } else if (field === 'message') {
      if (!trimmed) {
        error = 'Please write your message.';
      } else if (trimmed.length < 10) {
        error = `Message is too short (${trimmed.length}/10 characters minimum).`;
      }
    }

    return error;
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formState[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: 'name' | 'email' | 'message', value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateField('name', formState.name);
    const emailErr = validateField('email', formState.email);
    const msgErr = validateField('message', formState.message);

    setTouched({ name: true, email: true, message: true });
    setErrors({ name: nameErr, email: emailErr, message: msgErr });

    if (nameErr || emailErr || msgErr) {
      // Focus first error element
      if (nameErr) {
        document.getElementById('contact-name-input')?.focus();
      } else if (emailErr) {
        document.getElementById('contact-email-input')?.focus();
      } else if (msgErr) {
        document.getElementById('contact-message-input')?.focus();
      }
      return;
    }

    // Trigger feedback and immediately open mail client
    setIsSubmitted(true);
    openMailClient();
  };

  const getEncodedMailSubject = () => encodeURIComponent(formState.subject + ' - via Portfolio from ' + formState.name);
  const getEncodedMailBody = () => encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);

  const getGmailUrl = () => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${getEncodedMailSubject()}&body=${getEncodedMailBody()}`;

  const getWhatsAppUrl = () => {
    const text = `Hi Premkumar, I'm reaching out via your portfolio.\n\nName: ${formState.name}\nEmail: ${formState.email}\nTopic: ${formState.subject}\n\nMessage:\n${formState.message}`;
    const cleanNumber = PERSONAL_INFO.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const getMailtoUrl = () => `mailto:${PERSONAL_INFO.email}?subject=${getEncodedMailSubject()}&body=${getEncodedMailBody()}`;

  const openMailClient = () => {
    const link = document.createElement('a');
    link.href = getMailtoUrl();
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#121215] border-t border-zinc-200/80 dark:border-zinc-800 transition-colors scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-2">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-heading">
              Let&apos;s build something exceptional together
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              Currently open to internships, entry-level web developer positions, and technical collaborations. Reach out directly or send an inquiry below.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Details & Links */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="p-6 bg-[#fafaf9] dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Direct Contact Channels
              </h3>

              {/* Email item */}
              <div className="p-3.5 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 block uppercase">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors cursor-pointer shrink-0"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone item */}
              <div className="p-3.5 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 block uppercase">
                      Phone Number
                    </span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline truncate block"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors cursor-pointer shrink-0"
                  title="Copy phone number"
                  aria-label="Copy phone"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* WhatsApp item */}
              <div className="p-3.5 bg-white dark:bg-zinc-800/90 rounded-xl border border-emerald-200/80 dark:border-emerald-800/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 block uppercase font-semibold">
                      WhatsApp Direct Chat
                    </span>
                    <a
                      href={PERSONAL_INFO.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline truncate flex items-center gap-1.5"
                    >
                      <span>{PERSONAL_INFO.whatsappNumber}</span>
                      <ExternalLink className="w-3 h-3 text-emerald-500 shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={PERSONAL_INFO.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 rounded-md transition-colors"
                  >
                    Chat
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PERSONAL_INFO.whatsappNumber, 'whatsapp')}
                    className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
                    title="Copy WhatsApp number"
                    aria-label="Copy WhatsApp"
                  >
                    {copiedField === 'whatsapp' ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location item */}
              <div className="p-3.5 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 block uppercase">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>

              {copiedField && (
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium pt-1">
                  ✓ {copiedField === 'email' ? 'Email' : copiedField === 'phone' ? 'Phone' : 'WhatsApp number'} copied to clipboard!
                </p>
              )}
            </div>

            {/* Professional Profiles */}
            <div className="p-6 bg-[#fafaf9] dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Professional Profiles &amp; Social Channels
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  id="contact-github-card"
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 flex items-center justify-between transition-colors group shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
                    <div className="truncate">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">GitHub</span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate block">Code &amp; Repos</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 shrink-0" />
                </a>

                <a
                  id="contact-linkedin-card"
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 flex items-center justify-between transition-colors group shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">LinkedIn</span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate block">Professional Network</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 shrink-0" />
                </a>

                <a
                  id="contact-instagram-card"
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-pink-200 dark:border-pink-800/50 hover:border-pink-400 dark:hover:border-pink-600 flex items-center justify-between transition-colors group shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">Instagram</span>
                      <span className="text-[10px] text-pink-600/80 dark:text-pink-400/80 truncate block">@_prem_.97</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-pink-400 group-hover:text-pink-600 shrink-0" />
                </a>

                <a
                  id="contact-whatsapp-card"
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 flex items-center justify-between transition-colors group shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">WhatsApp</span>
                      <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 truncate block">Instant Chat</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-500 group-hover:text-emerald-700 shrink-0" />
                </a>
              </div>
            </div>

            {/* Availability Note */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Response Turnaround</span>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                I typically respond to new recruitment messages and project inquiries within 24 hours.
              </p>
            </div>

          </ScrollReveal>

          {/* Right Column: Direct Message / Inquiry Form */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-7">
            <div className="bg-[#fafaf9] dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xs">
              
              <div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 font-heading flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                  Send an Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Fill out the form to generate a message or open directly in your mail client.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Message Prepared Successfully!
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
                      Thank you for reaching out, <strong className="text-zinc-800 dark:text-zinc-100">{formState.name}</strong>. 
                      You can send it immediately via your email client or copy the formatted text.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-lg mx-auto">
                    <a
                      href={getGmailUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                      aria-label="Open pre-filled email in Gmail Web Browser"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Gmail Web</span>
                    </a>

                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                      aria-label="Send pre-filled message via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <a
                      href={getMailtoUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white rounded-xl transition-colors cursor-pointer shadow-xs"
                      aria-label="Open in Default Mail Client"
                    >
                      <Send className="w-4 h-4" />
                      <span>Default Mail App</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        const fullText = `Subject: ${formState.subject}\nFrom: ${formState.name} (${formState.email})\n\n${formState.message}`;
                        copyToClipboard(fullText, 'fullMessage');
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 border border-zinc-300 dark:border-zinc-600 rounded-xl transition-colors cursor-pointer"
                      aria-label="Copy Message Text to Clipboard"
                    >
                      {copiedField === 'fullMessage' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-zinc-500 dark:text-zinc-300" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({
                          name: '',
                          email: '',
                          subject: 'Internship Opportunity',
                          message: ''
                        });
                      }}
                      className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 underline cursor-pointer"
                    >
                      ← Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Topic selection chips */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Inquiry Topic
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {presetTopics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setFormState({ ...formState, subject: topic })}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                            formState.subject === topic
                              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-2xs'
                              : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-name-input" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formState.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        aria-invalid={touched.name && Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-base sm:text-sm bg-white dark:bg-zinc-800 border rounded-xl focus:outline-none focus:ring-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all ${
                          touched.name && errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-zinc-300 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100'
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p id="contact-name-error" role="alert" className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-email-input" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          Your Email <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        placeholder="e.g. sarah@example.com"
                        value={formState.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={touched.email && Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-base sm:text-sm bg-white dark:bg-zinc-800 border rounded-xl focus:outline-none focus:ring-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all ${
                          touched.email && errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-zinc-300 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100'
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p id="contact-email-error" role="alert" className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject-input" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Subject
                    </label>
                    <input
                      id="contact-subject-input"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-100 transition-all"
                    />
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message-input" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                        {formState.message.trim().length} chars (min 10)
                      </span>
                    </div>
                    <textarea
                      id="contact-message-input"
                      rows={4}
                      required
                      placeholder="Write your note, job specs, or project details here..."
                      value={formState.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      aria-invalid={touched.message && Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`w-full px-3.5 py-2.5 text-base sm:text-sm bg-white dark:bg-zinc-800 border rounded-xl focus:outline-none focus:ring-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-y transition-all ${
                        touched.message && errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-zinc-300 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100'
                      }`}
                    />
                    {touched.message && errors.message && (
                      <p id="contact-message-error" role="alert" className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
                      Directly routed to <span className="font-mono text-zinc-700 dark:text-zinc-300 font-medium break-all">{PERSONAL_INFO.email}</span>
                    </span>

                    <button
                      id="submit-contact-form-btn"
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
