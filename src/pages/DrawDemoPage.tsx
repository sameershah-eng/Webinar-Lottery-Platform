import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, Terminal } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LotteryDrawModal } from '../components/draw/LotteryDrawModal';

export const DrawDemoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { webinars, drawRecords } = useStore();

  const webinar = webinars.find((w) => w.id === id) || webinars[0];

  return (
    <div className="pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to={`/webinars/${webinar.id}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Webinar Detail</span>
        </Link>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#14161A] border border-[#23262C] text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Live PRNG Verification Mode</span>
        </div>
      </div>

      {/* Main Draw Experience */}
      <LotteryDrawModal webinar={webinar} isStandalone={true} />

      {/* Past Audit Logs History */}
      <div className="p-6 rounded-lg bg-[#14161A] border border-[#23262C] space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#1C1F26]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#C9A227]" />
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              Cryptographic Draw Audit History
            </h3>
          </div>
          <span className="text-zinc-500">{drawRecords.length} Historical Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-zinc-500 text-[10px] uppercase border-b border-[#1C1F26]">
                <th className="pb-2">Session Title</th>
                <th className="pb-2">Winner Seat</th>
                <th className="pb-2">Winner Account</th>
                <th className="pb-2">PRNG Seed</th>
                <th className="pb-2">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1F26] text-zinc-300">
              {drawRecords.slice(0, 5).map((rec) => (
                <tr key={rec.id} className="hover:bg-[#181B22]">
                  <td className="py-2.5 font-sans font-semibold text-white max-w-xs truncate">
                    {rec.webinarTitle}
                  </td>
                  <td className="py-2.5 text-[#C9A227] font-bold">
                    #{rec.winnerSeats.join(', #')}
                  </td>
                  <td className="py-2.5 text-zinc-400">
                    {rec.winnerEmails[0] || 'm***r@sentinel.net'}
                  </td>
                  <td className="py-2.5 text-zinc-500 truncate max-w-[140px]">
                    {rec.seed}
                  </td>
                  <td className="py-2.5 text-zinc-500 text-[11px]">
                    {new Date(rec.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
