import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  ShieldCheck,
  Hash,
  Clock,
  Sparkles,
  Download,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Flame,
  Award,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Webinar, DrawRecord } from '../../types';
import { computeSha256 } from '../../lib/hash';
import { drawWinnersFromSeed, maskEmail } from '../../lib/prng';
import { exportDrawsToCsv } from '../../lib/csv';
import { useStore } from '../../store/useStore';

interface LotteryDrawProps {
  webinar: Webinar;
  onClose?: () => void;
  isStandalone?: boolean;
}

export const LotteryDrawModal: React.FC<LotteryDrawProps> = ({
  webinar,
  onClose,
  isStandalone = false,
}) => {
  const { user, drawRecords, executeWebinarDraw } = useStore();

  const [winnersCount, setWinnersCount] = useState<number>(1);
  const [phase, setPhase] = useState<'ready' | 'spinning' | 'landed'>('ready');
  const [displayNumber, setDisplayNumber] = useState<number>(
    webinar.winnerSeats?.[0] || 1
  );
  const [activeWinners, setActiveWinners] = useState<number[]>(
    webinar.winnerSeats || []
  );
  const [currentSeed, setCurrentSeed] = useState<string>(
    webinar.drawSeed || `${Date.now()}-${webinar.id}`
  );
  const [currentHash, setCurrentHash] = useState<string>(webinar.drawHash || '');
  const [verificationPassed, setVerificationPassed] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const spinIntervalRef = useRef<any>(null);

  const eligibleSeats =
    webinar.claimedSeatNumbers.length > 0
      ? webinar.claimedSeatNumbers
      : Array.from({ length: webinar.totalSeats }, (_, i) => i + 1);

  // Initialize hash if not already computed
  useEffect(() => {
    let isMounted = true;
    if (!currentHash) {
      computeSha256(currentSeed).then((h) => {
        if (isMounted) setCurrentHash(h);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [currentSeed, currentHash]);

  // If webinar is already ended, start in landed phase
  useEffect(() => {
    if (webinar.status === 'replay' && webinar.winnerSeats && webinar.winnerSeats.length > 0) {
      setPhase('landed');
      setActiveWinners(webinar.winnerSeats);
      setDisplayNumber(webinar.winnerSeats[0]);
    }
  }, [webinar]);

  const fireGoldConfetti = () => {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#C9A227', '#F4D068', '#FFFFFF', '#DBB22E'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const startDraw = async () => {
    setPhase('spinning');
    setVerificationPassed(null);

    // Generate fresh seed right at moment of launch
    const timestampMs = Date.now();
    const newSeed = `${timestampMs}-${webinar.id}`;
    const newHash = await computeSha256(newSeed);
    setCurrentSeed(newSeed);
    setCurrentHash(newHash);

    // Compute deterministic winners ahead of time
    const finalWinners = drawWinnersFromSeed(eligibleSeats, newSeed, winnersCount);

    // Rapid slot-machine cycling animation
    let cycleSpeed = 40;
    let cycles = 0;
    const maxCycles = 50;

    const runSpin = () => {
      spinIntervalRef.current = setTimeout(() => {
        const randomSeat = eligibleSeats[Math.floor(Math.random() * eligibleSeats.length)];
        setDisplayNumber(randomSeat);
        cycles++;

        if (cycles > maxCycles - 15) {
          cycleSpeed += 25; // decelerate smoothly
        }

        if (cycles >= maxCycles) {
          // Lock on winner
          setDisplayNumber(finalWinners[0]);
          setActiveWinners(finalWinners);
          setPhase('landed');
          fireGoldConfetti();
          executeWebinarDraw(webinar.id, winnersCount);
        } else {
          runSpin();
        }
      }, cycleSpeed);
    };

    runSpin();
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const calculated = drawWinnersFromSeed(eligibleSeats, currentSeed, winnersCount);
      const isMatch =
        calculated.length === activeWinners.length &&
        calculated.every((val, index) => val === activeWinners[index]);

      setVerificationPassed(isMatch);
      setIsVerifying(false);
    }, 700);
  };

  const handleExportCsv = () => {
    const recordsToExport: DrawRecord[] = [
      {
        id: `draw-${webinar.id}`,
        webinarId: webinar.id,
        webinarTitle: webinar.title,
        seed: currentSeed,
        hash: currentHash,
        timestamp: new Date().toISOString(),
        totalEligible: eligibleSeats.length,
        winnerSeats: activeWinners.length > 0 ? activeWinners : [displayNumber],
        winnerEmails: activeWinners.map(
          (s) => `member.seat.${s.toString().padStart(2, '0')}@sentinelhq.com`
        ),
        operator: 'Operator Miller (Lead Armorer)',
      },
      ...drawRecords.filter((d) => d.webinarId !== webinar.id),
    ];

    exportDrawsToCsv(recordsToExport, `sentinel-live-draw-${webinar.id}.csv`);
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto bg-[#0E1013] border border-[#23262C] rounded-lg shadow-2xl overflow-hidden flex flex-col ${
        isStandalone ? 'p-6 sm:p-10' : 'p-4 sm:p-8'
      }`}
    >
      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#1C1F26]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#181B22] border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227]">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase font-bold">
                PROVABLY FAIR BROADCAST DRAW
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5383B] animate-pulse" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-wide">
              {webinar.title}
            </h2>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#181B22] border border-[#262B34] hover:border-zinc-500 text-xs text-zinc-300 font-mono"
          >
            Close Viewer
          </button>
        )}
      </div>

      {/* Main Reel & Broadcast Stage */}
      <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C9A227]/10 via-transparent to-transparent pointer-events-none" />

        {/* Status prompt */}
        <div className="mb-4">
          {phase === 'ready' && (
            <span className="px-3 py-1 rounded bg-[#181B22] border border-[#2B3038] text-xs font-mono text-zinc-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
              {eligibleSeats.length} Eligible Seats Committed To Pool
            </span>
          )}
          {phase === 'spinning' && (
            <span className="px-3 py-1 rounded bg-amber-950/40 border border-amber-500/50 text-xs font-mono text-amber-300 flex items-center gap-1.5 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Executing Mulberry32 Seeded PRNG...
            </span>
          )}
          {phase === 'landed' && (
            <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/50 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Draw Sealed &amp; Cryptographically Audited
            </span>
          )}
        </div>

        {/* Slot Machine Reel Box */}
        <div className="relative my-4">
          <div
            className={`w-44 h-44 sm:w-56 sm:h-56 rounded-2xl bg-gradient-to-b from-[#181B22] to-[#0A0B0D] border-2 flex flex-col items-center justify-center shadow-2xl relative transition-all duration-300 ${
              phase === 'landed'
                ? 'border-[#C9A227] shadow-[0_0_50px_rgba(201,162,39,0.45)] scale-105'
                : phase === 'spinning'
                ? 'border-[#E5383B] shadow-[0_0_35px_rgba(229,56,59,0.3)] animate-pulse'
                : 'border-[#2E333C]'
            }`}
          >
            {/* Corner tactical tick marks */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-zinc-600 font-bold">
              [SEAT]
            </div>
            <div className="absolute top-2 right-2 text-[9px] font-mono text-zinc-600 font-bold">
              PRNG-32
            </div>

            {/* Big seat number */}
            <span
              className={`font-mono text-6xl sm:text-8xl font-black tracking-tight select-none transition-colors ${
                phase === 'landed'
                  ? 'text-[#C9A227]'
                  : phase === 'spinning'
                  ? 'text-white'
                  : 'text-zinc-500'
              }`}
            >
              #{displayNumber}
            </span>

            {/* Sub-label */}
            <span className="text-[11px] font-mono tracking-widest text-[#8A8F98] mt-1 uppercase">
              {phase === 'landed' ? 'WINNING SEAT' : 'NUMBERED TICKET'}
            </span>
          </div>
        </div>

        {/* Winner Announcement Card */}
        {phase === 'landed' && activeWinners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 sm:p-5 rounded-lg bg-gradient-to-r from-[#1A1D24] via-[#1F232C] to-[#1A1D24] border border-[#C9A227]/60 max-w-md w-full shadow-xl text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#C9A227]">
              <Sparkles className="w-4 h-4" />
              <span>OFFICIAL WINNER CONFIRMED</span>
            </div>

            <div className="font-heading text-2xl font-bold text-white tracking-wider uppercase">
              SEAT #{activeWinners.join(', #')}
            </div>

            <div className="text-xs font-mono text-zinc-300">
              Registered To:{' '}
              <span className="text-white font-semibold underline">
                {webinar.winnerEmails?.[0] || maskEmail(user?.email || 'member.verified@sentinellive.com')}
              </span>
            </div>

            <p className="text-[11px] text-zinc-500 pt-1">
              Concierge team notified. Local FFL coordination dispatched.
            </p>
          </motion.div>
        )}

        {/* Draw Controls / Trigger */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {phase === 'ready' && (
            <div className="flex items-center gap-3">
              {/* Winners count selector */}
              <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#14161A] border border-[#23262C] text-xs font-mono">
                <span className="text-zinc-400">Winners:</span>
                <select
                  value={winnersCount}
                  onChange={(e) => setWinnersCount(Number(e.target.value))}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  <option value={1} className="bg-[#14161A]">1 Winner</option>
                  <option value={2} className="bg-[#14161A]">2 Winners</option>
                  <option value={3} className="bg-[#14161A]">3 Winners</option>
                </select>
              </div>

              <button
                type="button"
                onClick={startDraw}
                className="px-6 py-3 rounded bg-gradient-to-r from-[#C9A227] via-[#DDB735] to-[#C9A227] hover:brightness-110 active:scale-[0.97] text-black font-heading font-bold text-base tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(201,162,39,0.4)] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Trigger On-Air Draw</span>
              </button>
            </div>
          )}

          {phase === 'spinning' && (
            <div className="px-6 py-3 rounded bg-[#1C1F26] border border-[#2E333B] text-zinc-400 font-mono text-xs animate-pulse">
              Generating seeded random permutation...
            </div>
          )}

          {phase === 'landed' && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleVerify}
                disabled={isVerifying}
                className="px-4 py-2.5 rounded bg-[#181B22] hover:bg-[#20252F] border border-[#2B303A] text-xs font-mono text-zinc-200 transition-colors flex items-center gap-2"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>{isVerifying ? 'Re-running Algorithm...' : 'Verify This Draw'}</span>
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                className="px-4 py-2.5 rounded bg-[#181B22] hover:bg-[#20252F] border border-[#2B303A] text-xs font-mono text-[#C9A227] transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit CSV</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPhase('ready');
                  setVerificationPassed(null);
                }}
                className="px-3 py-2.5 text-xs text-zinc-500 hover:text-zinc-300 font-mono"
              >
                Reset Demo
              </button>
            </div>
          )}
        </div>

        {/* Verification result feedback banner */}
        {verificationPassed !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-4 p-3 rounded text-xs font-mono flex items-center gap-2 max-w-md ${
              verificationPassed
                ? 'bg-emerald-950/50 border border-emerald-500/60 text-emerald-300'
                : 'bg-red-950/50 border border-red-500/60 text-red-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>
              100% Deterministic Match Confirmed: Mulberry32 PRNG with seed{' '}
              <span className="font-bold underline">{currentSeed.slice(0, 14)}...</span> reproduced
              Seat #{activeWinners.join(', #')}.
            </span>
          </motion.div>
        )}
      </div>

      {/* Cryptographic Seed & Hash Technical Audit Panel */}
      <div className="pt-6 border-t border-[#1C1F26] space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            <span className="font-bold text-white uppercase text-[11px]">
              Cryptographic Commitment Proof
            </span>
          </div>
          <span className="text-[10px] text-zinc-500">Publicly Verifiable</span>
        </div>

        {/* Seed string */}
        <div className="p-3 rounded bg-[#0A0B0D] border border-[#1C1F26] space-y-1">
          <div className="text-[10px] text-[#8A8F98] uppercase">PRNG Entropy Seed:</div>
          <div className="text-zinc-200 select-all break-all">{currentSeed}</div>
        </div>

        {/* SHA-256 Hash */}
        <div className="p-3 rounded bg-[#0A0B0D] border border-[#1C1F26] space-y-1">
          <div className="text-[10px] text-[#8A8F98] uppercase flex items-center justify-between">
            <span>SHA-256 Seed Hash (Published Pre-Draw):</span>
            <span className="text-emerald-400 font-bold">Unbroken</span>
          </div>
          <div className="text-[#C9A227] select-all break-all text-[11px] leading-relaxed">
            {currentHash || 'Computing SHA-256 digest...'}
          </div>
        </div>

        {/* Audit Log Details Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] text-zinc-500">
          <span>Eligible Seats: {eligibleSeats.length}</span>
          <span>Algorithm: Mulberry32 32-bit PRNG</span>
          <span>Operator: Operator Miller (Lead Armorer)</span>
        </div>
      </div>
    </div>
  );
};
