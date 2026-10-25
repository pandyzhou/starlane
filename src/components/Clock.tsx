import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export const Clock: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('00:00:00');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);

      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      setDateStr(`${year}年${month}月${date}日 ${weekdays[now.getDay()]}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-col items-center mb-4 text-center select-none">
      <h1 className="text-xl md:text-2xl font-medium tracking-widest text-theme-fg mb-3">
        疏星弄
      </h1>
      <div className="text-3xl md:text-4xl font-semibold tracking-tight text-theme-fg mb-2 font-mono tabular-nums">
        {timeStr}
      </div>
      <div className="text-sm font-medium text-theme-fg/60 flex items-center gap-1.5">
        <Calendar className="w-4 h-4 text-theme-primary" />
        <span>{dateStr}</span>
      </div>
    </header>
  );
};
