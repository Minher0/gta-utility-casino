'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

export default function CasinoHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationSupported, setNotificationSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if notifications are supported and already permitted
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationSupported(true);
      if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
        // Check if user has subscribed in localStorage
        const hasSubscribed = localStorage.getItem('gta-casino-notifications') === 'true';
        setSubscribed(hasSubscribed);
      }
    }
  }, []);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!notificationSupported) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        localStorage.setItem('gta-casino-notifications', 'true');
        setSubscribed(true);
        
        // Show welcome notification
        new Notification('🎰 GTA Casino Utility', {
          body: 'Vous serez notifié dès qu\'un nouveau véhicule du podium est disponible!',
          icon: '/icon.png',
          badge: '/icon.png',
        });
      }
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  };

  // Toggle notifications
  const toggleNotifications = (enabled: boolean) => {
    if (enabled && Notification.permission !== 'granted') {
      requestNotificationPermission();
    } else {
      setSubscribed(enabled);
      localStorage.setItem('gta-casino-notifications', enabled.toString());
    }
  };

  // Calculate next podium reset (Thursday)
  const getNextReset = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    const nextThursday = new Date(now);
    nextThursday.setDate(now.getDate() + (daysUntilThursday === 0 ? 7 : daysUntilThursday));
    nextThursday.setHours(10, 0, 0, 0); // 10:00 AM UTC
    
    const diff = nextThursday.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `dans ${days}j ${hours}h`;
    }
    return `dans ${hours}h`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-amber-500/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 transition-all duration-700">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-lg blur opacity-30 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                GTA Casino
              </span>
              <span className="text-[10px] md:text-xs text-zinc-500 tracking-widest uppercase">
                Utility Hub
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#podium" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm font-medium">
              Podium
            </a>
            <a href="#bonus" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm font-medium">
              Bonus
            </a>
            <a href="#info" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm font-medium">
              Casino
            </a>
          </nav>

          {/* Notifications Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold hover:from-amber-400 hover:to-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all duration-300 relative">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
                {subscribed && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gradient-to-br from-zinc-900 to-black border-amber-500/30 text-white" align="end">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-amber-500/20">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/10">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-400">Notifications</h4>
                    <p className="text-xs text-zinc-500">Alertes nouveau véhicule</p>
                  </div>
                </div>

                {/* Next reset info */}
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-sm">Prochain podium</span>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      {getNextReset()}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Jeudi à 10:00 (heure du jeu)</p>
                </div>

                {/* Notification toggle */}
                {notificationSupported ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Activer les notifications</p>
                      <p className="text-xs text-zinc-500">Nouveau véhicule du podium</p>
                    </div>
                    <Switch
                      checked={subscribed}
                      onCheckedChange={toggleNotifications}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-red-400">Notifications non supportées</p>
                    <p className="text-xs text-zinc-500">Votre navigateur ne supporte pas les notifications</p>
                  </div>
                )}

                {/* Status */}
                {subscribed && (
                  <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 rounded-lg p-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Notifications activées
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
