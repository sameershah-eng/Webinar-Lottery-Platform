import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Radio, Clock, Shield, Sparkles, ChevronRight, Crosshair, Award, Eye, Tv } from 'lucide-react';
import { Webinar } from '../../types';
import { CountdownTimer } from './CountdownTimer';

interface WebinarCardProps {
  webinar: Webinar;
}

export const WebinarCard: React.FC<WebinarCardProps> = ({ webinar }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const seatsLeft = webinar.totalSeats - webinar.soldSeats;
  const isUrgent = seatsLeft > 0 && (seatsLeft <= 3 || seatsLeft / webinar.totalSeats <= 0.1);
  const isSoldOut = seatsLeft <= 0;
  const progressPercent = Math.min(100, Math.round((webinar.soldSeats / webinar.totalSeats) * 100));

  // Fallback category icon
  const getCategoryIcon = () => {
    switch (webinar.category) {
      case 'pistol':
      case 'rifle':
      case 'shotgun':
        return <Crosshair className="w-12 h-12 text-[#C9A227]/40" />;
      case 'ammo':
        return <Shield className="w-12 h-12 text-[#C9A227]/40" />;
      default:
        return <Award className="w-12 h-12 text-[#C9A227]/40" />;
    }
  };

  const formattedDate = new Date(webinar.scheduledFor).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-[#14161A] border border-[#23262C] hover:border-[#C9A227]/70 rounded-lg overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_4px_25px_rgba(201,162,39,0.18)]"
    >
      {/* Top Media Frame */}
      <div className="relative aspect-[16/10] bg-[#0E1013] overflow-hidden">
        {!imageError && webinar.images[0] ? (
          <img
            src={webinar.images[0]}
            alt={webinar.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1C1F26] via-[#14161A] to-[#0A0B0D] flex flex-col items-center justify-center p-6 text-center">
            {getCategoryIcon()}
            <span className="font-heading tracking-widest text-xs text-zinc-500 uppercase mt-2">
              {webinar.category} vault review
            </span>
          </div>
        )}

        {/* Gradient shadow over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14161A] via-transparent to-black/60 pointer-events-none" />

        {/* Status Badge in Top Left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {webinar.status === 'live' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E5383B] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(229,56,59,0.7)] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white" />
              LIVE ON AIR
            </span>
          )}

          {webinar.status === 'upcoming' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1F26]/90 border border-[#2E333B] text-zinc-300 text-[11px] font-mono tracking-wider uppercase backdrop-blur-sm">
              <Clock className="w-3 h-3 text-[#C9A227]" />
              {formattedDate}
            </span>
          )}

          {webinar.status === 'replay' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-700 text-zinc-300 text-[11px] font-mono tracking-wider uppercase backdrop-blur-sm">
              <Tv className="w-3 h-3 text-sky-400" />
              REPLAY &bull; {webinar.replayDuration}
            </span>
          )}
        </div>

        {/* Category Chip in Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] font-mono font-semibold tracking-widest text-[#C9A227] uppercase">
            {webinar.category}
          </span>
        </div>

        {/* Price Per Seat Badge Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="px-2.5 py-1 rounded bg-[#0A0B0D]/85 backdrop-blur-md border border-[#23262C] flex items-baseline gap-1">
            <span className="text-xs text-zinc-400 font-mono">SEAT:</span>
            <span className="font-heading text-lg font-bold text-[#C9A227] leading-none">
              ${webinar.pricePerSeat}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">USD</span>
          </div>
        </div>

        {/* Viewers or Winner Callout Bottom Right */}
        {webinar.status === 'live' && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[11px] font-mono text-white">
            <Eye className="w-3.5 h-3.5 text-[#E5383B]" />
            <span>{webinar.viewers || 284} watching</span>
          </div>
        )}

        {webinar.status === 'replay' && webinar.winnerSeats && webinar.winnerSeats.length > 0 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
            <Award className="w-3.5 h-3.5" />
            <span>Won by Seat #{webinar.winnerSeats[0]}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link
            to={`/webinars/${webinar.id}`}
            className="block font-heading text-xl sm:text-2xl font-bold text-white tracking-wide hover:text-[#C9A227] transition-colors leading-tight line-clamp-1"
          >
            {webinar.title}
          </Link>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-sans">
            {webinar.subtitle}
          </p>
        </div>

        {/* Seat Availability Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">
              <span className="text-white font-bold">{webinar.soldSeats}</span>/{webinar.totalSeats} seats
            </span>

            {isSoldOut ? (
              <span className="text-zinc-500 font-bold uppercase">Sold Out</span>
            ) : isUrgent ? (
              <span className="text-[#C9A227] font-bold animate-pulse flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Only {seatsLeft} left!
              </span>
            ) : (
              <span className="text-emerald-400">{seatsLeft} available</span>
            )}
          </div>

          <div className="h-1.5 w-full bg-[#0E1013] rounded-full overflow-hidden border border-[#23262C]">
            <div
              className={`h-full transition-all duration-500 ${
                isSoldOut
                  ? 'bg-zinc-600'
                  : isUrgent
                  ? 'bg-gradient-to-r from-[#C9A227] to-[#E5383B]'
                  : 'bg-gradient-to-r from-[#8C721D] to-[#C9A227]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {webinar.status === 'live' ? (
            <Link
              to={`/live/${webinar.id}`}
              className="w-full py-2.5 px-4 rounded bg-[#E5383B] hover:bg-[#F04A4D] active:scale-[0.97] text-white font-heading font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(229,56,59,0.35)]"
            >
              <Radio className="w-4 h-4" />
              <span>Join Live Stream &amp; Draw</span>
            </Link>
          ) : webinar.status === 'upcoming' ? (
            <Link
              to={`/webinars/${webinar.id}`}
              className="w-full py-2.5 px-4 rounded bg-[#1C1F26] hover:bg-[#C9A227] hover:text-black border border-[#2E333B] hover:border-[#C9A227] active:scale-[0.97] text-white font-heading font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 group-hover:bg-[#C9A227] group-hover:text-black"
            >
              <span>{isSoldOut ? 'View Seat Allocation' : 'Claim Your Seat'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to={`/webinars/${webinar.id}?tab=replay`}
              className="w-full py-2.5 px-4 rounded bg-[#181B22] hover:bg-[#20252F] border border-[#262B34] text-zinc-300 font-heading font-bold text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Tv className="w-4 h-4 text-sky-400" />
              <span>Watch Replay &bull; Draw Results</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
