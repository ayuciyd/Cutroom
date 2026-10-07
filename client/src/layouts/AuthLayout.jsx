import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Film, Users } from 'lucide-react';
import authStill from '../assets/auth_film_still.png';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1240px] min-h-[780px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Brand Panel (570px width equivalent on lg screens) */}
        <div className="hidden lg:flex lg:col-span-5 relative rounded-[16px] bg-primary border border-mist p-12 flex-col justify-between overflow-hidden shadow-card">
          {/* Film Still Background Image */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img src={authStill} alt="Film Still" className="w-full h-full object-cover" />
          </div>

          {/* Top Logo */}
          <div className="relative z-10 flex items-center space-x-2">
            <div className="h-9 w-9 bg-primary rounded-[10px] flex items-center justify-center text-white shadow-soft">
              <Film className="h-5 w-5" />
            </div>
            <span className="font-heading font-semibold text-base text-accent-peach tracking-tight">
              Cutroom
            </span>
          </div>

          {/* Middle Quote & Attribution */}
          <div className="relative z-10 space-y-6 max-w-[430px]">
            <h2 className="font-heading font-semibold text-2xl lg:text-[32px] leading-[1.25] text-paper">
              “A film is only as strong as the people you invite into the room.”
            </h2>
            <div className="space-y-0.5">
              <p className="font-semibold text-sm text-paper">Mara Chen</p>
              <p className="text-xs text-paper/80">Writer / Director · North Star Films</p>
            </div>
          </div>

          {/* Bottom Community Proof Card */}
          <div className="relative z-10 bg-surface border border-mist p-4 rounded-[12px] flex items-center space-x-4 shadow-soft">
            <div className="h-10 w-10 rounded-[10px] bg-primary text-white flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold text-sm text-ink">4,800+ film professionals</p>
              <p className="text-xs text-muted">Creating, casting, and collaborating now</p>
            </div>
          </div>
        </div>

        {/* Right Authentication Panel */}
        <div className="lg:col-span-7 bg-surface border border-mist rounded-[16px] p-6 md:p-12 shadow-card flex flex-col justify-center">
          <Outlet />
        </div>

      </div>
    </div>
  );
};
