'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface PodiumVehicleProps {
  name: string;
  manufacturer: string;
  type: string;
  image: string;
  originalPrice: number;
  currency: string;
  dealer: string;
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
