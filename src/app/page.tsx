'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PodiumVehicle from '@/components/casino/PodiumVehicle';
import WeeklyBonus from '@/components/casino/WeeklyBonus';
import CasinoHeader from '@/components/casino/CasinoHeader';
import CasinoFooter from '@/components/casino/CasinoFooter';
import type { VehicleConfig, WeeklyBonus as WeeklyBonusType } from '@/types/vehicle';

// Get icon component by name
function getBonusIcon(iconName: string): JSX.Element {
  const icons: Record<string, JSX.Element> = {
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
    gift: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  };
  
  return icons[iconName] || icons.casino;
}

export default function Home() {
  const [showBonus, setShowBonus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState<VehicleConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    async function fetchVehicleData() {
      try {
        // Force no cache to always get fresh data
        const response = await fetch('/api/vehicle', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        console.error('Error fetching vehicle data:', err);
        setError('Impossible de charger les données du véhicule');
      } finally {
        setLoading(false);
      }
    }

    fetchVehicleData();
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-900 to-black" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTEsIDE5MSwgMzYsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      
      {/* Animated gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/5 rounded-full blur-[150px]" />

      {/* Header */}
      <CasinoHeader />

      {/* Content */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            {/* Casino Logo/Icon */}
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.4)]">
                <svg className="w-14 h-14 md:w-20 md:h-20 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"/>
                </svg>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-3xl blur-xl opacity-30 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(251,191,36,0.3)]">
                Diamond Casino
              </span>
              <br />
              <span className="text-zinc-400 text-2xl md:text-3xl lg:text-4xl font-light">
                & Resort
              </span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Découvrez le véhicule du podium et les bonus exclusifs de cette semaine
            </p>

            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-zinc-500 text-sm">
                Mise à jour automatique • {config?.casinoInfo?.podiumRefreshDay || 'Jeudi'}
              </span>
            </div>

            {/* Last updated */}
            {config?.lastUpdated && (
              <p className="text-zinc-600 text-xs mb-4">
                Dernière mise à jour: {new Date(config.lastUpdated).toLocaleString('fr-FR')}
              </p>
            )}
          </section>

          {/* Loading State */}
          {loading && (
            <section className="mb-16">
              <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-2 border-amber-500/30 rounded-xl p-6 md:p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Skeleton className="aspect-video rounded-xl bg-zinc-800" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4 bg-zinc-800" />
                    <Skeleton className="h-4 w-full bg-zinc-800" />
                    <Skeleton className="h-4 w-2/3 bg-zinc-800" />
                    <Skeleton className="h-24 w-full bg-zinc-800 rounded-lg" />
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-full bg-zinc-800" />
                      <Skeleton className="h-6 w-full bg-zinc-800" />
                      <Skeleton className="h-6 w-full bg-zinc-800" />
                      <Skeleton className="h-6 w-full bg-zinc-800" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Error State */}
          {error && !loading && (
            <section className="mb-16">
              <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-500/30 rounded-xl p-8 text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-amber-500 text-black hover:bg-amber-400"
                >
                  Réessayer
                </Button>
              </div>
            </section>
          )}

          {/* Podium Vehicle Section */}
          {config && !loading && (
            <section id="podium" className="mb-16">
              <div className={`transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <PodiumVehicle 
                  name={config.currentPodiumVehicle.name}
                  manufacturer={config.currentPodiumVehicle.manufacturer}
                  type={config.currentPodiumVehicle.type}
                  image={config.currentPodiumVehicle.image}
                  originalPrice={config.currentPodiumVehicle.originalPrice}
                  currency={config.currentPodiumVehicle.currency}
                  dealer={config.currentPodiumVehicle.dealer}
                  stats={config.currentPodiumVehicle.stats}
                  description={config.currentPodiumVehicle.description}
                />
              </div>
            </section>
          )}

          {/* Weekly Bonuses Section */}
          {config && !loading && (
            <section id="bonus" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Bonus de la Semaine
                </h2>
                <p className="text-zinc-500">
                  Profitez des récompenses exclusives du {config.currentPodiumVehicle.weekStart} au {config.currentPodiumVehicle.weekEnd}
                </p>
              </div>
              
              <WeeklyBonus bonuses={config.weeklyBonuses} />

              {/* CTA Button with Modal */}
              <div className="text-center mt-8">
                <Dialog open={showBonus} onOpenChange={setShowBonus}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => setShowBonus(true)}
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold px-8 py-6 text-lg hover:from-amber-400 hover:to-yellow-300 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_50px_rgba(251,191,36,0.5)] transition-all duration-300 rounded-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      Voir tous les bonus de la semaine
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-amber-500/30 text-white">
                    <DialogHeader className="sr-only">
                      <DialogTitle className="text-2xl font-bold text-amber-400">Bonus de la Semaine</DialogTitle>
                      <DialogDescription className="text-zinc-400">
                        Tous les bonus et récompenses disponibles cette semaine
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center pb-4 border-b border-amber-500/20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 mb-4 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                          </svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                          Bonus de la Semaine
                        </h2>
                        <p className="text-zinc-400 mt-2">
                          Du {config.currentPodiumVehicle.weekStart} au {config.currentPodiumVehicle.weekEnd}
                        </p>
                      </div>

                      {/* All Bonuses Grid */}
                      <div className="grid gap-4">
                        {config.weeklyBonuses.map((bonus, index) => (
                          <div 
                            key={bonus.id}
                            className="group relative overflow-hidden bg-gradient-to-r from-zinc-900/80 to-black border border-amber-500/20 hover:border-amber-500/50 rounded-xl p-5 transition-all duration-300"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/10 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                                {getBonusIcon(bonus.icon)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                                    {bonus.title}
                                  </h3>
                                  {bonus.isNew && (
                                    <span className="px-2 py-0.5 text-xs font-bold bg-green-500/20 text-green-400 rounded-full animate-pulse">
                                      NOUVEAU
                                    </span>
                                  )}
                                  {bonus.isHot && (
                                    <span className="px-2 py-0.5 text-xs font-bold bg-red-500/20 text-red-400 rounded-full">
                                      🔥 POPULAIRE
                                    </span>
                                  )}
                                </div>
                                <p className="text-zinc-400 text-sm mb-2">{bonus.description}</p>
                                {bonus.reward && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-amber-400 font-medium">Récompense:</span>
                                    <span className="text-white">{bonus.reward}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer info */}
                      <div className="text-center pt-4 border-t border-amber-500/20">
                        <p className="text-zinc-500 text-sm">
                          Les bonus sont mis à jour chaque jeudi à 10h00 (heure du jeu)
                        </p>
                        <Button 
                          onClick={() => setShowBonus(false)}
                          className="mt-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30"
                        >
                          Fermer
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </section>
          )}

          {/* Casino Info Section */}
          {config && !loading && (
            <section id="info" className="mb-16">
              <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-amber-500/20 rounded-2xl p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold">{config.casinoInfo.name}</h3>
                    <p className="text-zinc-500 text-sm">{config.casinoInfo.location}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold">Rotation du podium</h3>
                    <p className="text-zinc-500 text-sm">Chaque {config.casinoInfo.podiumRefreshDay}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>

      {/* Footer */}
      <CasinoFooter />

      {/* Buy me a cookie button */}
      <a
        href="https://buymeacoffee.com/minhero"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500/90 hover:bg-amber-500 text-white text-sm font-medium transition-all shadow-lg hover:shadow-xl backdrop-blur-sm hover:scale-105"
        aria-label="Offrir un café"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M10 2v2" />
          <path d="M14 2v2" />
          <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 1 1 1 0 8h-1" />
          <path d="M6 2v2" />
        </svg>
        <span className="hidden sm:inline">Offrir un café</span>
      </a>

      {/* Decorative bottom gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </main>
  );
}
