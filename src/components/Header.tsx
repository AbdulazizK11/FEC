import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICE_INFO } from '../data/mockData';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';

interface HeaderProps {
  onOpenEstimator?: () => void;
  onOpenConsultation?: () => void;
}

export default function Header({}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { isAr, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for navigation highlight
      const sections = ['hero', 'packages', 'portfolio', 'about', 'estimator', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t('navHome'), href: '#hero', isHome: true },
    { id: 'packages', label: t('navPackages'), href: '#packages' },
    { id: 'portfolio', label: t('navPortfolio'), href: '#portfolio' },
    { id: 'about', label: t('navAbout'), href: '#about' },
    { id: 'estimator', label: t('navEstimator'), href: '#estimator' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#F5F4F0]/95 backdrop-blur-md border-b border-[#E0E1DC] shadow-xs py-3'
          : 'bg-[#F5F4F0] border-b border-[#E0E1DC] py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Right Group: Logo ("فَلَق" in AR / "Falaq" in EN) + Nav Items */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            
            {/* Logo */}
            <a 
              href="#hero" 
              className="flex items-center group transition-transform hover:opacity-90 py-0.5 shrink-0"
              aria-label={isAr ? "مكتب فلق للإستشارات الهندسية" : "Falaq Engineering Consultancy"}
            >
              {isAr ? (
                <div className="relative inline-flex items-center">
                  {/* Single elongated fat-ha bar matching Thmanyah logo style */}
                  <span 
                    className="absolute -top-0.5 sm:-top-1 right-2 sm:right-2.5 w-4 sm:w-5 h-[2.5px] sm:h-[3px] bg-[#000000] rounded-full -rotate-12 pointer-events-none transform origin-right"
                    aria-hidden="true"
                  />
                  <span className="text-2xl sm:text-3xl font-th-black tracking-normal text-[#000000] font-thmanyah-display select-none leading-none">
                    فــــلــــق
                  </span>
                </div>
              ) : (
                <div className="relative inline-flex items-center">
                  <span className="text-2xl sm:text-[28px] font-th-black tracking-tight text-[#000000] font-thmanyah-display select-none leading-none">
                    Falaq
                  </span>
                </div>
              )}
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => {
                const isSelected = (link.isHome && activeSection === 'hero') || activeSection === link.id;
                
                if (link.isHome) {
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      className={`px-3 py-1.5 text-sm sm:text-[14px] xl:text-[15px] font-th-bold transition-all rounded-md font-thmanyah-sans whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#E5E4DE] text-[#000000]'
                          : 'text-[#343A2F] hover:text-[#000000] hover:bg-[#E5E4DE]/60'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`px-2.5 xl:px-3 py-1.5 text-sm sm:text-[14px] xl:text-[15px] transition-colors rounded-md font-thmanyah-sans whitespace-nowrap ${
                      isSelected
                        ? 'font-th-bold text-[#000000] bg-[#E5E4DE]/60'
                        : 'font-th-medium text-[#343A2F] hover:text-[#000000] hover:bg-[#E5E4DE]/40'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Left Side: Contact Information Blocks + FEC Badge + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            
            {/* Direct Contact Info (Call Us & Email) - Bespoke Architectural Style for Falaq */}
            <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-right select-none" dir="rtl">
              
              {/* 1. Call Us Item */}
              <a 
                href={`tel:${OFFICE_INFO.phone}`} 
                className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
                title="اتصل بنا مباشرة"
              >
                <div className="text-right">
                  <span className="block text-[10px] font-th-bold tracking-wide text-[#7A6E63] group-hover:text-[#0E1910] transition-colors leading-tight">
                    {isAr ? 'اتصل بنا' : 'Call Us'}
                  </span>
                  <span className="block text-[12px] xl:text-[13px] font-th-bold text-[#0E1910] font-thmanyah-sans leading-snug tracking-tight" dir="ltr">
                    {OFFICE_INFO.mobile}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-sm bg-white border border-[#D5D3CA] flex items-center justify-center text-[#232921] shadow-2xs group-hover:bg-[#0E1910] group-hover:border-[#0E1910] group-hover:text-[#F4E95B] transition-all duration-200 shrink-0">
                  <Phone className="w-3.5 h-3.5 stroke-[1.9]" />
                </div>
              </a>

              {/* Refined Architectural Divider */}
              <div className="h-6 w-[1px] bg-[#D5D3CA] shrink-0 opacity-80" aria-hidden="true" />

              {/* 2. Email Us Item */}
              <a 
                href={`mailto:${OFFICE_INFO.email}`} 
                className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
                title="تواصل عبر البريد"
              >
                <div className="text-right">
                  <span className="block text-[10px] font-th-bold tracking-wide text-[#7A6E63] group-hover:text-[#0E1910] transition-colors leading-tight">
                    {isAr ? 'تواصل عبر البريد' : 'Email Us'}
                  </span>
                  <span className="block text-[12px] xl:text-[13px] font-th-bold text-[#0E1910] font-thmanyah-sans leading-snug tracking-tight" dir="ltr">
                    {OFFICE_INFO.email}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-sm bg-white border border-[#D5D3CA] flex items-center justify-center text-[#232921] shadow-2xs group-hover:bg-[#0E1910] group-hover:border-[#0E1910] group-hover:text-[#F4E95B] transition-all duration-200 shrink-0">
                  <Mail className="w-3.5 h-3.5 stroke-[1.9]" />
                </div>
              </a>

            </div>

            {/* Language Switcher (AR / EN) */}
            <button
              id="header-language-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-sm bg-white hover:bg-[#E5E4DE] text-[#0E1910] border border-[#D5D3CA] hover:border-[#0E1910] shadow-2xs transition-all duration-200 cursor-pointer font-th-bold text-xs sm:text-[13px] font-thmanyah-sans select-none shrink-0"
              title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
              aria-label={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 stroke-[2] text-[#7A6E63]" />
              <span className="leading-none">{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* FEC Black Logo Badge (Placed at far left) */}
            <a 
              href="#hero" 
              className="flex items-center gap-2 group cursor-pointer shrink-0"
              title="مكتب فلق للإستشارات الهندسية | FEC"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#0E1910] text-[#F5F4F0] p-1 flex flex-col items-center justify-center shadow-xs group-hover:bg-[#000000] transition-all border border-[#343A2F]/20 relative">
                <span className="font-thmanyah-display font-th-heavy text-[11px] sm:text-xs tracking-wider text-[#F4E95B] leading-none">
                  FEC
                </span>
                <div className="w-3.5 h-[1px] bg-[#C0886A] mt-0.5" />
              </div>
            </a>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center">
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md bg-[#E5E4DE]/60 text-[#000000] border border-[#E0E1DC] hover:bg-[#E5E4DE] transition-colors"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer" 
          className="lg:hidden bg-[#F5F4F0] border-b border-[#E0E1DC] px-6 py-5 space-y-3 animate-in slide-in-from-top duration-200 text-right shadow-md"
        >
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isSelected = (link.isHome && activeSection === 'hero') || activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm transition-colors font-thmanyah-sans ${
                    isSelected
                      ? 'bg-[#E5E4DE] text-[#000000] font-th-bold'
                      : 'text-[#343A2F] hover:bg-[#E5E4DE]/50 font-th-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-[#343A2F] text-xs">←</span>
                </a>
              );
            })}
          </div>

          {/* Quick Contact info in Mobile Drawer */}
          <div className="pt-3 border-t border-[#E0E1DC] flex flex-col gap-2">
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 rounded-md bg-white border border-[#E0E1DC] text-xs font-th-bold text-[#0E1910] hover:bg-[#E5E4DE] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-sm bg-[#F5F4F0] border border-[#D5D3CA] flex items-center justify-center text-[#232921]">
                  <Globe className="w-3 h-3 stroke-[2]" />
                </div>
                <span>{isAr ? 'اللغة / Language:' : 'Language / اللغة:'}</span>
              </div>
              <span className="bg-[#0E1910] text-[#F4E95B] px-2 py-0.5 rounded-xs text-[11px]">
                {isAr ? 'English (EN)' : 'العربية (AR)'}
              </span>
            </button>
            <a 
              href={`tel:${OFFICE_INFO.phone}`} 
              className="flex items-center justify-between p-2.5 rounded-md bg-white border border-[#E0E1DC] text-xs font-th-bold text-[#0E1910] hover:bg-[#F5F4F0] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-sm bg-[#F5F4F0] border border-[#D5D3CA] flex items-center justify-center text-[#232921]">
                  <Phone className="w-3 h-3 stroke-[2]" />
                </div>
                <span>{isAr ? 'اتصل بنا:' : 'Call Us:'}</span>
              </div>
              <span dir="ltr">{OFFICE_INFO.mobile}</span>
            </a>
            <a 
              href={`mailto:${OFFICE_INFO.email}`} 
              className="flex items-center justify-between p-2.5 rounded-md bg-white border border-[#E0E1DC] text-xs font-th-bold text-[#0E1910] hover:bg-[#F5F4F0] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-sm bg-[#F5F4F0] border border-[#D5D3CA] flex items-center justify-center text-[#232921]">
                  <Mail className="w-3 h-3 stroke-[2]" />
                </div>
                <span>{isAr ? 'البريد الإلكتروني:' : 'Email:'}</span>
              </div>
              <span dir="ltr">{OFFICE_INFO.email}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

