'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WeeklyBonus } from '@/types/vehicle';

interface BonusCardProps {
  bonus: WeeklyBonus;
  index: number;
}

function BonusCard({ bonus, index }: BonusCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  const iconMap: Record<string, JSX.Element> = {
    race: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    discount: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    casino: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  };

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 group-hover:from-amber-500/10 group-hover:via-transparent group-hover:to-amber-500/5 transition-all duration-500" />
      <CardContent className="p-4 flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/10 text-amber-400 group-hover:scale-110 transition-transform duration-300">
          {iconMap[bonus.icon] || iconMap.casino}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm md:text-base group-hover:text-amber-400 transition-colors">
            {bonus.title}
          </h4>
          <p className="text-zinc-500 text-xs md:text-sm mt-0.5">
            {bonus.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface WeeklyBonusProps {
  bonuses: WeeklyBonus[];
}

export default function WeeklyBonus({ bonuses }: WeeklyBonusProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {bonuses.map((bonus, index) => (
        <BonusCard key={bonus.id} bonus={bonus} index={index} />
      ))}
    </div>
  );
}
