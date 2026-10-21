import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  className = '',
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    minutes: 48,
    seconds: 19,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = targetDate ? new Date(targetDate).getTime() : now + 1000 * (2 * 3600 + 48 * 60 + 20);
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1 font-mono text-xs text-[#C9A227] ${className}`}>
        <span>{pad(timeLeft.hours)}h</span>:
        <span>{pad(timeLeft.minutes)}m</span>:
        <span>{pad(timeLeft.seconds)}s</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {[
        { label: 'DAYS', value: pad(timeLeft.days) },
        { label: 'HRS', value: pad(timeLeft.hours) },
        { label: 'MIN', value: pad(timeLeft.minutes) },
        { label: 'SEC', value: pad(timeLeft.seconds) },
      ].map((item, idx) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col items-center">
            <div className="w-12 sm:w-16 h-12 sm:h-14 rounded bg-[#14161A] border border-[#23262C] flex items-center justify-center shadow-inner relative overflow-hidden group">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />
              <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-wider">
                {item.value}
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-[#8A8F98] mt-1 uppercase">
              {item.label}
            </span>
          </div>

          {idx < 3 && (
            <span className="text-[#C9A227] font-mono text-lg font-bold -mt-4 animate-pulse">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
