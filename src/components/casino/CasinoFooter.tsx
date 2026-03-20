'use client';

export default function CasinoFooter() {
  return (
    <footer className="relative border-t border-amber-500/20 bg-gradient-to-t from-black via-zinc-900 to-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  GTA Casino Utility
                </span>
              </div>
            </div>
            <p className="text-zinc-500 text-sm">
              Votre source incontournable pour les bonus et récompenses du Diamond Casino de GTA Online.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#podium" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
                  Véhicule du Podium
                </a>
              </li>
              <li>
                <a href="#bonus" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
                  Bonus Hebdomadaires
                </a>
              </li>
              <li>
                <a href="#info" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
                  Informations Casino
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <p className="text-center text-zinc-600 text-sm">
            © 2024 GTA Casino Utility. Non affilié à Rockstar Games.
          </p>
        </div>
      </div>
    </footer>
  );
}
