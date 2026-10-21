import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle2, Terminal, ArrowRight, Radio } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { useStore } from '../../store/useStore';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid member email', 'info');
      return;
    }
    showToast(`VIP seat alert notifications enabled for ${emailInput}`, 'gold');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#08090B] border-t border-[#23262C] text-zinc-400 text-sm mt-24 relative overflow-hidden">
      {/* Background glow subtle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#C9A227]/5 blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#14161A] border border-[#C9A227]/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#C9A227]" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-widest text-white">
                {BRAND_CONFIG.shortName} <span className="text-[#C9A227]">LIVE</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The premier interactive tactical broadcast platform. Reviewing world-class precision systems with verified seat participation and open cryptographically auditable lottery draws.
            </p>

            {/* Tactical Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#14161A] border border-[#23262C] text-[11px] font-mono text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Provably Fair PRNG</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#14161A] border border-[#23262C] text-[11px] font-mono text-zinc-300">
                <Lock className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>SHA-256 Verified</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#14161A] border border-[#23262C] text-[11px] font-mono text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Audit CSV Export</span>
              </div>
            </div>
          </div>

          {/* Platform Nav */}
          <div>
            <h4 className="text-white font-heading font-semibold tracking-wider text-sm mb-4 uppercase">
              Webinars
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/webinars" className="hover:text-[#C9A227] transition-colors">
                  Upcoming Sessions
                </Link>
              </li>
              <li>
                <Link to="/webinars?tab=live" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5383B] animate-pulse" />
                  Live Broadcast Room
                </Link>
              </li>
              <li>
                <Link to="/replays" className="hover:text-[#C9A227] transition-colors">
                  Session Replays (30 Days)
                </Link>
              </li>
              <li>
                <Link to="/webinars?category=rifle" className="hover:text-[#C9A227] transition-colors">
                  Precision Rifles
                </Link>
              </li>
              <li>
                <Link to="/webinars?category=pistol" className="hover:text-[#C9A227] transition-colors">
                  Custom 2011 Handguns
                </Link>
              </li>
              <li>
                <Link to="/webinars?category=ammo" className="hover:text-[#C9A227] transition-colors">
                  Bulk Ammo Vaults
                </Link>
              </li>
            </ul>
          </div>

          {/* Auditing & Verification */}
          <div>
            <h4 className="text-white font-heading font-semibold tracking-wider text-sm mb-4 uppercase">
              Integrity & Trust
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/#how-it-works" className="hover:text-[#C9A227] transition-colors">
                  How Seat Lotteries Work
                </Link>
              </li>
              <li>
                <Link to="/#provably-fair" className="hover:text-[#C9A227] transition-colors">
                  Provably Fair Algorithm
                </Link>
              </li>
              <li>
                <Link to="/draw/webinar-live-01" className="hover:text-[#C9A227] transition-colors">
                  Interactive Draw Simulator
                </Link>
              </li>
              <li>
                <Link to="/#winners" className="hover:text-[#C9A227] transition-colors">
                  Recent Verified Winners
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#C9A227] transition-colors text-amber-300/80 font-mono">
                  Operator Control Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Seat Alert Newsletter */}
          <div>
            <h4 className="text-white font-heading font-semibold tracking-wider text-sm mb-4 uppercase">
              Seat Opening Alerts
            </h4>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              High-demand limited runs sell out fast. Enter your email to receive priority notification when seats unlock.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="operator@member.com"
                  className="w-full bg-[#14161A] border border-[#23262C] focus:border-[#C9A227] focus:outline-none rounded px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 rounded bg-[#C9A227] hover:bg-[#DBB22E] text-black font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
              >
                <span>Enable Alerts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Compliance & Disclaimer */}
        <div className="pt-10 mt-10 border-t border-[#1C1F26] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="max-w-2xl text-[11px] leading-relaxed">
            {BRAND_CONFIG.complianceNotice} Must be 21+ and legally eligible to own specified items in your jurisdiction. Regulated firearms transferred exclusively through authorized FFL holders.
          </p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>&copy; {new Date().getFullYear()} {BRAND_CONFIG.name}</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
