import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Radio, Trophy, Tv, HelpCircle, Layers, Menu, X, User as UserIcon, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { useStore } from '../../store/useStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, openAuthModal, logout, webinars } = useStore();

  const [scrolledPast, setScrolledPast] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const hasLiveWebinar = webinars.some((w) => w.status === 'live');
  const liveWebinar = webinars.find((w) => w.status === 'live');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Scrolled past 80px triggers frosted glass & height shrink
      if (currentScrollY > 80) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }

      // Smart sticky: hide on fast scroll down, reveal on scroll up
      if (currentScrollY > 200 && currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Webinars', path: '/webinars', icon: Layers },
    {
      label: 'Live Now',
      path: liveWebinar ? `/live/${liveWebinar.id}` : '/webinars?tab=live',
      icon: Radio,
      isLive: hasLiveWebinar,
    },
    { label: 'Replays', path: '/replays', icon: Tv },
    { label: 'How It Works', path: '/#how-it-works', icon: HelpCircle },
    { label: 'Winners', path: '/#winners', icon: Trophy },
    { label: 'Control Room', path: '/admin', icon: Shield, badge: 'ADMIN' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-[#14161A]">
        <div
          className="h-full bg-gradient-to-r from-[#C9A227] via-[#F4D068] to-[#C9A227] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          navVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolledPast
            ? 'h-16 bg-[#0A0B0D]/85 backdrop-blur-md border-b border-[#C9A227]/25 shadow-2xl'
            : 'h-22 bg-gradient-to-b from-[#0A0B0D]/90 via-[#0A0B0D]/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
            aria-label="Sentinel Live Home"
          >
            <div
              className={`relative flex items-center justify-center transition-all duration-300 rounded ${
                scrolledPast ? 'w-9 h-9' : 'w-11 h-11'
              } bg-gradient-to-br from-[#1C1F26] to-[#0E1014] border border-[#C9A227]/40 group-hover:border-[#C9A227] shadow-lg`}
            >
              <Shield
                className={`text-[#C9A227] transition-transform duration-300 group-hover:scale-110 ${
                  scrolledPast ? 'w-5 h-5' : 'w-6 h-6'
                }`}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
            </div>

            <div className="flex flex-col">
              <span
                className={`font-heading tracking-widest font-extrabold text-white transition-all duration-300 leading-none ${
                  scrolledPast ? 'text-xl' : 'text-2xl'
                }`}
              >
                {BRAND_CONFIG.shortName}
                <span className="text-[#C9A227] ml-1">LIVE</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#8A8F98] uppercase font-mono mt-0.5 hidden sm:block">
                Tactical Broadcast Lottery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path.split('?')[0]);

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-sm flex items-center gap-1.5 ${
                    isActive ? 'text-[#C9A227]' : 'text-[#8A8F98] hover:text-white'
                  }`}
                >
                  {link.isLive && (
                    <span className="relative flex h-2 w-2 mr-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5383B] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5383B]" />
                    </span>
                  )}

                  <span>{link.label}</span>

                  {link.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30">
                      {link.badge}
                    </span>
                  )}

                  {/* Active or Hovered underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#C9A227] shadow-[0_0_8px_#C9A227]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {hoveredLink === link.label && !isActive && (
                    <motion.div
                      layoutId="hoverNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[1px] bg-white/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/account"
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-[#14161A] border border-[#23262C] hover:border-[#C9A227]/40 text-xs font-mono text-zinc-300 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span className="truncate max-w-[120px]">{user.email.split('@')[0]}</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-[#14161A] rounded transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="hidden sm:inline-flex items-center text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-[#C9A227] px-3 py-2 transition-colors focus:outline-none"
              >
                Sign In
              </button>
            )}

            {/* Shimmer "Claim a Seat" CTA button */}
            <button
              onClick={() => {
                const target = liveWebinar ? `/webinars/${liveWebinar.id}` : '/webinars';
                navigate(target);
              }}
              className="animate-shimmer relative px-4 py-2 sm:px-5 sm:py-2.5 rounded bg-gradient-to-r from-[#C9A227] via-[#DDB735] to-[#C9A227] hover:brightness-110 active:scale-[0.97] transition-all text-black font-heading font-bold text-sm tracking-wider uppercase shadow-[0_0_15px_rgba(201,162,39,0.35)] flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-black fill-black" />
              <span>Claim a Seat</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white hover:bg-[#14161A] rounded transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A227]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-30 bg-[#0A0B0D]/95 backdrop-blur-xl border-b border-[#23262C] flex flex-col p-6 overflow-y-auto md:hidden"
          >
            <div className="flex flex-col gap-3 my-auto">
              <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase">
                Tactical Navigation
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#14161A]/80 border border-[#23262C] hover:border-[#C9A227] text-lg font-heading tracking-wider"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-5 h-5 text-[#C9A227]" />
                      <span>{link.label}</span>
                      {link.isLive && (
                        <span className="px-2 py-0.5 text-xs bg-[#E5383B] text-white rounded font-mono font-bold animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </Link>
                </motion.div>
              ))}

              <div className="pt-6 border-t border-[#23262C] flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="p-3 rounded bg-[#14161A] border border-[#23262C] text-xs font-mono text-zinc-400">
                      Logged in as: <span className="text-white font-semibold">{user.email}</span>
                    </div>
                    <Link
                      to="/account"
                      className="w-full text-center py-2.5 rounded bg-[#14161A] border border-[#23262C] text-zinc-200 font-medium text-sm"
                    >
                      Member Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-center py-2.5 text-zinc-400 hover:text-rose-400 text-sm font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal();
                    }}
                    className="w-full py-3 rounded bg-[#14161A] border border-[#C9A227]/40 text-[#C9A227] font-heading text-base tracking-wider uppercase"
                  >
                    Member Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
