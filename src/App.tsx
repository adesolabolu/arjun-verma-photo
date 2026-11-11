import React, { useState, useEffect } from 'react';
import {
  PORTFOLIO_PROJECTS,
  SERVICE_ITEMS,
  INITIAL_HIGHLIGHTS,
  EXTRA_HIGHLIGHTS,
  STUDIO_LOCATIONS,
  JOURNAL_ENTRIES,
  IMAGES,
  ProjectItem,
  ServiceItem,
  HighlightShot,
  StudioCityKey,
} from './data/studioData';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

function SmartImage({ src, alt, className = '', fallbackLabel, ...props }: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#142925] text-white/70 p-6 text-center border border-white/10 ${className}`}
        role="img"
        aria-label={alt || fallbackLabel || 'Studio photograph'}
      >
        <i className="ph-fill ph-aperture text-brand-orange text-3xl mb-2"></i>
        <span className="font-primary text-sm tracking-wide text-white/90">
          {fallbackLabel || alt || 'Bakare Studio Frame'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [selectedCity, setSelectedCity] = useState<StudioCityKey>('Lagos (VI)');

  // Interactive Modal States
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightShot | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPresetService, setBookingPresetService] = useState<string>('Afro-Luxury Campaigns');
  const [showreelModalOpen, setShowreelModalOpen] = useState(false);
  const [journalModalOpen, setJournalModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    brandName: '',
    email: '',
    service: 'Afro-Luxury Campaigns',
    productCount: '5–15 Hero SKUs',
    city: 'Lagos (VI)',
    notes: '',
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'subscribed'>('idle');

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animation-on-scroll]');
    elements.forEach((el) => {
      el.classList.add('animate-on-scroll-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showAllHighlights]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedHighlight(null);
        setBookingModalOpen(false);
        setShowreelModalOpen(false);
        setJournalModalOpen(false);
        setCampaignModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openBookingWithService = (serviceName: string) => {
    setBookingPresetService(serviceName);
    setBookingForm((prev) => ({ ...prev, service: serviceName, city: selectedCity }));
    setBookingSubmitted(false);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus('subscribed');
    setNewsletterEmail('');
  };

  const currentStudio = STUDIO_LOCATIONS[selectedCity];

  return (
    <div className="font-secondary bg-brand-dark text-white overflow-x-hidden min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-sm border-b border-white-10">
        <nav className="flex justify-between items-center gap-8 py-5 px-6 md:px-16 text-white/90 max-w-[1920px] mx-auto">
          <a
            href="#"
            className="flex items-center gap-2 whitespace-nowrap shrink-0 focus:outline-none"
          >
            <i className="ph-fill ph-aperture text-brand-orange text-lg"></i>
            <span className="font-primary text-xl font-medium tracking-wide">Bakare Studio</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-light tracking-wider uppercase">
            <a
              href="#"
              className="hover:text-brand-orange transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Main
            </a>
            <a
              href="#portfolio"
              className="hover:text-brand-orange transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Portfolio
            </a>
            <a
              href="#services"
              className="hover:text-brand-orange transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#about"
              className="hover:text-brand-orange transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Atelier
            </a>
            <a
              href="#gallery"
              className="hover:text-brand-orange transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Archive
            </a>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => openBookingWithService('Afro-Luxury Campaigns')}
              className="hidden md:inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 text-xs font-medium tracking-widest uppercase hover:bg-[#f44336] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Lagos Studio
            </button>

            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-white hover:text-brand-orange transition-colors duration-200 focus:outline-none p-2"
            >
              <i className={`ph ${mobileMenuOpen ? 'ph-x' : 'ph-list'} text-2xl`}></i>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-brand-dark border-t border-white-10 absolute left-0 right-0 top-full shadow-2xl h-screen bg-opacity-95 backdrop-blur-xl"
          >
            <div className="flex flex-col p-8 gap-8 text-center items-center justify-center h-3/4">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-brand-orange font-primary text-2xl transition-colors duration-200"
              >
                Main
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-brand-orange font-primary text-2xl transition-colors duration-200"
              >
                Portfolio
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-brand-orange font-primary text-2xl transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-brand-orange font-primary text-2xl transition-colors duration-200"
              >
                Atelier
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-brand-orange font-primary text-2xl transition-colors duration-200"
              >
                Archive
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingWithService('Afro-Luxury Campaigns');
                }}
                className="mt-4 bg-brand-orange text-white px-8 py-3 text-xs font-bold tracking-widest uppercase"
              >
                Book Lagos Studio
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 md:px-16 overflow-hidden">
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
            {/* Left Text */}
            <div className="md:col-span-4 flex flex-col justify-between z-10" data-animation-on-scroll="">
              <div>
                <h1 className="font-primary text-6xl md:text-8xl text-white leading-[1.1]">
                  Tunde <br />
                  <span className="italic text-white/90">Bakare</span>
                </h1>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-white-40"></div>
                  <p className="text-xs tracking-[0.2em] text-white-60 uppercase">
                    Afro-Luxury Visual Director · Lagos
                  </p>
                </div>
              </div>

              <div className="mt-12 md:mt-0 relative">
                <button
                  type="button"
                  onClick={() => setSelectedHighlight(INITIAL_HIGHLIGHTS[1])}
                  className="group block text-left focus:outline-none cursor-pointer"
                  title="Inspect Medium Format Studio Rig"
                >
                  <SmartImage
                    src={IMAGES.aboutStudioRig}
                    alt="Phase One Medium Format Camera Rig"
                    className="w-24 h-24 object-cover rounded border border-white-20 group-hover:border-brand-orange transition"
                  />
                </button>
                <div className="mt-4">
                  <p className="text-brand-orange font-primary italic text-lg">
                    From Victoria Island to Harrods
                  </p>
                  <p className="text-white font-primary text-xl uppercase tracking-wide">
                    Sculpting African <br /> Craft in Light
                  </p>
                </div>
              </div>
            </div>

            {/* Center Arch Image */}
            <div
              className="md:col-span-4 relative flex flex-col items-center"
              data-animation-on-scroll=""
            >
              <div className="relative w-full max-w-md aspect-[3/4]">
                {/* Badge */}
                <a
                  href="#portfolio"
                  aria-label="Scroll to Featured Projects"
                  className="absolute -top-6 -right-6 z-20 bg-brand-accent rounded-full p-8 flex items-center justify-center animate-spin-slow shadow-lg w-32 h-32 hover:bg-brand-orange hover:text-white transition-colors cursor-pointer"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-center text-black leading-tight">
                      View <br /> Commissions
                    </div>
                  </div>
                </a>

                <div
                  onClick={() => setCampaignModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setCampaignModalOpen(true)}
                  className="w-full h-full arch-mask overflow-hidden relative border-4 border-white-10 group cursor-pointer"
                >
                  <SmartImage
                    src={IMAGES.heroFlacon}
                    alt="Oshun's Gold Luxury Nigerian Perfume Flacon"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setCampaignModalOpen(true)}
                  aria-label="Inspect Hero Lighting Setup"
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white hover:bg-brand-accent rounded-full p-3 shadow-xl z-20 transition cursor-pointer"
                >
                  <i className="ph-fill ph-camera text-black text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div
              className="md:col-span-4 flex flex-col relative z-10 pl-0 md:pl-8 h-full justify-between"
              data-animation-on-scroll=""
            >
              <div className="mb-12">
                <p className="font-primary text-3xl text-brand-orange italic mb-4">
                  &ldquo;Light is the language <br /> of prestige&rdquo;
                </p>
                <div className="flex gap-4 items-end">
                  <p className="text-white-60 text-sm max-w-[215px] leading-relaxed">
                    We translate raw Nigerian materiality—unrefined Ori, carved ebony, royal coral,
                    and beaten brass—into campaign visuals that command global desire.
                  </p>
                  <SmartImage
                    src={IMAGES.portfolioSkincare}
                    alt="Oro Nigeria Botanical Serum"
                    className="w-20 h-24 object-cover border border-white-20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Contact block */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openBookingWithService('Afro-Luxury Campaigns')}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && openBookingWithService('Afro-Luxury Campaigns')
                  }
                  className="bg-brand-orange p-8 relative overflow-hidden group cursor-pointer transition-all hover:bg-[#f44336]"
                >
                  <div className="absolute top-0 right-0 p-2 opacity-20">
                    <div className="border border-black rounded-full p-4 w-24 h-24"></div>
                  </div>
                  <p className="text-white text-xs uppercase tracking-widest mb-2">
                    Launching a flagship product?
                  </p>
                  <h3 className="text-white font-primary text-2xl">
                    BOOK <br /> A SHOOT
                  </h3>
                  <div className="absolute bottom-4 right-4 bg-black/20 p-2 rounded-full group-hover:bg-black/40 transition">
                    <i className="ph ph-arrow-up-right text-white text-xl"></i>
                  </div>
                </div>

                {/* Latest Work Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setCampaignModalOpen(true)}
                    className="cursor-pointer overflow-hidden"
                  >
                    <SmartImage
                      src={IMAGES.portfolioZobo}
                      alt="Oshun's Gold & Harmattan Edit"
                      className="w-full h-32 object-cover opacity-85 hover:opacity-100 hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="bg-[#1a2e28] p-4 flex flex-col justify-center border border-white-10">
                    <p className="text-white-40 text-xs uppercase mb-2">Latest Campaign</p>
                    <p className="text-white text-sm leading-tight">
                      Oshun&apos;s Gold <br /> Harmattan &apos;25
                    </p>
                    <button
                      type="button"
                      onClick={() => setCampaignModalOpen(true)}
                      className="text-brand-orange text-xs mt-2 hover:underline flex items-center gap-1 text-left cursor-pointer"
                    >
                      View Campaign <i className="ph ph-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-900/40 rounded-full blur-[100px] -z-0 pointer-events-none"></div>
        </section>

        {/* Top Marquee */}
        <section>
          <div className="py-4 border-y bg-brand-light border-black/10 text-gray-800 marquee-container flex items-center">
            <div className="marquee-content font-primary text-lg tracking-wider uppercase flex items-center gap-8">
              <span>Botanical Apothecary</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Bespoke Set Design</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Fine Coral &amp; Horology</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Craft Spirits &amp; Zobo</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Lagos to London Export</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Botanical Apothecary</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Bespoke Set Design</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Fine Coral &amp; Horology</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Craft Spirits &amp; Zobo</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
              <span>Lagos to London Export</span>{' '}
              <i className="ph-fill ph-aperture text-brand-orange text-xs"></i>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          className="bg-brand-light py-24 px-6 md:px-16 relative overflow-hidden text-brand-dark"
          id="about"
        >
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div data-animation-on-scroll="">
              <p className="text-brand-orange text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Victoria Island · Maitama · Diaspora
              </p>
              <h2 className="font-primary text-5xl md:text-6xl text-brand-dark leading-[1.1] mb-8">
                We turn Nigerian <br /> craft into global <br /> icons of luxury
              </h2>
              <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                From the warm sheen of unrefined Ori shea butter to 18k gold resting on hand-loomed
                Aso-Oke, our Victoria Island studio pairs 150-megapixel medium-format precision with
                authentic West African set architecture—giving homegrown brands undeniable shelf
                authority at home and abroad.
              </p>
              <a
                href="#portfolio"
                className="inline-flex bg-brand-accent text-brand-dark px-8 py-4 font-bold text-sm tracking-wider uppercase hover:bg-brand-orange hover:text-white transition items-center gap-2 rounded-sm shadow-md whitespace-nowrap"
              >
                Explore Case Studies <i className="ph ph-arrow-right text-lg"></i>
              </a>
            </div>

            <div className="relative" data-animation-on-scroll="">
              <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white rounded-full p-8 shadow-xl z-20 flex flex-col items-center justify-center w-32 h-32 border border-gray-100">
                <p className="text-2xl font-bold text-brand-dark tabular-nums">120+</p>
                <p className="text-[10px] text-gray-500 uppercase text-center leading-tight">
                  Luxury Brands <br /> Launched
                </p>
              </div>

              <div className="w-full aspect-[4/5] arch-mask overflow-hidden relative shadow-2xl">
                <SmartImage
                  src={IMAGES.aboutStudioRig}
                  alt="Victoria Island Lagos Commercial Photography Setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="bg-brand-dark py-32 px-6 md:px-16 relative" id="portfolio">
          <div className="max-w-[1920px] mx-auto">
            <div className="text-center mb-16 relative z-10" data-animation-on-scroll="">
              <p className="font-primary italic text-white-40 text-2xl mb-2">01</p>
              <h2 className="font-primary text-5xl md:text-6xl text-white">
                Visuals that Command Premium
              </h2>
              <div className="mt-4 flex justify-center">
                <div className="w-px h-16 bg-white-20"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-end">
              {/* Item 1: Botanical Skincare */}
              <div
                onClick={() => setSelectedProject(PORTFOLIO_PROJECTS[0])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(PORTFOLIO_PROJECTS[0])}
                className="relative group cursor-pointer"
                data-animation-on-scroll=""
              >
                <div className="overflow-hidden rounded-lg relative">
                  <SmartImage
                    src={PORTFOLIO_PROJECTS[0].image}
                    alt={PORTFOLIO_PROJECTS[0].title}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-end justify-end p-4">
                    <span className="opacity-0 group-hover:opacity-100 transition bg-brand-dark/90 text-white text-xs uppercase tracking-widest px-3 py-1.5 border border-white/20">
                      Inspect EXIF &amp; Setup
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-brand-orange pointer-events-none"></div>
                <div className="mt-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-white-60">
                    {PORTFOLIO_PROJECTS[0].category}
                  </p>
                  <h3 className="text-white font-primary text-xl group-hover:text-brand-orange transition">
                    {PORTFOLIO_PROJECTS[0].title}
                  </h3>
                </div>
              </div>

              {/* Item 2: Horology & Coral */}
              <div
                onClick={() => setSelectedProject(PORTFOLIO_PROJECTS[1])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(PORTFOLIO_PROJECTS[1])}
                className="relative md:-mb-16 group cursor-pointer"
                data-animation-on-scroll=""
              >
                <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-white-10 group-hover:border-brand-accent transition mb-4 shadow-2xl relative">
                  <SmartImage
                    src={PORTFOLIO_PROJECTS[1].image}
                    alt={PORTFOLIO_PROJECTS[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <p className="text-center text-white-60 text-sm font-primary italic">
                  {PORTFOLIO_PROJECTS[1].quote}
                </p>
              </div>

              {/* Item 3: Craft Beverage */}
              <div
                onClick={() => setSelectedProject(PORTFOLIO_PROJECTS[2])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(PORTFOLIO_PROJECTS[2])}
                className="relative group cursor-pointer"
                data-animation-on-scroll=""
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-accent z-0 rounded-tr-3xl pointer-events-none"></div>
                <div className="overflow-hidden rounded-lg relative z-10">
                  <SmartImage
                    src={PORTFOLIO_PROJECTS[2].image}
                    alt={PORTFOLIO_PROJECTS[2].title}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-end justify-end p-4">
                    <span className="opacity-0 group-hover:opacity-100 transition bg-brand-dark/90 text-white text-xs uppercase tracking-widest px-3 py-1.5 border border-white/20">
                      Inspect EXIF &amp; Setup
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-white-60">
                    {PORTFOLIO_PROJECTS[2].category}
                  </p>
                  <h3 className="text-white font-primary text-xl group-hover:text-brand-orange transition">
                    {PORTFOLIO_PROJECTS[2].title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-brand-light pb-24" id="services">
          {/* Marquee Light */}
          <div className="py-4 border-b border-black/10 text-gray-800 marquee-container flex items-center mb-24 bg-brand-light">
            <div className="marquee-content font-primary text-lg tracking-wider uppercase flex items-center gap-8">
              <span>Art Direction</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>Terracotta &amp; Brass Set Styling</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>150MP Medium Format</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>High-Speed Liquid Splash</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>Stop Motion Reels</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>Art Direction</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>Terracotta &amp; Brass Set Styling</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>150MP Medium Format</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>High-Speed Liquid Splash</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
              <span>Stop Motion Reels</span>{' '}
              <i className="ph-fill ph-circle text-brand-dark text-[8px]"></i>
            </div>
          </div>

          <div className="px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1920px] mx-auto">
            {SERVICE_ITEMS.map((service: ServiceItem) => (
              <div
                key={service.id}
                onClick={() => openBookingWithService(service.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openBookingWithService(service.title)}
                className={`group cursor-pointer ${service.offsetClass || ''}`}
                data-animation-on-scroll=""
              >
                <div className={`overflow-hidden mb-6 relative ${service.maskClass}`}>
                  <SmartImage
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-white px-3 py-1 text-xs font-bold tracking-widest uppercase text-brand-dark">
                    {service.tag}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-primary text-2xl text-brand-dark group-hover:text-brand-orange transition">
                    {service.title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark/70 group-hover:text-brand-orange transition tabular-nums">
                    {service.startingRate}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{service.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Studio Highlights / Gallery Section */}
        <section className="bg-brand-light pb-24 px-6 md:px-16 relative" id="gallery">
          <div
            className="flex flex-col items-center text-center mb-16"
            data-animation-on-scroll=""
          >
            <p className="text-brand-orange text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Lagos Archive &amp; Lighting Studies
            </p>
            <h2 className="font-primary text-5xl text-brand-dark">
              Frames that <br /> define modern <br /> African luxury
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-[1920px] mx-auto">
            <div
              onClick={() => setSelectedHighlight(INITIAL_HIGHLIGHTS[0])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedHighlight(INITIAL_HIGHLIGHTS[0])}
              className="md:col-span-3 cursor-pointer group"
              data-animation-on-scroll=""
            >
              <SmartImage
                src={INITIAL_HIGHLIGHTS[0].image}
                alt={INITIAL_HIGHLIGHTS[0].title}
                className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition duration-500 rounded-2xl shadow-lg"
              />
              <p className="text-xs uppercase tracking-widest mt-4 text-center text-gray-600 group-hover:text-brand-orange transition">
                {INITIAL_HIGHLIGHTS[0].label}
              </p>
            </div>

            <div
              className="md:col-span-6 flex justify-center relative py-12"
              data-animation-on-scroll=""
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-brand-dark/10 rounded-full pointer-events-none"></div>
              <button
                type="button"
                onClick={() => setShowAllHighlights((prev) => !prev)}
                className="bg-brand-accent px-10 py-4 font-bold text-sm tracking-wider uppercase hover:bg-brand-orange hover:text-white transition shadow-lg z-10 rounded-sm text-brand-dark cursor-pointer whitespace-nowrap"
              >
                {showAllHighlights ? 'Collapse Archive' : 'Load More Shots'}
              </button>
            </div>

            <div
              onClick={() => setSelectedHighlight(INITIAL_HIGHLIGHTS[1])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedHighlight(INITIAL_HIGHLIGHTS[1])}
              className="md:col-span-3 cursor-pointer group"
              data-animation-on-scroll=""
            >
              <SmartImage
                src={INITIAL_HIGHLIGHTS[1].image}
                alt={INITIAL_HIGHLIGHTS[1].title}
                className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition duration-500 rounded-2xl shadow-lg"
              />
              <p className="text-xs uppercase tracking-widest mt-4 text-center text-gray-600 group-hover:text-brand-orange transition">
                {INITIAL_HIGHLIGHTS[1].label}
              </p>
            </div>
          </div>

          {/* Expanded Highlights Grid when "Load More Shots" is clicked */}
          {showAllHighlights && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[1920px] mx-auto mt-14 pt-12 border-t border-brand-dark/10">
              {EXTRA_HIGHLIGHTS.map((shot) => (
                <div
                  key={shot.id}
                  onClick={() => setSelectedHighlight(shot)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedHighlight(shot)}
                  className="cursor-pointer group"
                  data-animation-on-scroll=""
                >
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <SmartImage
                      src={shot.image}
                      alt={shot.title}
                      className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-widest mt-4 text-center text-gray-600 group-hover:text-brand-orange transition">
                    {shot.label}
                  </p>
                  <p className="text-xs text-center text-gray-500 mt-1">{shot.title}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark pt-24 text-white relative overflow-hidden border-t border-white-10">
        {/* Footer Top / Testimonial Area */}
        <div className="px-6 md:px-16 pb-24 grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10 max-w-[1920px] mx-auto">
          <div data-animation-on-scroll="">
            <span className="text-brand-orange text-5xl font-primary leading-none">&ldquo;</span>
            <h3 className="font-primary text-3xl md:text-4xl leading-snug mt-2">
              Showcasing Nigerian <br /> luxury in its <br />{' '}
              <span className="text-brand-orange border-b-2 border-brand-orange">truest light</span>
            </h3>

            <button
              type="button"
              onClick={() => openBookingWithService('Fine Jewelry & Leather')}
              className="mt-8 bg-brand-accent hover:bg-brand-orange hover:text-white transition p-4 inline-block text-brand-dark rounded-lg cursor-pointer"
              title="Book a Studio Session"
            >
              <i className="ph ph-camera text-3xl"></i>
            </button>
          </div>

          <div className="flex justify-center relative" data-animation-on-scroll="">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white-10 relative">
              <SmartImage
                src={IMAGES.portraitTunde}
                alt="Tunde Bakare Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowreelModalOpen(true)}
              className="absolute bottom-0 right-0 md:right-10 bg-brand-accent hover:bg-brand-orange hover:text-white transition rounded-full p-6 text-black font-bold text-xs uppercase tracking-widest flex flex-col items-center justify-center w-24 h-24 rotate-12 shadow-lg transform translate-y-4 cursor-pointer"
            >
              <span>Play</span>
              <i className="ph-fill ph-play mt-1 text-sm"></i>
            </button>
          </div>

          <div className="text-left md:text-right" data-animation-on-scroll="">
            <p className="font-primary italic text-brand-orange text-lg mb-4">Studio Philosophy</p>
            <h3 className="text-2xl font-light leading-relaxed">
              Honoring heritage <br /> craft, defining <br /> modern Nigeria.
            </h3>
            <button
              type="button"
              onClick={() => setJournalModalOpen(true)}
              className="inline-block mt-8 border border-white/30 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-colors duration-200 cursor-pointer"
            >
              Read Monographs
            </button>
          </div>
        </div>

        {/* Footer Marquee */}
        <div className="py-4 border-y bg-[#0f1c18] border-white-10 text-white-60 marquee-container flex items-center">
          <div className="marquee-content font-primary text-lg tracking-wider uppercase flex items-center gap-8">
            <span>Victoria Island</span> <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>D2C &amp; Paystack</span>{' '}
            <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>Stop Motion</span> <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>150MP Macro</span> <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>Global Export</span> <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>Victoria Island</span> <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>D2C &amp; Paystack</span>{' '}
            <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>Stop Motion</span> <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>150MP Macro</span> <i className="ph-fill ph-star text-brand-orange text-xs"></i>
            <span>Global Export</span> <i className="ph-fill ph-star text-brand-orange text-xs"></i>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="bg-[#142925] py-16 px-6 md:px-16">
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white-10 pb-12">
            <div>
              <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-6">
                Studios &amp; Intake
              </p>
              <div className="flex flex-wrap gap-3">
                {(['Lagos (VI)', 'Abuja', 'London Desk'] as const).map((city) => {
                  const isActive = selectedCity === city;
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSelectedCity(city)}
                      className={
                        isActive
                          ? 'bg-white text-brand-dark rounded-full px-4 py-2 text-xs uppercase font-bold cursor-pointer transition whitespace-nowrap'
                          : 'border border-white-20 rounded-full px-4 py-2 text-xs uppercase hover:bg-white-10 cursor-pointer transition whitespace-nowrap'
                      }
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 text-xs text-white/70 space-y-1 leading-relaxed">
                <p className="text-white font-medium">{currentStudio.neighborhood}</p>
                <p>{currentStudio.stageSize}</p>
                <p className="text-brand-accent">{currentStudio.availability}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-6">
                Socials
              </p>
              <div className="flex gap-4">
                <a
                  href="#portfolio"
                  aria-label="Instagram Portfolio Highlights"
                  className="border border-white-20 text-white rounded-full p-2.5 hover:bg-white-10 cursor-pointer transition"
                >
                  <i className="ph ph-instagram-logo text-lg"></i>
                </a>
                <a
                  href="#gallery"
                  aria-label="Behance Case Studies"
                  className="border border-white-20 text-white rounded-full p-2.5 hover:bg-white-10 cursor-pointer transition"
                >
                  <i className="ph ph-behance-logo text-lg"></i>
                </a>
                <button
                  type="button"
                  onClick={() => openBookingWithService('Afro-Luxury Campaigns')}
                  aria-label="Connect & Book via Studio Desk"
                  className="border border-white-20 text-white rounded-full p-2.5 hover:bg-white-10 cursor-pointer transition"
                >
                  <i className="ph ph-linkedin-logo text-lg"></i>
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-6">
                Lagos Lighting Dispatches
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex border-b border-white-20 pb-2 items-center gap-4"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                  }}
                  placeholder="Receive our quarterly Afro-Luxury packaging & lighting monograph..."
                  className="bg-transparent w-full outline-none text-white placeholder-white-40 font-light text-sm"
                />
                <button
                  type="submit"
                  className="text-xs font-bold uppercase hover:text-brand-orange transition cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              {newsletterStatus === 'subscribed' && (
                <p className="text-xs text-brand-accent mt-2">
                  Welcome to the Bakare Studio Victoria Island Dispatch.
                </p>
              )}
            </div>
          </div>

          <div className="max-w-[1920px] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white-40 uppercase tracking-widest">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <i className="ph-fill ph-aperture text-brand-orange"></i>
              <span className="text-white">Tunde Bakare Studio · Lagos &amp; Abuja</span>
            </div>
            <p>&copy; 2025 Bakare Visual Production Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Project Lightbox / Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#142925] border border-white/15 max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:col-span-6 bg-black relative">
              <SmartImage
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full max-h-[540px] object-cover"
              />
            </div>
            <div className="md:col-span-6 p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <p className="text-xs uppercase tracking-widest text-brand-orange">
                    {selectedProject.category} · {selectedProject.year}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close modal"
                    className="text-white/60 hover:text-white text-xl cursor-pointer"
                  >
                    &#x2715;
                  </button>
                </div>

                <h3 className="font-primary text-3xl text-white mt-2">{selectedProject.title}</h3>
                <p className="text-xs text-white/60 mt-1">{selectedProject.client}</p>

                <p className="text-sm text-white/80 leading-relaxed mt-6">
                  {selectedProject.summary}
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs">
                  <p className="uppercase tracking-widest text-brand-accent font-semibold mb-3">
                    Technical EXIF &amp; Lighting Rig
                  </p>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Medium Format Body</span>
                    <span className="text-white font-mono">{selectedProject.exif.camera}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Optics</span>
                    <span className="text-white font-mono">{selectedProject.exif.lens}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Exposure</span>
                    <span className="text-white font-mono tabular-nums">
                      {selectedProject.exif.aperture} · {selectedProject.exif.shutter} ·{' '}
                      {selectedProject.exif.iso}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 gap-4">
                    <span className="text-white/50 shrink-0">Lighting</span>
                    <span className="text-white text-right">{selectedProject.exif.lighting}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/50">Deliverables</span>
                    <span className="text-white">{selectedProject.deliverables}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    openBookingWithService(`Commission Like ${title}`);
                  }}
                  className="bg-brand-orange hover:bg-[#f44336] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition cursor-pointer"
                >
                  Commission Similar Shoot
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-xs uppercase tracking-widest text-white/60 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Studio Highlight Single Shot Lightbox */}
      {selectedHighlight && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedHighlight(null)}
        >
          <div
            className="bg-[#142925] border border-white/15 max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <SmartImage
                src={selectedHighlight.image}
                alt={selectedHighlight.title}
                className="w-full max-h-[460px] object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedHighlight(null)}
                className="absolute top-4 right-4 bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-brand-orange transition cursor-pointer"
              >
                &#x2715;
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-orange">
                  {selectedHighlight.label} · {selectedHighlight.exif}
                </p>
                <h4 className="font-primary text-2xl text-white mt-1">
                  {selectedHighlight.title}
                </h4>
                <p className="text-xs text-white/70 mt-1">{selectedHighlight.lightingNote}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedHighlight(null);
                  openBookingWithService('Afro-Luxury Campaigns');
                }}
                className="bg-brand-accent text-brand-dark px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition shrink-0 cursor-pointer"
              >
                Book Studio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Oshun's Gold Harmattan '25 Campaign Modal */}
      {campaignModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setCampaignModalOpen(false)}
        >
          <div
            className="bg-[#142925] border border-white/15 max-w-4xl w-full rounded-xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-orange">
                  Latest Flagship Campaign · Harmattan &apos;25
                </p>
                <h3 className="font-primary text-3xl text-white mt-1">
                  Oshun&apos;s Gold &amp; Oro Botanicals — Victoria Island Showcase
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCampaignModalOpen(false)}
                className="text-white/60 hover:text-white text-xl cursor-pointer"
              >
                &#x2715;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <SmartImage
                src={IMAGES.heroFlacon}
                alt="Oshun's Gold Flacon"
                className="w-full aspect-[3/4] object-cover rounded-lg"
              />
              <SmartImage
                src={IMAGES.portfolioSkincare}
                alt="Oro Nigeria Botanical Serum"
                className="w-full aspect-[3/4] object-cover rounded-lg"
              />
              <SmartImage
                src={IMAGES.portfolioZobo}
                alt="Spiked Hibiscus Zobo Splash"
                className="w-full aspect-[3/4] object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/70 max-w-xl leading-relaxed">
                Captured at our Victoria Island stage using charred Benin ebony plinths, unpolished
                travertine, raw Ori shea butter, and 150MP Phase One medium-format optics.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCampaignModalOpen(false);
                  openBookingWithService('Afro-Luxury Campaigns');
                }}
                className="bg-brand-orange text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#f44336] transition shrink-0 cursor-pointer"
              >
                Book Campaign Shoot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Behind-the-Scenes Showreel Modal */}
      {showreelModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowreelModalOpen(false)}
        >
          <div
            className="bg-[#142925] border border-white/15 max-w-3xl w-full rounded-xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-orange">
                  Victoria Island Stage Showreel &amp; Rig Breakdown
                </p>
                <h3 className="font-primary text-2xl md:text-3xl text-white mt-1">
                  Sculpting Nigerian Luxury in 1/12,800th of a Second
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowreelModalOpen(false)}
                className="text-white/60 hover:text-white text-xl cursor-pointer"
              >
                &#x2715;
              </button>
            </div>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 mb-6">
              <SmartImage
                src={IMAGES.aboutStudioRig}
                alt="Victoria Island Studio Lighting Setup"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-widest text-brand-accent">
                  Stage A · Sinari Daranijo, Victoria Island, Lagos
                </p>
                <p className="font-primary text-xl text-white mt-1">
                  High-Speed Motion Control &amp; Medium Format Tabletop Reel (02:18)
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-xs text-white/80 border-t border-white/15 pt-4">
                  <div>
                    <span className="text-white/50 block">Capture</span>
                    Phase One XF IQ4 150MP
                  </div>
                  <div>
                    <span className="text-white/50 block">Motion Control</span>
                    MRMC Bolt Jr+ High-Speed Arm
                  </div>
                  <div>
                    <span className="text-white/50 block">Flash Duration</span>
                    Profoto Pro-11 · t0.1 @ 1/12,800s
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowreelModalOpen(false);
                  openBookingWithService('Stop Motion & Commercial Reel');
                }}
                className="bg-brand-accent text-brand-dark px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition cursor-pointer"
              >
                Inquire About Motion &amp; Stills
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Journal Modal */}
      {journalModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setJournalModalOpen(false)}
        >
          <div
            className="bg-brand-light text-brand-dark max-w-3xl w-full rounded-xl p-6 md:p-10 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-brand-dark/15 pb-6 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                  Bakare Studio Monographs · Lagos
                </p>
                <h3 className="font-primary text-3xl text-brand-dark mt-1">
                  Notes on Light, Materiality &amp; Nigerian Luxury
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setJournalModalOpen(false)}
                className="text-brand-dark/60 hover:text-brand-dark text-xl cursor-pointer"
              >
                &#x2715;
              </button>
            </div>

            <div className="space-y-10">
              {JOURNAL_ENTRIES.map((entry) => (
                <article
                  key={entry.id}
                  className="border-b border-brand-dark/10 pb-8 last:border-b-0"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span>{entry.issue}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{entry.date}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{entry.readTime}</span>
                  </div>
                  <h4 className="font-primary text-2xl text-brand-dark mb-3">{entry.title}</h4>
                  <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                    {entry.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Book a Shoot Modal */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            className="bg-[#142925] border border-white/15 max-w-xl w-full rounded-xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-orange">
                  Victoria Island &amp; Maitama Production Desk
                </p>
                <h3 className="font-primary text-3xl text-white mt-1">Commission a Shoot</h3>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="text-white/60 hover:text-white text-xl cursor-pointer"
              >
                &#x2715;
              </button>
            </div>

            {bookingSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent text-brand-dark mx-auto flex items-center justify-center">
                  <i className="ph-fill ph-check text-2xl"></i>
                </div>
                <h4 className="font-primary text-2xl text-white">Production Brief Received</h4>
                <p className="text-sm text-white/75 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{bookingForm.brandName}</span>.
                  Our Senior Producer at the{' '}
                  <span className="text-brand-accent">{bookingForm.city}</span> desk will send a
                  tailored lighting treatment &amp; Naira/USD estimate for{' '}
                  <span className="text-white">{bookingForm.service}</span> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="mt-4 bg-brand-orange text-white px-8 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Brand / House Name
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.brandName}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, brandName: e.target.value })
                      }
                      placeholder="e.g. Arami Essentials / Oshun's Gold"
                      className="w-full bg-brand-dark border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-brand-orange outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Founder / Producer Email
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="founder@brand.ng"
                      className="w-full bg-brand-dark border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-brand-orange outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Service Package
                    </label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                      className="w-full bg-brand-dark border border-white/20 px-3 py-2.5 text-sm text-white focus:border-brand-orange outline-none"
                    >
                      <option value="D2C & E-Commerce">D2C &amp; E-Commerce</option>
                      <option value="Afro-Luxury Campaigns">Afro-Luxury Campaigns</option>
                      <option value="Fine Jewelry & Leather">Fine Jewelry &amp; Leather</option>
                      <option value="Stop Motion & Commercial Reel">Stop Motion &amp; Reel</option>
                      {bookingPresetService &&
                        ![
                          'D2C & E-Commerce',
                          'Afro-Luxury Campaigns',
                          'Fine Jewelry & Leather',
                          'Stop Motion & Commercial Reel',
                        ].includes(bookingPresetService) && (
                          <option value={bookingPresetService}>{bookingPresetService}</option>
                        )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Scope / SKUs
                    </label>
                    <select
                      value={bookingForm.productCount}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, productCount: e.target.value })
                      }
                      className="w-full bg-brand-dark border border-white/20 px-3 py-2.5 text-sm text-white focus:border-brand-orange outline-none"
                    >
                      <option value="1–5 Flagship SKUs">1–5 Flagship SKUs</option>
                      <option value="5–15 Hero SKUs">5–15 Hero SKUs</option>
                      <option value="15–50 Catalog SKUs">15–50 Catalog SKUs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Studio Location
                    </label>
                    <select
                      value={bookingForm.city}
                      onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
                      className="w-full bg-brand-dark border border-white/20 px-3 py-2.5 text-sm text-white focus:border-brand-orange outline-none"
                    >
                      <option value="Lagos (VI)">Lagos (Victoria Island)</option>
                      <option value="Abuja">Abuja (Maitama)</option>
                      <option value="London Desk">London Diaspora Intake</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5">
                    Materiality &amp; Set Notes
                  </label>
                  <textarea
                    rows={3}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    placeholder="Tell us about your packaging textures (amber glass, brass, Aso-Oke, raw shea, splash shots) or target launch date..."
                    className="w-full bg-brand-dark border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-brand-orange outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="text-xs uppercase tracking-widest text-white/60 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-orange hover:bg-[#f44336] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition cursor-pointer"
                  >
                    Request Studio Estimate
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
