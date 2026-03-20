'use client';

import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { VehicleStats } from '@/types/vehicle';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  delay: number;
}

function StatBar({ label, value, maxValue, delay }: StatBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = (value / maxValue) * 100;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-400 font-medium">{label}</span>
        <span className="text-amber-400 font-bold">{value}<span className="text-zinc-500 text-xs">/{maxValue}</span></span>
      </div>
      <div className="relative h-3 bg-zinc-900/80 rounded-full overflow-hidden border border-amber-500/20">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          style={{ width: `${animatedValue}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-full" />
      </div>
    </div>
  );
}

interface PodiumVehicleProps {
  name: string;
  manufacturer: string;
  type: string;
  image: string;
  originalPrice: number;
  currency: string;
  dealer: string;
  stats: VehicleStats;
  description: string;
}

export default function PodiumVehicle({
  name,
  manufacturer,
  type,
  image,
  originalPrice,
  currency,
  dealer,
  stats,
  description
}: PodiumVehicleProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  // Fallback image - GTA styled placeholder
  const fallbackImage = `https://via.placeholder.com/800x500/1a1a1a/fbbf24?text=${encodeURIComponent(name)}`;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-2 border-amber-500/30 shadow-[0_0_50px_rgba(251,191,36,0.15)] transition-all duration-700 opacity-100 translate-y-0">
      {/* Neon glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      
      <CardContent className="p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Vehicle Image Section */}
          <div className="relative">
            {/* Spotlight effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent rounded-xl pointer-events-none" />
            
            {/* Image container with glow */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border border-amber-500/20">
              {/* Loading spinner */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${imageLoaded || imageError ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              </div>
              
              {/* Main image */}
              <img 
                src={imageError ? fallbackImage : image} 
                alt={name}
                className={`w-full h-full object-contain p-6 transition-all duration-700 ${imageLoaded || imageError ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
              
              {/* Vehicle silhouette overlay when loading */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-amber-500/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                </div>
              )}
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-3 -right-3 z-10">
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold px-4 py-1.5 text-sm shadow-[0_0_20px_rgba(251,191,36,0.5)] border-0">
                PODIUM
              </Badge>
            </div>
          </div>

          {/* Vehicle Info Section */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-amber-500/50 text-amber-400 text-xs">
                  {type}
                </Badge>
                <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs">
                  {manufacturer}
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                {name}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-amber-500/20">
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Prix chez {dealer}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                  {currency}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {formatPrice(originalPrice)}
                </span>
              </div>
              <div className="text-xs text-amber-400 mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Gagnable gratuitement au podium du casino!
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Statistiques du véhicule
              </h3>
              
              <div className="space-y-4">
                <StatBar 
                  label={stats.topSpeed.label} 
                  value={stats.topSpeed.value} 
                  maxValue={stats.topSpeed.maxValue}
                  delay={200}
                />
                <StatBar 
                  label={stats.acceleration.label} 
                  value={stats.acceleration.value} 
                  maxValue={stats.acceleration.maxValue}
                  delay={400}
                />
                <StatBar 
                  label={stats.braking.label} 
                  value={stats.braking.value} 
                  maxValue={stats.braking.maxValue}
                  delay={600}
                />
                <StatBar 
                  label={stats.traction.label} 
                  value={stats.traction.value} 
                  maxValue={stats.traction.maxValue}
                  delay={800}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
