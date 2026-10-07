import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ArrowRight, Play, Check, Sparkles, MoreHorizontal } from 'lucide-react';

import heroSetPhoto from '../assets/hero_set_photography.png';
import featureCollaborate from '../assets/feature_collaborate.png';
import featureRecruit from '../assets/feature_recruit.png';
import featureManage from '../assets/feature_manage.png';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col">
      {/* 1. Navigation Header (Height 80px, Padding 0px 72px) */}
      <header className="h-[80px] px-4 md:px-[72px] bg-surface border-b border-mist flex items-center justify-between sticky top-0 z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-9 w-9 bg-primary rounded-[10px] flex items-center justify-center text-white shadow-soft">
            <Film className="h-5 w-5" />
          </div>
          <span className="font-heading font-semibold text-base text-primary tracking-tight">Cutroom</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-normal text-ink">
          <a href="#platform" className="hover:text-primary transition-colors">Platform</a>
          <a href="#discover" className="hover:text-primary transition-colors">Discover</a>
          <a href="#productions" className="hover:text-primary transition-colors">For productions</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </nav>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <button className="h-[44px] px-4 rounded-[10px] border border-ink text-ink hover:bg-paper text-sm font-semibold transition-colors">
              Log in
            </button>
          </Link>
          <Link to="/register">
            <button className="h-[44px] px-4 rounded-[10px] bg-primary text-surface hover:opacity-95 text-sm font-semibold flex items-center space-x-2 transition-opacity">
              <span>Join Cutroom</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </Link>
        </div>
      </header>

      {/* 2. Hero Section (Padding 80px 72px 96px) */}
      <section className="px-4 md:px-[72px] pt-12 md:pt-20 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-[72px]">
        {/* Hero Copy (560px max) */}
        <div className="lg:col-span-6 space-y-6 max-w-[560px]">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-subtle rounded-full border border-primary/10">
            <span className="text-[12px] font-semibold tracking-wider uppercase text-primary font-sans">
              Built for independent film
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-[44px] leading-[1.1] text-ink tracking-tight">
            Make the film. Find your people.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-muted leading-[1.6]">
            Cutroom brings filmmakers, actors, and crew together—then gives every production a clear place to recruit, collaborate, and deliver.
          </p>

          {/* Hero Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link to="/register">
              <button className="h-[52px] px-5 rounded-[10px] bg-primary text-surface hover:opacity-95 text-sm font-semibold flex items-center justify-center space-x-2 transition-opacity w-full sm:w-auto">
                <span>Start a production</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </Link>
            <Link to="/browse">
              <button className="h-[52px] px-5 rounded-[10px] bg-surface border border-primary text-primary hover:bg-paper text-sm font-semibold flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto">
                <Play className="h-4.5 w-4.5 fill-current" />
                <span>Explore projects</span>
              </button>
            </Link>
          </div>

          {/* Trust Note */}
          <div className="flex items-center space-x-3 pt-4">
            <div className="flex -space-x-2">
              {['AM', 'JL', 'SK', 'TR'].map((initials, i) => (
                <div 
                  key={i} 
                  className="h-8 w-8 rounded-full bg-paper border-2 border-surface flex items-center justify-center text-[10px] font-bold text-ink shadow-sm"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-xs text-ink font-normal">
              Trusted by 4,800+ independent creators
            </span>
          </div>
        </div>

        {/* Hero Media Column */}
        <div className="lg:col-span-6 relative h-[440px] sm:h-[540px] rounded-[24px] overflow-hidden shadow-xl border border-mist/50">
          <img 
            src={heroSetPhoto} 
            alt="Set Photography" 
            className="w-full h-full object-cover"
          />

          {/* Floating Production Card */}
          <div className="absolute left-4 sm:left-7 bottom-6 w-[320px] sm:w-[350px] bg-surface border border-mist p-5 rounded-[16px] shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 bg-subtle rounded-full text-[11px] font-semibold tracking-wider text-ink uppercase">
                IN PRODUCTION
              </span>
              <MoreHorizontal className="h-4 w-4 text-ink/60 cursor-pointer" />
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg text-ink">After the Last Train</h4>
              <p className="text-xs text-muted">Drama · 14 collaborators · Portland, OR</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-ink">
                <span>Production progress</span>
                <span className="font-semibold">72%</span>
              </div>
              <div className="h-1.5 w-full bg-paper rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[72%]"></div>
              </div>
            </div>
          </div>

          {/* Floating Crew Update Notification */}
          <div className="absolute right-4 top-6 bg-surface p-2.5 px-4 rounded-[12px] shadow-lg flex items-center space-x-3 border border-mist/30">
            <div className="h-7 w-7 rounded-[8px] bg-paper flex items-center justify-center text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="font-heading font-semibold text-xs text-ink">New application</p>
              <p className="text-[10px] text-ink/70">Maya applied for Lead Actor</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Proof Strip */}
      <section className="px-4 md:px-[72px] py-6 bg-surface border-y border-mist flex flex-wrap justify-between items-center gap-6">
        <span className="text-xs font-semibold tracking-wider text-ink uppercase">
          Creators are building on Cutroom
        </span>
        {['SUNDOWN PICTURES', 'KINETIC HOUSE', 'FRAME / 24', 'NORTH STAR FILMS', 'FIELD NOTES'].map((brand) => (
          <span key={brand} className="text-xs font-bold text-ink/70 uppercase tracking-widest">
            {brand}
          </span>
        ))}
      </section>

      {/* 4. Feature Story (Padding 96px 72px) */}
      <section className="px-4 md:px-[72px] py-20 md:py-24 space-y-16 max-w-[1440px] mx-auto w-full">
        <div className="max-w-[670px] space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            One home for the work
          </span>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-ink leading-tight">
            Everything your next production needs to move forward.
          </h2>
        </div>

        {/* Feature Blocks */}
        <div className="space-y-16">
          {/* Feature 01 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
            <div className="lg:col-span-6 h-[330px] rounded-[16px] overflow-hidden shadow-md">
              <img src={featureCollaborate} alt="Collaborate Workspace" className="w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 bg-paper border border-mist rounded-[10px] flex items-center justify-center font-semibold text-xs text-primary">
                  01
                </div>
                <span className="font-semibold text-sm text-primary">Collaborate</span>
              </div>
              <h3 className="font-heading font-semibold text-2xl md:text-3xl text-ink">
                Your whole production, in one focused workspace.
              </h3>
              <p className="text-muted text-base leading-relaxed">
                Keep conversations, files, feedback, and milestones connected from the first table read to final delivery.
              </p>
              <ul className="space-y-2.5 pt-2">
                {['Shared production hub', 'Versioned script feedback', 'Crew-wide updates'].map((item) => (
                  <li key={item} className="flex items-center space-x-2 text-sm text-ink font-medium">
                    <div className="h-5 w-5 rounded-full bg-paper flex items-center justify-center text-primary">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
            <div className="lg:col-span-6 lg:order-2 h-[330px] rounded-[16px] overflow-hidden shadow-md">
              <img src={featureRecruit} alt="Recruit Talent" className="w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-6 lg:order-1 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 bg-paper border border-mist rounded-[10px] flex items-center justify-center font-semibold text-xs text-primary">
                  02
                </div>
                <span className="font-semibold text-sm text-ink">Recruit</span>
              </div>
              <h3 className="font-heading font-semibold text-2xl md:text-3xl text-ink">
                Find the right people for the story you’re telling.
              </h3>
              <p className="text-muted text-base leading-relaxed">
                Search verified portfolios, review reels, publish open roles, and invite collaborators whose experience fits your vision.
              </p>
              <ul className="space-y-2.5 pt-2">
                {['Role-based discovery', 'Portfolio and reel review', 'Fast applications'].map((item) => (
                  <li key={item} className="flex items-center space-x-2 text-sm text-ink font-medium">
                    <div className="h-5 w-5 rounded-full bg-paper flex items-center justify-center text-primary">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
            <div className="lg:col-span-6 h-[330px] rounded-[16px] overflow-hidden shadow-md">
              <img src={featureManage} alt="Manage Production" className="w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 bg-paper border border-mist rounded-[10px] flex items-center justify-center font-semibold text-xs text-primary">
                  03
                </div>
                <span className="font-semibold text-sm text-primary">Manage</span>
              </div>
              <h3 className="font-heading font-semibold text-2xl md:text-3xl text-ink">
                Move from greenlight to wrap without losing momentum.
              </h3>
              <p className="text-muted text-base leading-relaxed">
                Turn creative intent into clear ownership with schedules, task boards, production files, and progress at a glance.
              </p>
              <ul className="space-y-2.5 pt-2">
                {['Visual task boards', 'Production timeline', 'Centralized assets'].map((item) => (
                  <li key={item} className="flex items-center space-x-2 text-sm text-ink font-medium">
                    <div className="h-5 w-5 rounded-full bg-paper flex items-center justify-center text-primary">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Conversion Section */}
      <section className="px-4 md:px-[72px] pb-16 md:pb-24">
        <div className="bg-primary text-surface rounded-[24px] p-8 md:p-12 border border-mist flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-[700px]">
            <h2 className="font-heading font-semibold text-2xl md:text-3xl text-surface">
              Your next collaborator is already here.
            </h2>
            <p className="text-surface/90 text-sm md:text-base leading-relaxed">
              Build your profile, create a project, and bring your next production to life with Cutroom.
            </p>
          </div>
          <Link to="/register">
            <button className="h-[52px] px-6 rounded-[10px] border border-accent-peach text-accent-peach hover:bg-white/10 text-sm font-semibold flex items-center space-x-2 transition-colors whitespace-nowrap">
              <span>Create your free account</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </Link>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="px-4 md:px-[72px] py-8 bg-paper border-t border-mist flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink">
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 bg-primary rounded-[8px] flex items-center justify-center text-white">
            <Film className="h-4 w-4" />
          </div>
          <span className="font-heading font-semibold text-sm text-primary">Cutroom</span>
        </div>

        <p className="text-ink/70">© 2026 Cutroom. Built for stories worth making.</p>

        <div className="flex space-x-6 text-ink/80 font-medium">
          <a href="#privacy" className="hover:text-primary">Privacy</a>
          <a href="#terms" className="hover:text-primary">Terms</a>
          <a href="#community" className="hover:text-primary">Community</a>
        </div>
      </footer>
    </div>
  );
};
