/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
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
  Music,
  MessageCircle,
  Menu, 
  X,
  ChevronRight,
  ArrowRight,
  Play,
  Plus,
  Trash2,
  Image as ImageIcon,
  LogOut,
  Settings,
  Maximize2,
  Video,
  MessageSquare,
  LogIn,
  UserPlus,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { supabase } from "./lib/supabase";

// --- Types ---

interface ExpertiseCategory {
  id: string;
  label: string;
  img: string;
  accent?: boolean;
  dark?: boolean;
  description?: string;
}

interface ExpertiseImage {
  id: string;
  category_id: string;
  url: string;
  alt: string;
  created_at?: string;
}

const DEFAULT_CATEGORIES: ExpertiseCategory[] = [
  { id: "AD", label: "Architectural\nDesign", img: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=400", description: "Modern structural designs and blueprints." },
  { id: "PF", label: "Painting &\nFinishing", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400", accent: true, description: "Professional surface finishing and exterior/interior painting." },
  { id: "PI", label: "Plumbing\nInstallation", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400", description: "Industrial and residential piping and drainage systems." },
  { id: "TW", label: "Tiling &\nFloor Works", img: "https://images.unsplash.com/photo-1516503562468-9b98563f6482?auto=format&fit=crop&q=80&w=400", description: "Master-level tiling and flooring solutions." },
  { id: "GC", label: "Gypsum\nCeilings", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400", description: "Decorative gypsum ceilings and lighting integration." },
  { id: "+", label: "Renovations &\nRemodeling", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400", dark: true, description: "Complete building restoration and modern upgrades." },
];

// --- Components ---

const socials = [
  { name: "Facebook", link: "https://www.facebook.com/profile.php?id=100009546434745" },
  { name: "TikTok", link: "https://vm.tiktok.com/ZS9NhdvxML9CH-B48Fw/" }
];

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
      <div className={`container-custom transition-all duration-300 rounded-2xl border border-slate-200 flex justify-between items-center px-6 py-4 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white shadow-sm"
      }`}>
        <a href="#" className="flex items-center gap-4 group">
          <div className="w-28 h-28 relative overflow-hidden rounded-full border-4 border-slate-100 group-hover:border-brand-green transition-all duration-300 bg-white shadow-md -my-8">
            <img 
              src="/logo.jpeg" 
              alt="Kim Contractors Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-display font-extrabold uppercase tracking-tighter text-black leading-none">
              Kim <span className="text-brand-green">Contractors</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 mt-1">Excellence in Construction</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-brand-green"
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
              <a key={link.name} href={link.href} className="text-sm font-bold text-black uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>
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

const CategoryGallery = ({ category, onBack }: { category: ExpertiseCategory, onBack: () => void }) => {
  const [images, setImages] = useState<ExpertiseImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('expertise_images')
          .select('*')
          .eq('category_id', category.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setImages(data || []);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category.id]);

  return (
    <div className="pt-32 min-h-screen bg-white">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-3 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform">
          <ArrowRight className="rotate-180" size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">{category.label.replace('\n', ' ')}</h2>
          <p className="text-slate-500 text-sm">{category.description}</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <ImageIcon className="mx-auto text-slate-300 mb-4" size={48} />
          <p className="text-slate-500 font-medium">No projects showcase available for this section yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <motion.div 
              key={img.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(img.url)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm"
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={32} />
          </button>
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage} 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            alt="Full view" 
          />
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ onExit, isAuthorized, setIsAuthorized }: { onExit: () => void, isAuthorized: boolean, setIsAuthorized: (v: boolean) => void }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState("kimcontractors2@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORIES[0].id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newImageAlt, setNewImageAlt] = useState("");
  const [images, setImages] = useState<ExpertiseImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string, url: string } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthorized(true);
      }
    };
    checkUser();
  }, [setIsAuthorized]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      alert("Supabase not configured. Check .env file.");
      return;
    }
    setAuthLoading(true);

    try {
      if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setIsAuthorized(true);
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Signup successful! Please check your email for verification.");
        setAuthMode('login');
      }
    } catch (err: any) {
      alert(err.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setIsAuthorized(false);
    onExit();
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchImages();
    }
  }, [isAuthorized, selectedCategory]);

  const fetchImages = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('expertise_images')
        .select('*')
        .eq('category_id', selectedCategory)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !supabase) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${selectedCategory}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      // 3. Save to Database
      const { error: dbError } = await supabase.from('expertise_images').insert([
        { category_id: selectedCategory, url: publicUrl, alt: newImageAlt || "Expertise project" }
      ]);

      if (dbError) throw dbError;

      setSelectedFile(null);
      setNewImageAlt("");
      fetchImages();
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (err: any) {
      console.error(err);
      let message = "Upload failed.";
      if (err.message?.includes("row-level security")) {
        message = "Permission Denied: Ensure you ran the SQL policies for the 'projects' bucket and created it in Supabase Storage.";
      } else if (err.status === 400 || err.status === 404) {
        message = "Bucket 'projects' not found. Please create it manually in your Supabase Storage dashboard.";
      }
      alert(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!deleteConfirm || !supabase) return;
    try {
      // Extract file path from URL if possible, or just delete from DB
      // For simplicity, we just delete the DB record here
      // To also delete from storage, you'd need the path
      const { error } = await supabase.from('expertise_images').delete().eq('id', deleteConfirm.id);
      if (error) throw error;
      fetchImages();
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting image.");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 py-32">
        <form onSubmit={handleAuth} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-200">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg border-2 border-brand-green">
              {authMode === 'login' ? <Lock className="text-white" size={32} /> : <UserPlus className="text-white" size={32} />}
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-black mb-2 font-display uppercase tracking-tight">
            {authMode === 'login' ? 'Portal Login' : 'Admin Signup'}
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            {authMode === 'login' ? 'Secure access for Kim Contractors staff' : 'Register a new administrative account'}
          </p>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 ml-4 tracking-widest">Administrative Email</label>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-brand-green/20 transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 ml-4 tracking-widest">Secret Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-brand-green/20 transition-all font-medium pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button 
              disabled={authLoading}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-brand-green transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {authMode === 'login' ? 'Enter Dashboard' : 'Confirm Signup'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <div className="flex flex-col gap-2 pt-4">
              <button 
                type="button" 
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-slate-500 text-xs font-bold hover:text-brand-green transition-colors"
              >
                {authMode === 'login' ? "Need an account? Sign up here" : "Already have an account? Login here"}
              </button>
              <button type="button" onClick={onExit} className="w-full py-2 text-slate-400 text-xs font-bold underline decoration-dotted">Back to Site</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  const currentCategory = DEFAULT_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Building2 className="text-white" size={18} />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-900 uppercase tracking-tighter">Kim Admin</h1>
              <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">Control Panel</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 ml-2">Gallery Sections</p>
            {DEFAULT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs text-left transition-all ${
                  selectedCategory === cat.id 
                  ? "bg-black text-white shadow-xl shadow-black/10" 
                  : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-black"
                }`}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${selectedCategory === cat.id ? "bg-brand-green" : "bg-slate-200"}`} />
                {cat.label.replace('\n', ' ')}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-100">
             <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-3 px-4 py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-xs hover:bg-red-100 transition-all group"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Exit Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 active:bg-slate-100 rounded-xl"
          >
            <Menu size={24} />
          </button>
          <span className="font-extrabold text-[10px] uppercase tracking-widest text-slate-400">Dashboard</span>
          <div className="w-10 h-10 rounded-full bg-slate-100" />
        </header>

        <div className="p-4 md:p-10 max-w-6xl mx-auto w-full">
          {/* Dashboard Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase rounded-md">Live Platform</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-tighter leading-none mb-4">
              Editing: {currentCategory?.label.replace('\n', ' ')}
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl font-medium">Manage the image gallery for this section. Add quality project photos to showcase your expertise.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-5">
              <form onSubmit={handleAddImage} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm sticky top-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green">
                    <Plus size={24} />
                  </div>
                  <h3 className="font-extrabold text-lg text-black uppercase">New Media</h3>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-4 tracking-widest">Select Image from Device</label>
                    <div className="relative group/upload">
                      <input 
                        id="file-upload"
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                      <label 
                        htmlFor="file-upload"
                        className={`w-full flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${
                          selectedFile ? "border-brand-orange bg-brand-orange/5" : "border-slate-200 hover:border-brand-orange hover:bg-slate-100/50"
                        }`}
                      >
                        <div className={`p-4 rounded-2xl mb-3 transition-colors ${selectedFile ? "bg-brand-green text-white" : "bg-white text-slate-400 group-hover/upload:text-brand-green shadow-sm"}`}>
                          {selectedFile ? <ImageIcon size={28} /> : <Plus size={28} />}
                        </div>
                        <p className={`text-sm font-bold uppercase tracking-tight text-center ${selectedFile ? "text-slate-900" : "text-slate-500"}`}>
                          {selectedFile ? selectedFile.name : "Tap to browse files"}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">JPG, PNG or WEBP (Max 5MB)</p>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-4 tracking-widest">Project Description</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Modern living room finish..." 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-slate-100 transition-all font-medium"
                      value={newImageAlt}
                      onChange={(e) => setNewImageAlt(e.target.value)}
                    />
                  </div>

                  <button 
                    disabled={uploading || !selectedFile}
                    className={`w-full py-5 rounded-3xl font-extrabold uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
                      uploading || !selectedFile 
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                      : "bg-brand-green text-white hover:brightness-110 shadow-brand-green/30"
                    }`}
                  >
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Push to Gallery <ArrowRight size={16} /></>
                    )}
                  </button>
                  
                  <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed">
                    Uploaded images will be instantly visible to clients visiting the expertise section on the main site.
                  </p>
                </div>
              </form>
            </div>

            {/* Gallery Grid */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 min-h-[500px] shadow-sm">
                <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
                  <h3 className="font-extrabold text-xl text-slate-900 uppercase">Current Inventory</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 px-4 py-2 rounded-full uppercase tracking-widest">{images.length} Units</span>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-slate-100 animate-pulse rounded-3xl" />)}
                  </div>
                ) : images.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                      <ImageIcon size={40} className="opacity-20" />
                    </div>
                    <p className="font-extrabold uppercase tracking-widest text-xs text-slate-300">Catalog is Empty</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {images.map(img => (
                      <div key={img.id} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-xl">
                        <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={img.alt} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                          <button 
                            onClick={() => setDeleteConfirm({ id: img.id, url: img.url })}
                            className="w-full py-4 bg-white text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-2xl active:scale-95"
                          >
                            <Trash2 size={18} /> Remove Asset
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl border border-slate-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 uppercase mb-2">Confirm Delete</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">Are you absolutely sure you want to remove this project from the public gallery? This action is permanent.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDeleteImage}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold transition-all hover:bg-red-700 shadow-lg shadow-red-200"
              >
                Yes, Delete it
              </button>
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold transition-all hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BentoHero = ({ onCategoryClick }: { onCategoryClick: (cat: ExpertiseCategory) => void }) => {
  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-min mt-24">
      {/* Hero Body */}
      <section className="col-span-12 lg:col-span-8 bg-black rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-end border border-white/5 min-h-[500px]">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Building2 size={240} className="text-white" />
        </div>
        <div className="relative z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-brand-green text-white text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold"
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
            <span className="text-brand-green">Crafting Perfection</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl font-medium"
          >
            Kim Contractors offers expert architectural construction and premium finishing services for residential and commercial landmarks.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a href="#services" className="bg-white text-black px-8 py-3 rounded-xl font-bold shadow-xl transition-transform hover:scale-105 active:scale-95">View Our Services</a>
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
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <div className="w-10 h-10 bg-green-100 text-brand-green rounded-xl flex items-center justify-center text-xl font-bold italic shadow-inner">P</div>
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
          <h3 className="font-bold text-xl uppercase text-black tracking-tight">Our Expertise</h3>
          <a href="#" className="flex items-center gap-1 text-[10px] text-brand-green font-bold uppercase tracking-widest hover:underline">
            Explore All <ArrowRight size={12} />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {DEFAULT_CATEGORIES.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => onCategoryClick(s)}
              className={`group relative rounded-2xl h-32 overflow-hidden shadow-sm border cursor-pointer ${s.accent ? "border-brand-green/30" : "border-slate-100"}`}
            >
              <img src={s.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={s.label} />
              <div className={`absolute inset-0 bg-gradient-to-t ${s.dark ? "from-black/90 via-black/40" : "from-black/90 via-black/40"} to-transparent p-4 flex flex-col justify-between`}>
                <div className={`${s.dark ? "bg-brand-green" : "bg-white/20 backdrop-blur-md"} w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-md`}>
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
        <h3 className="font-bold text-lg uppercase text-black mb-6 tracking-tight">Quick Inquiry</h3>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Full Name" className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium" />
          <input type="email" placeholder="Email Address" className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium" />
          <textarea placeholder="Project Details" className="w-full h-24 text-xs p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium resize-none"></textarea>
          <button className="w-full bg-black text-white text-xs py-3 rounded-xl font-bold hover:bg-brand-green transition-all active:scale-95 shadow-lg">Send Message</button>
        </form>
      </section>

      {/* Contact Info Card */}
      <section className="col-span-12 md:col-span-6 lg:col-span-3 bento-card-dark bg-black text-white overflow-hidden relative border border-white/5">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Phone size={120} />
        </div>
        <h3 className="font-bold text-lg uppercase mb-8 tracking-tight relative z-10">Direct Contact</h3>
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Location</p>
              <p className="text-xs font-bold">Changara, Kenya</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 transition-transform group-hover:scale-110 group-hover:bg-brand-green group-hover:border-brand-green">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Phone</p>
              <p className="text-xs font-bold">+254716970377</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 transition-transform group-hover:scale-110 group-hover:bg-brand-green group-hover:border-brand-green">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Email</p>
              <p className="text-xs font-bold">kimcontractors2@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Info (Why Choose) */}
      <section className="col-span-12 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <CheckCircle2 className="text-brand-green" size={32} />
            <h4 className="text-lg font-bold uppercase text-black tracking-tight">Craftsmanship</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Our skilled artisans ensure every detail meets the highest industry standards with master-level precision.</p>
          </div>
          <div className="space-y-4">
            <RefreshCw className="text-brand-green" size={32} />
            <h4 className="text-lg font-bold uppercase text-black tracking-tight">Agility</h4>
            <p className="text-slate-500 text-sm leading-relaxed">On-time project delivery refined by agile management cycles that respect your schedule and investment.</p>
          </div>
          <div className="space-y-4">
            <Building2 className="text-brand-green" size={32} />
            <h4 className="text-lg font-bold uppercase text-black tracking-tight">Satisfaction</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Our projects aren't finished until our clients are completely happy. We build relationships, not just structures.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => {
  return (
    <footer className="mt-8 mb-8">
      <div className="container-custom bg-white rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Social Media</span>
          <div className="flex gap-8">
            {socials.map((social, idx) => (
              <a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-green transition-all font-bold uppercase tracking-[0.15em] text-[10px] active:scale-95" aria-label={social.name}>
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
           <span className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">© 2026 Kim Contractors Ltd.</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const FloatingWhatsApp = () => {
  const prefilledMessage = "Hello CEO of Kim Contractors, I am reaching out through your website and I am interested in your professional contracting services.";
  
  return (
    <motion.a
      href={`https://wa.me/254716970377?text=${encodeURIComponent(prefilledMessage)}`}
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
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'category'>('home');
  const [activeCategory, setActiveCategory] = useState<ExpertiseCategory | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (window.location.hash === '' || window.location.hash === '#') {
        if (currentView === 'admin') {
          setCurrentView('home');
        }
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const handleCategoryClick = (cat: ExpertiseCategory) => {
    setActiveCategory(cat);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setActiveCategory(null);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, "", " ");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If we are in admin mode AND authorized, we show a completely different UI
  if (currentView === 'admin' && isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminPanel onExit={handleBackToHome} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-brand-green/30">
      <Navbar />
      <main className="container-custom pb-12">
        {currentView === 'home' && <BentoHero onCategoryClick={handleCategoryClick} />}
        
        {currentView === 'category' && activeCategory && (
          <CategoryGallery category={activeCategory} onBack={handleBackToHome} />
        )}

        {currentView === 'admin' && !isAuthorized && (
          <AdminPanel onExit={handleBackToHome} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
        )}
      </main>
      
      {(currentView === 'home' || currentView === 'category') && (
        <>
          <Footer onAdminClick={() => setCurrentView('admin')} />
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
}
