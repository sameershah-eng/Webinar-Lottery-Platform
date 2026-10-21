import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Radio,
  Sparkles,
  ChevronRight,
  Shield,
  Lock,
  Trophy,
  Users,
  Eye,
  CheckCircle2,
  Tv,
  ArrowRight,
  HelpCircle,
  Hash,
  Terminal,
  Crosshair,
  FileSpreadsheet,
  ChevronDown
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { useStore } from '../store/useStore';
import { CountdownTimer } from '../components/common/CountdownTimer';
import { WebinarCard } from '../components/common/WebinarCard';
import { FAQ_ITEMS, INITIAL_WINNERS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { webinars, liveViewerCount, setLiveViewerCount, demoMode } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const liveWebinar = webinars.find((w) => w.status === 'live');
  const upcomingWebinars = webinars.filter((w) => w.status === 'upcoming');
  const featuredWebinars = webinars.filter((w) => w.featured || w.status === 'live');

  // Real-time viewer fluctuation simulation in hero/live strip
  useEffect(() => {
    if (!demoMode) return;
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 7) - 3;
      setLiveViewerCount(Math.max(240, liveViewerCount + delta));
    }, 4000);
    return () => clearInterval(interval);
  }, [demoMode, liveViewerCount, setLiveViewerCount]);

  return (
    <div className="space-y-24">
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background dark high-res tactical imagery with grain overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=2000&q=85"
            alt="Tactical armory background"
            className="w-full h-full object-cover object-center brightness-[0.22] contrast-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D] via-[#0A0B0D]/80 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0A0B0D]/50 to-[#0A0B0D]" />
          <div className="absolute inset-0 tactical-grid opacity-30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Top Live Callout Pill */}
          {liveWebinar && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14161A]/90 border border-[#C9A227]/40 shadow-[0_0_20px_rgba(201,162,39,0.2)] backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5383B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5383B]" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                SESSION LIVE RIGHT NOW
              </span>
              <span className="text-zinc-500 font-mono text-xs">&bull;</span>
              <span className="text-xs font-mono text-[#C9A227] flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#E5383B]" />
                {liveViewerCount} watching
              </span>
            </motion.div>
          )}

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.92]">
              WATCH IT LIVE.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#F4D068] to-[#C9A227]">
                CLAIM YOUR SEAT.
              </span>{' '}
              WIN IT ON AIR.
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#8A8F98] font-sans leading-relaxed">
              {BRAND_CONFIG.subline}
            </p>
          </motion.div>

          {/* Live Countdown & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-2 flex flex-col items-center gap-8"
          >
            {/* Countdown to next event */}
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#14161A]/80 border border-[#23262C] backdrop-blur-md">
              <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase">
                {liveWebinar ? 'CURRENT BROADCAST DRAW COUNTDOWN' : 'NEXT BROADCAST OPENS IN'}
              </span>
              <CountdownTimer />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to={liveWebinar ? `/live/${liveWebinar.id}` : '/webinars'}
                className="animate-shimmer px-8 py-4 rounded bg-gradient-to-r from-[#C9A227] via-[#DDB735] to-[#C9A227] hover:brightness-110 active:scale-[0.97] text-black font-heading font-extrabold text-lg tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(201,162,39,0.4)] flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 fill-black" />
                <span>{liveWebinar ? 'Join Live Broadcast' : 'Claim Your Seat'}</span>
              </Link>

              <Link
                to="/webinars"
                className="px-7 py-4 rounded bg-[#14161A] hover:bg-[#1C1F26] border border-[#2E333B] hover:border-[#C9A227]/60 active:scale-[0.97] text-white font-heading font-bold text-lg tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>Browse All Webinars</span>
                <ChevronRight className="w-5 h-5 text-zinc-400" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. "LIVE NOW" STRIP IF ACTIVE */}
      {liveWebinar && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-[#181112] via-[#14161A] to-[#181112] border-2 border-[#E5383B]/60 shadow-[0_0_30px_rgba(229,56,59,0.25)] flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-lg bg-[#0E1013] overflow-hidden border border-[#E5383B]/50 shrink-0">
                  <img
                    src={liveWebinar.images[0]}
                    alt={liveWebinar.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5383B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E5383B]" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#E5383B] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                    ON AIR
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#E5383B]" />
                    {liveViewerCount} Verified Viewers
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide mt-1">
                  {liveWebinar.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                to={`/webinars/${liveWebinar.id}`}
                className="flex-1 md:flex-none px-4 py-2.5 rounded bg-[#1C1F26] border border-[#2E333B] text-zinc-300 font-mono text-xs text-center hover:text-white"
              >
                Seat Grid ({liveWebinar.totalSeats - liveWebinar.soldSeats} Left)
              </Link>
              <Link
                to={`/live/${liveWebinar.id}`}
                className="flex-1 md:flex-none px-6 py-2.5 rounded bg-[#E5383B] hover:bg-[#F04A4D] text-white font-heading font-bold text-sm tracking-wider uppercase text-center shadow-[0_0_15px_rgba(229,56,59,0.4)] flex items-center justify-center gap-1.5"
              >
                <Radio className="w-4 h-4" />
                <span>Enter Stream</span>
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* 3. FEATURED WEBINARS CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#C9A227] uppercase">
              Current Allocations
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
              Featured Sessions
            </h2>
          </div>
          <Link
            to="/webinars"
            className="text-xs font-mono text-[#C9A227] hover:underline flex items-center gap-1"
          >
            <span>View All ({webinars.length} Available)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWebinars.slice(0, 3).map((webinar) => (
            <WebinarCard key={webinar.id} webinar={webinar} />
          ))}
        </div>
      </section>

      {/* 4. "HOW IT WORKS" IN 4 ANIMATED STEPS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#C9A227] uppercase font-bold">
            Four Simple Steps
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase">
            How The Platform Works
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            A transparent membership experience where every seat is accounted for and drawn live on camera.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'REGISTER WITH EMAIL',
              desc: 'No passwords to remember. Instant 6-digit magic passcode sent straight to your inbox to unlock member access.',
              icon: Users,
            },
            {
              step: '02',
              title: 'CLAIM NUMBERED SEATS',
              desc: 'Select your preferred numbers on our live interactive seat grid. Fixed price per seat, strictly limited pools.',
              icon: Crosshair,
            },
            {
              step: '03',
              title: 'WATCH LIVE & INTERACT',
              desc: 'Join our armorers for in-depth specs teardowns, live range footage, audience Q&A, and real-time polls.',
              icon: Tv,
            },
            {
              step: '04',
              title: 'PROVABLY FAIR DRAW',
              desc: 'Transparent cryptographic draw executes on air. Verify the seed and hash live or download the complete audit CSV.',
              icon: Trophy,
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-lg bg-[#14161A] border border-[#23262C] hover:border-[#C9A227]/50 transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded bg-[#1C1F26] border border-[#2E333B] group-hover:border-[#C9A227] flex items-center justify-center text-[#C9A227] transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-zinc-700 group-hover:text-[#C9A227]/40 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white tracking-wider">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1C1F26] flex items-center gap-1 text-[11px] font-mono text-[#C9A227] group-hover:translate-x-1 transition-transform">
                <span>Verified Step</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. PROVABLY FAIR DRAWS EXPLAINER */}
      <section id="provably-fair" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#14161A] via-[#0E1013] to-[#14161A] border border-[#C9A227]/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C1F26] border border-[#2E333B] text-[11px] font-mono text-[#C9A227]">
                <Lock className="w-3.5 h-3.5" />
                <span>CRYPTOGRAPHIC AUDIT ENGINE</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                100% PROVABLY FAIR ON-AIR DRAWS
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                We believe in zero black boxes. Before any broadcast draw executes, our system publishes a cryptographic commitment consisting of a high-precision UTC timestamp seed and its immutable SHA-256 hash.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-zinc-300">
                    <strong className="text-white">Deterministic Mulberry32 PRNG:</strong> Given the same seed, the winning seat sequence is mathematically impossible to manipulate.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-zinc-300">
                    <strong className="text-white">One-Click On-Screen Verification:</strong> Any viewer can press "Verify This Draw" to re-run the algorithm in real-time.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-zinc-300">
                    <strong className="text-white">Permanent CSV Audit Logs:</strong> Complete timestamped records stored permanently and downloadable at any time.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/draw/webinar-live-01"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#1C1F26] hover:bg-[#C9A227] hover:text-black border border-[#2E333B] hover:border-[#C9A227] font-heading font-bold text-sm tracking-wider uppercase transition-all"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Launch Interactive Draw Simulator</span>
                </Link>
              </div>
            </div>

            {/* Visual Animated Explainer Box */}
            <div className="p-6 rounded-xl bg-[#0A0B0D] border border-[#23262C] space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1F26]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-white font-bold">LIVE AUDIT PROOF</span>
                </div>
                <span className="text-zinc-500 text-[10px]">VERIFIED OK</span>
              </div>

              <div className="space-y-2">
                <span className="text-zinc-500 text-[10px] uppercase">1. Server Timestamp Seed:</span>
                <div className="p-2.5 rounded bg-[#14161A] text-zinc-200 border border-[#23262C] select-all break-all">
                  1729281600124-webinar-live-01
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-zinc-500 text-[10px] uppercase">2. Pre-Published SHA-256 Digest:</span>
                <div className="p-2.5 rounded bg-[#14161A] text-[#C9A227] border border-[#23262C] select-all break-all text-[11px]">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-zinc-500 text-[10px] uppercase">3. Result Mapping:</span>
                <div className="p-3 rounded bg-[#181B22] border border-[#C9A227]/40 flex items-center justify-between">
                  <span className="text-zinc-300">Mulberry32(Seed) &rarr;</span>
                  <span className="font-bold text-lg text-[#C9A227]">Winning Seat #42</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECENT WINNERS TICKER */}
      <section id="winners" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#C9A227] uppercase">
              Hall of Claimants
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
              Recent Verified Winners
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            Real members &bull; Verified FFL Dispatches
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_WINNERS.map((winner) => (
            <div
              key={winner.id}
              className="p-4 rounded bg-[#14161A] border border-[#23262C] hover:border-[#C9A227]/40 transition-colors flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#1C1F26] border border-[#C9A227]/30 text-[#C9A227] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  #{winner.seatNumber}
                </div>
                <div className="overflow-hidden">
                  <div className="font-heading text-sm font-bold text-white truncate">
                    {winner.webinarTitle}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Winner: <span className="text-zinc-200">{winner.maskedEmail}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-mono font-bold text-[#C9A227]">
                  {winner.prizeValue}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  {winner.drawDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. STATS BAND */}
      <section className="border-y border-[#23262C] bg-[#0E1013] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-white">
                48
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#8A8F98] uppercase mt-1">
                Total Webinars Hosted
              </div>
            </div>

            <div>
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-[#C9A227]">
                8,420
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#8A8F98] uppercase mt-1">
                Seats Claimed
              </div>
            </div>

            <div>
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-white">
                48
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#8A8F98] uppercase mt-1">
                Verified Winners
              </div>
            </div>

            <div>
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-emerald-400">
                98.2%
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#8A8F98] uppercase mt-1">
                Average Seat Fill Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#C9A227] uppercase">
            Frequently Asked Questions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
            Platform Clarity &amp; Rules
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-lg bg-[#14161A] border border-[#23262C] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading text-lg sm:text-xl font-bold text-white tracking-wide focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A227] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed border-t border-[#1C1F26] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
