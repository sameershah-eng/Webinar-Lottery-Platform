import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, UserCheck, Shuffle, X, HelpCircle } from 'lucide-react';

interface SeatGridProps {
  totalSeats: number;
  claimedSeats: number[];
  userClaimedSeats?: number[];
  selectedSeats: number[];
  pricePerSeat: number;
  onToggleSeat: (seatNumber: number) => void;
  onSelectMultiple?: (seatNumbers: number[]) => void;
  onClearSelection?: () => void;
  disabled?: boolean;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  totalSeats,
  claimedSeats,
  userClaimedSeats = [],
  selectedSeats,
  pricePerSeat,
  onToggleSeat,
  onSelectMultiple,
  onClearSelection,
  disabled = false,
}) => {
  const [hoveredSeat, setHoveredSeat] = useState<number | null>(null);

  const claimedSet = new Set(claimedSeats);
  const userClaimedSet = new Set(userClaimedSeats);
  const selectedSet = new Set(selectedSeats);

  const availableSeatNumbers = Array.from({ length: totalSeats }, (_, i) => i + 1).filter(
    (n) => !claimedSet.has(n)
  );

  const handleSelectRandom = (count: number) => {
    if (!onSelectMultiple) return;
    const pool = [...availableSeatNumbers].filter((s) => !selectedSet.has(s));
    if (pool.length === 0) return;
    
    // Pick random count
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, count);
    onSelectMultiple([...selectedSeats, ...picked]);
  };

  const handleSelectAll = () => {
    if (!onSelectMultiple) return;
    onSelectMultiple(availableSeatNumbers);
  };

  return (
    <div className="space-y-4">
      {/* Legend & Quick Pick bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#14161A] border border-[#23262C] rounded text-xs">
        {/* Visual Legend */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-white border border-zinc-300 inline-block shadow-sm" />
            <span className="text-zinc-300 font-medium">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#C9A227] text-black flex items-center justify-center font-mono font-bold text-[10px]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="text-zinc-300 font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#1C1F26] border border-[#C9A227] text-[#C9A227] flex items-center justify-center">
              <UserCheck className="w-3 h-3 text-[#C9A227]" />
            </span>
            <span className="text-zinc-300 font-medium">Yours</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#1A1D23] border border-[#2B303A] opacity-40 inline-block" />
            <span className="text-zinc-500">Sold Out</span>
          </div>
        </div>

        {/* Quick batch selectors */}
        {!disabled && availableSeatNumbers.length > 0 && (
          <div className="flex items-center gap-2 font-mono">
            <button
              type="button"
              onClick={() => handleSelectRandom(1)}
              className="px-2.5 py-1 rounded bg-[#1C1F26] hover:bg-[#252A33] border border-[#2E333B] hover:border-[#C9A227]/50 text-[11px] text-zinc-300 transition-colors flex items-center gap-1"
            >
              <Shuffle className="w-3 h-3 text-[#C9A227]" />
              <span>+1 Random</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectRandom(3)}
              className="px-2.5 py-1 rounded bg-[#1C1F26] hover:bg-[#252A33] border border-[#2E333B] hover:border-[#C9A227]/50 text-[11px] text-zinc-300 transition-colors"
            >
              +3 Quick
            </button>
            {selectedSeats.length > 0 && onClearSelection && (
              <button
                type="button"
                onClick={onClearSelection}
                className="px-2 py-1 rounded text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-0.5"
              >
                <X className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Dynamic Auto-Fit Seat Grid */}
      <div
        className="p-4 sm:p-6 bg-[#0E1013] border border-[#23262C] rounded-lg shadow-inner relative"
        role="group"
        aria-label="Webinar Seat Grid Selection"
      >
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-2.5">
          {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seatNumber) => {
            const isSold = claimedSet.has(seatNumber);
            const isMine = userClaimedSet.has(seatNumber);
            const isSelected = selectedSet.has(seatNumber);
            const isAvailable = !isSold;

            let buttonClass = 'relative aspect-square rounded flex flex-col items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all select-none ';

            if (isSelected) {
              buttonClass += 'bg-[#C9A227] text-black shadow-[0_0_12px_rgba(201,162,39,0.5)] scale-105 z-10';
            } else if (isMine) {
              buttonClass += 'bg-[#181B22] text-[#C9A227] border-2 border-[#C9A227] shadow-[0_0_8px_rgba(201,162,39,0.3)]';
            } else if (isAvailable) {
              buttonClass += 'bg-white text-zinc-900 hover:scale-105 hover:ring-2 hover:ring-[#C9A227] hover:shadow-md cursor-pointer';
            } else {
              buttonClass += 'bg-[#16181D] text-zinc-600 border border-[#23262C] opacity-35 cursor-not-allowed';
            }

            return (
              <motion.button
                key={seatNumber}
                type="button"
                whileTap={isAvailable && !disabled ? { scale: 0.95 } : undefined}
                disabled={!isAvailable || disabled}
                onClick={() => isAvailable && onToggleSeat(seatNumber)}
                onMouseEnter={() => setHoveredSeat(seatNumber)}
                onMouseLeave={() => setHoveredSeat(null)}
                aria-label={`Seat ${seatNumber}, ${isSold ? (isMine ? 'Claimed by you' : 'Claimed') : `Available $${pricePerSeat}`}`}
                className={buttonClass}
              >
                {/* Seat Number */}
                <span>{seatNumber}</span>

                {/* Sub status indicators */}
                {isSelected && (
                  <Check className="w-3 h-3 stroke-[3] text-black -mt-0.5" />
                )}
                {isMine && !isSelected && (
                  <span className="text-[8px] font-mono tracking-tighter leading-none text-[#C9A227] uppercase">
                    MINE
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Hover Tooltip display at bottom if active */}
        <div className="mt-4 pt-3 border-t border-[#1C1F26] flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>
              {hoveredSeat !== null
                ? claimedSet.has(hoveredSeat)
                  ? userClaimedSet.has(hoveredSeat)
                    ? `Seat #${hoveredSeat} is already registered to your account.`
                    : `Seat #${hoveredSeat} is claimed by another member.`
                  : `Seat #${hoveredSeat} is available for $${pricePerSeat} USD.`
                : 'Click available seats to add to your order.'}
            </span>
          </div>

          <div className="text-[#8A8F98]">
            <span className="text-white font-bold">{totalSeats - claimedSeats.length}</span> of{' '}
            <span className="text-zinc-400">{totalSeats}</span> remaining
          </div>
        </div>
      </div>
    </div>
  );
};
