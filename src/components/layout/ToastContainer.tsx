import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ToastContainer: React.FC = () => {
  const { toast, clearToast } = useStore();

  return (
    <div className="fixed top-20 right-4 z-50 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto p-3.5 rounded shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'gold'
                ? 'bg-[#14161A]/95 border-[#C9A227] shadow-[0_0_20px_rgba(201,162,39,0.25)] text-white'
                : toast.type === 'success'
                ? 'bg-[#14161A]/95 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-white'
                : 'bg-[#14161A]/95 border-[#23262C] text-zinc-200'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'gold' && <Sparkles className="w-4 h-4 text-[#C9A227]" />}
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
            </div>

            <div className="flex-1 text-xs leading-relaxed font-sans font-medium">
              {toast.message}
            </div>

            <button
              onClick={clearToast}
              className="text-zinc-500 hover:text-white transition-colors shrink-0 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
