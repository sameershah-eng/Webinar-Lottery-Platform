import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User as UserIcon,
  Shield,
  Layers,
  Clock,
  Trophy,
  CheckCircle2,
  Mail,
  Bell,
  ArrowRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const AccountPage: React.FC = () => {
  const { user, logout, webinars, userSeatsByWebinar, openAuthModal, showToast } = useStore();

  const [notifications, setNotifications] = useState(true);
  const [openSeatAlerts, setOpenSeatAlerts] = useState(true);

  if (!user) {
    return (
      <div className="pt-32 pb-20 text-center max-w-md mx-auto px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#14161A] border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-white uppercase">
          Member Sign In Required
        </h2>
        <p className="text-xs text-zinc-400 font-mono">
          Enter your email to inspect your seat allocations and past draw outcomes.
        </p>
        <button
          onClick={() => openAuthModal()}
          className="px-6 py-2.5 rounded bg-[#C9A227] text-black font-heading font-bold text-sm uppercase tracking-wider"
        >
          Sign In With Email
        </button>
      </div>
    );
  }

  // Find webinars where user holds seats
  const userWebinars = Object.entries(userSeatsByWebinar)
    .filter(([_, seats]) => seats.length > 0)
    .map(([webinarId, seats]) => {
      const webinar = webinars.find((w) => w.id === webinarId);
      return { webinar, seats };
    })
    .filter((item): item is { webinar: typeof webinars[0]; seats: number[] } => Boolean(item.webinar));

  const totalSeatsHeld = userWebinars.reduce((acc, item) => acc + item.seats.length, 0);

  const handleSavePreferences = () => {
    showToast('Member notification preferences updated', 'gold');
  };

  return (
    <div className="pt-28 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Account Profile Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#14161A] border border-[#23262C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1C1F26] to-[#0E1013] border-2 border-[#C9A227] text-[#C9A227] flex items-center justify-center font-heading font-bold text-2xl shadow-lg">
            {user.email[0].toUpperCase()}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase font-bold">
                VERIFIED MEMBER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
              {user.email}
            </h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Member ID: SNL-8942 &bull; Active Since Oct 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/webinars"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded bg-[#C9A227] hover:bg-[#DBB22E] text-black font-heading font-bold text-xs uppercase tracking-wider text-center"
          >
            Claim More Seats
          </Link>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded bg-[#1C1F26] hover:bg-[#252A33] border border-[#2E333B] text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg bg-[#14161A] border border-[#23262C]">
          <span className="text-[10px] font-mono text-[#8A8F98] uppercase tracking-wider block">
            TOTAL SEATS HELD
          </span>
          <span className="font-mono text-3xl font-black text-[#C9A227] mt-1 block">
            {totalSeatsHeld}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">Across active &amp; completed sessions</span>
        </div>

        <div className="p-5 rounded-lg bg-[#14161A] border border-[#23262C]">
          <span className="text-[10px] font-mono text-[#8A8F98] uppercase tracking-wider block">
            UPCOMING SESSIONS
          </span>
          <span className="font-mono text-3xl font-black text-white mt-1 block">
            {userWebinars.filter((item) => item.webinar.status !== 'replay').length}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">Entering live draws</span>
        </div>

        <div className="p-5 rounded-lg bg-[#14161A] border border-[#23262C]">
          <span className="text-[10px] font-mono text-[#8A8F98] uppercase tracking-wider block">
            PRIZE DRAW STATUS
          </span>
          <span className="font-mono text-3xl font-black text-emerald-400 mt-1 block">
            1 WON
          </span>
          <span className="text-[11px] text-emerald-400/80 font-mono">Seat #42 (Thermal Suite)</span>
        </div>
      </div>

      {/* My Seats by Webinar */}
      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
          My Seat Allocations
        </h2>

        {userWebinars.length > 0 ? (
          <div className="space-y-3">
            {userWebinars.map(({ webinar, seats }) => (
              <div
                key={webinar.id}
                className="p-5 rounded-lg bg-[#14161A] border border-[#23262C] hover:border-[#C9A227]/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded bg-[#0E1013] overflow-hidden border border-[#23262C] shrink-0">
                    <img
                      src={webinar.images[0]}
                      alt={webinar.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#C9A227] uppercase">
                        {webinar.category}
                      </span>
                      {webinar.status === 'live' && (
                        <span className="px-1.5 py-0.2 rounded bg-[#E5383B] text-white text-[9px] font-mono font-bold animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                      {webinar.title}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mt-0.5">
                      Session Date: {new Date(webinar.scheduledFor).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">
                      Claimed Numbers:
                    </div>
                    <div className="flex gap-1 mt-0.5">
                      {seats.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-[#C9A227]/20 border border-[#C9A227]/60 text-[#C9A227] font-mono font-bold text-xs"
                        >
                          #{s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={
                      webinar.status === 'live'
                        ? `/live/${webinar.id}`
                        : `/webinars/${webinar.id}`
                    }
                    className="px-4 py-2 rounded bg-[#1C1F26] hover:bg-[#252A33] border border-[#2E333B] text-white font-mono text-xs flex items-center gap-1"
                  >
                    <span>{webinar.status === 'live' ? 'Enter Live Room' : 'View Session'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-lg bg-[#14161A] border border-[#23262C] text-center font-mono text-xs text-zinc-500">
            No active seats claimed yet. Explore webinars to reserve your first number.
          </div>
        )}
      </div>

      {/* Member Notification Preferences */}
      <div className="p-6 rounded-lg bg-[#14161A] border border-[#23262C] space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#C9A227]" />
          <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
            Email &amp; Broadcast Dispatch Preferences
          </h3>
        </div>

        <div className="space-y-3 font-mono text-xs text-zinc-300">
          <label className="flex items-center justify-between p-3 rounded bg-[#0E1013] border border-[#23262C] cursor-pointer">
            <div>
              <div className="font-bold text-white">Broadcast Reminder Dispatches</div>
              <div className="text-[11px] text-zinc-500">Receive alerts 24h and 1h prior to your registered webinar</div>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="accent-[#C9A227] w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded bg-[#0E1013] border border-[#23262C] cursor-pointer">
            <div>
              <div className="font-bold text-white">Priority Seat Open Alerts</div>
              <div className="text-[11px] text-zinc-500">Instant VIP notifications when new high-demand item pools drop</div>
            </div>
            <input
              type="checkbox"
              checked={openSeatAlerts}
              onChange={(e) => setOpenSeatAlerts(e.target.checked)}
              className="accent-[#C9A227] w-4 h-4"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleSavePreferences}
          className="px-4 py-2 rounded bg-[#1C1F26] border border-[#2E333B] hover:border-[#C9A227] text-xs font-mono text-[#C9A227] transition-colors"
        >
          Save Dispatch Settings
        </button>
      </div>
    </div>
  );
};
