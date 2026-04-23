/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Building2, 
  PaintBucket, 
  Wrench, 
  Grid3X3, 
  Layers, 
  Hammer, 
  RefreshCw, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Menu, 
  X,
  ChevronRight,
  ArrowRight,
  Play
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className={`container-custom transition-all duration-300 rounded-2xl border border-slate-200 flex justify-between items-center px-6 py-3 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white shadow-sm"
      }`}>
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-brand-orange rotate-45 flex items-center justify-center">
              <span className="text-white font-bold -rotate-45 text-[10px]">K</span>
            </div>
          </div>
          <span className="text-lg font-display font-extrabold uppercase tracking-tight text-slate-900">
            Kim <span className="text-brand-orange">Constructors</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-brand-orange"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary">
            Request Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-custom absolute top-full left-0 right-0 px-4 mt-2"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 flex flex-col gap-6 md:hidden">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-slate-900 uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>
              Request a Quote
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const BentoHero = () => {
  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-min mt-24">
      {/* Hero Body */}
      <section className="col-span-12 lg:col-span-8 bg-slate-900 rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-end border border-slate-800 min-h-[500px]">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Building2 size={240} className="text-white" />
        </div>
        <div className="relative z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-brand-orange text-white text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold"
          >
            Premier Construction Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] uppercase"
          >
            Building Excellence, <br/>
            <span className="text-brand-orange text-outline-white">Crafting Perfection</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl"
          >
            Kim Constructors offers expert architectural construction and premium finishing services for residential and commercial landmarks.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a href="#services" className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold shadow-xl transition-transform hover:scale-105 active:scale-95">View Our Services</a>
          </motion.div>
        </div>
      </section>

      {/* Side Block - About/Standard */}
      <section id="about" className="col-span-12 lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-200 flex flex-col">
        <div className="mb-6">
          <h3 className="text-slate-900 font-bold text-xl mb-4 uppercase tracking-tight">The Kim Standard</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Delivering high-end architectural works and industrial construction with precision since 15 years. We redefine structural integrity through modern aesthetics.
          </p>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-orange-100 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold italic shadow-inner">P</div>
            <div className="text-xs text-slate-700 group">
              <p className="font-bold uppercase tracking-wide">Professional Craft</p>
              <p className="opacity-60 font-medium">Master-level attention to detail</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold italic shadow-inner">T</div>
            <div className="text-xs text-slate-700">
              <p className="font-bold uppercase tracking-wide">On-Time Delivery</p>
              <p className="opacity-60 font-medium">Agile project management cycles</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold italic shadow-inner">$</div>
            <div className="text-xs text-slate-700">
              <p className="font-bold uppercase tracking-wide">Affordable Quality</p>
              <p className="opacity-60 font-medium">Premium results, balanced budgets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Mini Bento) */}
      <section id="services" className="col-span-12 lg:col-span-6 bento-card">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-xl uppercase text-slate-900 tracking-tight">Our Expertise</h3>
          <a href="#" className="flex items-center gap-1 text-[10px] text-brand-orange font-bold uppercase tracking-widest hover:underline">
            Explore All <ArrowRight size={12} />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { id: "AD", label: "Architectural\nDesign", img: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=400" },
            { id: "PF", label: "Painting &\nFinishing", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400", accent: true },
            { id: "PI", label: "Plumbing\nInstallation", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400" },
            { id: "TW", label: "Tiling &\nFloor Works", img: "https://images.unsplash.com/photo-1516503562468-9b98563f6482?auto=format&fit=crop&q=80&w=400" },
            { id: "GC", label: "Gypsum\nCeilings", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400" },
            { id: "+", label: "Renovations &\nRemodeling", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400", dark: true },
          ].map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`group relative rounded-2xl h-32 overflow-hidden shadow-sm border ${s.accent ? "border-brand-orange/30" : "border-slate-100"}`}
            >
              <img src={s.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={s.label} />
              <div className={`absolute inset-0 bg-gradient-to-t ${s.dark ? "from-black/90 via-black/40" : "from-slate-900/90 via-slate-900/40"} to-transparent p-4 flex flex-col justify-between`}>
                <div className={`${s.dark ? "bg-brand-orange" : "bg-white/20 backdrop-blur-md"} w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-md`}>
                  {s.id}
                </div>
                <span className="text-[10px] font-bold uppercase leading-tight text-white tracking-wide">
                  {s.label.split('\n').map((line, j) => <span key={j} className="block">{line}</span>)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Inquiry Form */}
      <section id="contact" className="col-span-12 md:col-span-6 lg:col-span-3 bento-card">
        <h3 className="font-bold text-lg uppercase text-slate-900 mb-6 tracking-tight">Quick Inquiry</h3>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Full Name" className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium" />
          <input type="email" placeholder="Email Address" className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium" />
          <textarea placeholder="Project Details" className="w-full h-24 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium resize-none"></textarea>
          <button className="w-full bg-slate-900 text-white text-xs py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg">Send Message</button>
        </form>
      </section>

      {/* Contact Info Card */}
      <section className="col-span-12 md:col-span-6 lg:col-span-3 bento-card-dark bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Phone size={120} />
        </div>
        <h3 className="font-bold text-lg uppercase mb-8 tracking-tight relative z-10">Direct Contact</h3>
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Location</p>
              <p className="text-xs font-bold">Changara, Kenya</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 transition-transform group-hover:scale-110 group-hover:bg-brand-orange group-hover:border-brand-orange">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Phone</p>
              <p className="text-xs font-bold">+254716970377</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 transition-transform group-hover:scale-110 group-hover:bg-brand-orange group-hover:border-brand-orange">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Email</p>
              <p className="text-xs font-bold">contact@kimconstruct.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Info (Why Choose) */}
      <section className="col-span-12 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <CheckCircle2 className="text-brand-orange" size={32} />
            <h4 className="text-lg font-bold uppercase text-slate-900 tracking-tight">Craftsmanship</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Our skilled artisans ensure every detail meets the highest industry standards with master-level precision.</p>
          </div>
          <div className="space-y-4">
            <RefreshCw className="text-brand-orange" size={32} />
            <h4 className="text-lg font-bold uppercase text-slate-900 tracking-tight">Agility</h4>
            <p className="text-slate-500 text-sm leading-relaxed">On-time project delivery refined by agile management cycles that respect your schedule and investment.</p>
          </div>
          <div className="space-y-4">
            <Building2 className="text-brand-orange" size={32} />
            <h4 className="text-lg font-bold uppercase text-slate-900 tracking-tight">Satisfaction</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Our projects aren't finished until our clients are completely happy. We build relationships, not just structures.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-8 mb-8">
      <div className="container-custom bg-white rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Follow us on</span>
          <div className="flex gap-6">
            {[
              { icon: <Facebook size={18} />, name: "Facebook" },
              { icon: <Instagram size={18} />, name: "Instagram" },
              { icon: <Linkedin size={18} />, name: "LinkedIn" },
              { icon: <Twitter size={18} />, name: "Twitter" }
            ].map((social, idx) => (
              <a key={idx} href="#" className="text-slate-400 hover:text-brand-orange transition-all hover:scale-110 active:scale-95" aria-label={social.name}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center md:text-right">
           <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 Kim Constructors Ltd. | Building Excellence</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/254716970377"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 selection:bg-brand-orange/30">
      <Navbar />
      <main className="container-custom pb-8">
        <BentoHero />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
