import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Film, Users, Sparkles, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-mist px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary text-white p-2 rounded-lg">
            <Film className="h-6 w-6" />
          </div>
          <span className="font-heading font-bold text-2xl text-ink">Cutroom</span>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6">
          <Badge variant="accent" className="px-3 py-1 text-sm font-semibold">
            <Sparkles className="h-3.5 w-3.5 inline mr-1" /> Prototype v1.0
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-ink tracking-tight">
            Where Filmmakers, Actors & Crew Bring Stories to Life
          </h1>
          <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto leading-relaxed font-body">
            Build your project team, cast talent, manage tasks, and collaborate effortlessly on one unified film platform.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto space-x-2">
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Projects & Talent
              </Button>
            </Link>
          </div>
        </section>

        {/* Features preview */}
        <section className="py-12 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
              <Film className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Project Creation</h3>
            <p className="text-sm text-ink/70">
              Define your vision, list open crew and actor roles, set budgets, and recruit your dream team.
            </p>
          </Card>

          <Card>
            <div className="bg-accent/20 text-ink p-3 rounded-lg w-fit mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Talent Discovery</h3>
            <p className="text-sm text-ink/70">
              Actors and crew build rich portfolios with experience, reel links, and availability status.
            </p>
          </Card>

          <Card>
            <div className="bg-success/10 text-success p-3 rounded-lg w-fit mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Production Kanban</h3>
            <p className="text-sm text-ink/70">
              Manage production tasks seamlessly from pre-production to post-production with assigned teammates.
            </p>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-white py-8 px-6 text-center text-sm border-t border-mist/20">
        <p>© 2026 Cutroom. All rights reserved.</p>
      </footer>
    </div>
  );
};
