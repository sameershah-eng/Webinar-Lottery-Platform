import React, { useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Shield,
  Clock,
  Radio,
  Tv,
  Trophy,
  Check,
  Sparkles,
  Lock,
  ChevronRight,
  Share2,
  Calendar,
  Layers,
  Info,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { SeatGrid } from '../components/common/SeatGrid';
import { CountdownTimer } from '../components/common/CountdownTimer';
import { LotteryDrawModal } from '../components/draw/LotteryDrawModal';

export const WebinarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'details';

  const {
    webinars,
    user,
    userSeatsByWebinar,
    openAuthModal,
    openCheckoutModal,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const webinar = webinars.find((w) => w.id === id);

  if (!webinar) {
    return (
      <div className="pt-32 pb-20 text-center max-w-lg mx-auto px-4 space-y-4">
        <h2 className="font-heading text-3xl font-bold text-white uppercase">
          Webinar Not Found
        </h2>
        <p className="text-xs text-zinc-400 font-mono">
          The requested allocation session ID does not exist or has expired.
        </p>
        <Link
          to="/webinars"
          className="inline-block px-5 py-2.5 rounded bg-[#C9A227] text-black font-heading font-bold text-sm tracking-wider uppercase"
        >
          Return to Webinars
        </Link>
      </div>
    );
  }

  const userClaimedSeats = userSeatsByWebinar[webinar.id] || [];
  const seatsLeft = webinar.totalSeats - webinar.soldSeats;
  const isSoldOut = seatsLeft <= 0;
  const isUrgent = seatsLeft > 0 && (seatsLeft <= 3 || seatsLeft / webinar.totalSeats <= 0.1);

  // Toggle seat selection
  const handleToggleSeat = (seatNumber: number) => {
    if (!user) {
      openAuthModal(webinar.id);
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber].sort((a, b) => a - b));
    }
  };

  const handleSelectMultiple = (seats: number[]) => {
    if (!user) {
      openAuthModal(webinar.id);
      return;
    }
    setSelectedSeats(seats);
  };

  const handleProceedToClaim = () => {
    if (selectedSeats.length === 0) return;
    if (!user) {
      openAuthModal(webinar.id);
      return;
    }
    openCheckoutModal(webinar.id, selectedSeats);
    setSelectedSeats([]);
  };

  const formattedDate = new Date(webinar.scheduledFor).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Webinar link copied to clipboard', 'gold');
    }
  };

  return (
    <div className="pt-28 pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb & Quick actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Link to="/webinars" className="hover:text-white transition-colors">
            Webinars
          </Link>
          <span>/</span>
          <span className="text-[#C9A227] uppercase">{webinar.category}</span>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-xs">{webinar.title}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#14161A] border border-[#23262C] hover:border-[#C9A227]/40 text-zinc-300 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>Share Webinar</span>
        </button>
      </div>

      {/* TOP HERO & GALLERY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery - 7 cols */}
        <div className="lg:col-span-7 space-y-3">
          {/* Main Photo Frame */}
          <div className="relative aspect-[16/10] bg-[#0E1013] rounded-lg border border-[#23262C] overflow-hidden group shadow-2xl">
            <img
              src={webinar.images[activeImageIndex] || webinar.images[0]}
              alt={webinar.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Status tag */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              {webinar.status === 'live' && (
                <span className="px-3 py-1 rounded bg-[#E5383B] text-white font-mono font-bold text-xs tracking-wider uppercase animate-pulse flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,56,59,0.7)]">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  LIVE NOW
                </span>
              )}
              {webinar.status === 'upcoming' && (
                <span className="px-3 py-1 rounded bg-[#181B22]/90 border border-[#2E333B] text-zinc-300 font-mono text-xs uppercase backdrop-blur-sm flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                  UPCOMING SESSION
                </span>
              )}
              {webinar.status === 'replay' && (
                <span className="px-3 py-1 rounded bg-zinc-900/90 border border-zinc-700 text-zinc-300 font-mono text-xs uppercase backdrop-blur-sm flex items-center gap-1.5">
                  <Tv className="w-3.5 h-3.5 text-sky-400" />
                  COMPLETED &bull; REPLAY AVAILABLE
                </span>
              )}
            </div>

            {/* Price Per Seat callout */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="px-3.5 py-2 rounded bg-black/85 backdrop-blur-md border border-[#23262C] flex items-baseline gap-1.5">
                <span className="text-xs text-zinc-400 font-mono">SEAT PRICE:</span>
                <span className="font-heading text-2xl font-black text-[#C9A227] leading-none">
                  ${webinar.pricePerSeat}
                </span>
                <span className="text-xs font-mono text-zinc-500">USD</span>
              </div>
            </div>
          </div>

          {/* Thumbnails row */}
          {webinar.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {webinar.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#C9A227] scale-105 shadow-[0_0_10px_rgba(201,162,39,0.4)]'
                      : 'border-[#23262C] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Top Details & Header - 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30 text-[10px] font-mono uppercase font-bold">
                {webinar.category}
              </span>
              <span className="text-xs text-zinc-500 font-mono">&bull;</span>
              <span className="text-xs text-zinc-400 font-mono">{formattedDate}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide leading-tight">
              {webinar.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              {webinar.subtitle}
            </p>
          </div>

          {/* Big Seat Stats Band (Animated Numbers) */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-[#14161A] border border-[#23262C]">
            <div className="text-center">
              <span className="text-[10px] font-mono tracking-widest text-[#8A8F98] uppercase block">
                TOTAL SEATS
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-black text-white">
                {webinar.totalSeats}
              </span>
            </div>

            <div className="text-center border-x border-[#23262C]">
              <span className="text-[10px] font-mono tracking-widest text-[#8A8F98] uppercase block">
                SEATS SOLD
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-black text-[#C9A227]">
                {webinar.soldSeats}
              </span>
            </div>

            <div className="text-center">
              <span className="text-[10px] font-mono tracking-widest text-[#8A8F98] uppercase block">
                SEATS LEFT
              </span>
              <span
                className={`font-mono text-2xl sm:text-3xl font-black ${
                  isSoldOut
                    ? 'text-zinc-600'
                    : isUrgent
                    ? 'text-[#E5383B] animate-pulse'
                    : 'text-emerald-400'
                }`}
              >
                {seatsLeft}
              </span>
            </div>
          </div>

          {/* Countdown timer for upcoming or live */}
          {webinar.status !== 'replay' && (
            <div className="p-4 rounded-lg bg-[#0E1013] border border-[#23262C] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A227]" />
                <span className="text-xs font-mono text-zinc-300 uppercase">
                  {webinar.status === 'live' ? 'Broadcast Live Time' : 'Draw Begins In'}
                </span>
              </div>
              <CountdownTimer targetDate={webinar.scheduledFor} compact />
            </div>
          )}

          {/* User's Claimed Seats Callout if any */}
          {userClaimedSeats.length > 0 && (
            <div className="p-3.5 rounded-lg bg-[#181B22] border border-[#C9A227]/50 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                <span className="text-zinc-200">You hold {userClaimedSeats.length} seat(s):</span>
              </div>
              <div className="flex gap-1">
                {userClaimedSeats.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-[#C9A227] text-black font-bold text-xs"
                  >
                    #{s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick link to live stream or replay if appropriate */}
          {webinar.status === 'live' && (
            <Link
              to={`/live/${webinar.id}`}
              className="w-full py-3.5 px-4 rounded bg-[#E5383B] hover:bg-[#F04A4D] text-white font-heading font-bold text-base tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(229,56,59,0.4)]"
            >
              <Radio className="w-4 h-4" />
              <span>Enter Live Broadcast Room &bull; {webinar.viewers || 284} Viewers</span>
            </Link>
          )}

          {webinar.status === 'replay' && (
            <button
              onClick={() => setActiveTab('replay')}
              className="w-full py-3.5 px-4 rounded bg-[#181B22] hover:bg-[#20252F] border border-[#262B34] text-zinc-200 font-heading font-bold text-base tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <Tv className="w-4 h-4 text-sky-400" />
              <span>Watch Broadcast Replay ({webinar.replayDuration})</span>
            </button>
          )}
        </div>
      </div>

      {/* DYNAMIC SEAT SELECTION GRID */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#C9A227] uppercase font-bold">
              OFFICIAL SEAT ROSTER ({webinar.totalSeats} TOTAL SEATS)
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
              Interactive Seat Grid
            </h2>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Click any white seat to reserve &bull; Instant cryptographic allocation
          </div>
        </div>

        <SeatGrid
          totalSeats={webinar.totalSeats}
          claimedSeats={webinar.claimedSeatNumbers}
          userClaimedSeats={userClaimedSeats}
          selectedSeats={selectedSeats}
          pricePerSeat={webinar.pricePerSeat}
          onToggleSeat={handleToggleSeat}
          onSelectMultiple={handleSelectMultiple}
          onClearSelection={() => setSelectedSeats([])}
          disabled={isSoldOut}
        />
      </section>

      {/* STICKY BOTTOM SELECTION SUMMARY BAR WHEN SEATS ARE SELECTED */}
      {selectedSeats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 inset-x-4 max-w-4xl mx-auto z-40 p-4 rounded-xl bg-[#14161A]/95 border-2 border-[#C9A227] shadow-[0_0_35px_rgba(201,162,39,0.35)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#C9A227] text-black font-heading font-extrabold text-lg flex items-center justify-center shrink-0">
              {selectedSeats.length}
            </div>

            <div>
              <div className="font-heading text-lg font-bold text-white uppercase tracking-wide">
                {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} Selected:{' '}
                <span className="font-mono text-[#C9A227] text-sm font-normal">
                  #{selectedSeats.join(', #')}
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-400">
                Total: <span className="text-white font-bold">${selectedSeats.length * webinar.pricePerSeat}.00 USD</span> (${webinar.pricePerSeat}/seat)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setSelectedSeats([])}
              className="px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleProceedToClaim}
              className="flex-1 sm:flex-none animate-shimmer px-6 py-2.5 rounded bg-gradient-to-r from-[#C9A227] via-[#DDB735] to-[#C9A227] text-black font-heading font-extrabold text-base tracking-wider uppercase shadow-[0_0_15px_rgba(201,162,39,0.3)] flex items-center justify-center gap-1.5"
            >
              <span>Claim Seats (${selectedSeats.length * webinar.pricePerSeat})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* TABS: DETAILS, LIVE ROOM, REPLAY, DRAW RESULTS */}
      <section className="space-y-6 pt-6 border-t border-[#23262C]">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-[#23262C] pb-3 overflow-x-auto">
          {[
            { id: 'details', label: 'Item Specifications' },
            {
              id: 'liveroom',
              label: 'Live Broadcast Room',
              isLive: webinar.status === 'live',
            },
            { id: 'replay', label: 'Replay Player' },
            { id: 'draw', label: 'Draw Results & Audit' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1C1F26] text-[#C9A227] border-b-2 border-[#C9A227]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.isLive && (
                  <span className="w-2 h-2 rounded-full bg-[#E5383B] animate-pulse" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wide">
                Weapon &amp; Package Specifications
              </h3>
              <p className="text-xs text-zinc-400 max-w-2xl font-sans leading-relaxed">
                {webinar.description}
              </p>
            </div>

            {/* Spec Fields Grid (up to 15 fields) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {webinar.specs.map((spec) => (
                <div
                  key={spec.id}
                  className={`p-3.5 rounded bg-[#14161A] border border-[#23262C] font-mono text-xs flex flex-col justify-between ${
                    spec.isImage ? 'md:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                  <span className="text-[10px] text-[#8A8F98] uppercase tracking-wider">
                    {spec.key}
                  </span>

                  {spec.isImage ? (
                    <div className="mt-2 rounded overflow-hidden max-h-64 border border-[#23262C]">
                      <img
                        src={spec.value}
                        alt={spec.key}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className="font-semibold text-white mt-1 text-sm">
                      {spec.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'liveroom' && (
          <div className="p-8 rounded-xl bg-[#14161A] border border-[#23262C] text-center space-y-4">
            <Radio className="w-10 h-10 text-[#E5383B] mx-auto animate-pulse" />
            <h3 className="font-heading text-2xl font-bold text-white uppercase">
              Broadcast Studio Link
            </h3>
            <p className="text-xs text-zinc-400 font-mono max-w-md mx-auto">
              Join the live discussion, participate in polls, and watch on-air armorers review this piece.
            </p>
            <Link
              to={`/live/${webinar.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#E5383B] hover:bg-[#F04A4D] text-white font-heading font-bold text-sm tracking-wider uppercase transition-all shadow-lg"
            >
              <span>Launch Live Room</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {activeTab === 'replay' && (
          <div className="space-y-6">
            <div className="aspect-video bg-black rounded-lg border border-[#23262C] overflow-hidden relative">
              <iframe
                src={webinar.replayUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1'}
                title="Replay Video Player"
                className="w-full h-full"
                allowFullScreen
              />
            </div>

            {/* Chapter markers */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase">
                Interactive Chapters
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {webinar.chapters.map((ch) => (
                  <div
                    key={ch.title}
                    className="p-3 rounded bg-[#14161A] border border-[#23262C] hover:border-[#C9A227]/40 cursor-pointer text-xs font-mono transition-colors"
                  >
                    <div className="text-[#C9A227] font-bold">{ch.time}</div>
                    <div className="text-white mt-1 line-clamp-1">{ch.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'draw' && (
          <div className="space-y-6">
            <LotteryDrawModal webinar={webinar} isStandalone={true} />
          </div>
        )}
      </section>
    </div>
  );
};
