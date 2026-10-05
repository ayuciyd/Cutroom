import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Filter, Film, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Browse = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-ink">Browse & Discover</h1>
        <p className="text-sm text-ink/70">Find film projects recruiting talent or discover actors and crew.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" />
          <Input placeholder="Search projects by title, genre, location..." className="pl-9" />
        </div>
        <Button variant="outline" className="space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Tabs / Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="primary">Drama</Badge>
              <span className="text-xs text-ink/60">Pre-production</span>
            </div>
            <CardTitle className="mt-2">The Golden Hour</CardTitle>
            <CardDescription>Short indie drama pursuing film festival premiere.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-ink/70 space-y-1 mb-4">
              <p>📍 Location: Los Angeles, CA</p>
              <p>💰 Budget: Micro ($5,000 - $15,000)</p>
            </div>
            <Link to="/projects/2">
              <Button className="w-full" size="sm">View Project & Roles</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="accent">Sci-Fi</Badge>
              <span className="text-xs text-ink/60">Development</span>
            </div>
            <CardTitle className="mt-2">Echoes from Titan</CardTitle>
            <CardDescription>Sci-Fi thriller about a deep space radio station.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-ink/70 space-y-1 mb-4">
              <p>📍 Location: Remote / London</p>
              <p>💰 Budget: Low ($25,000 - $50,000)</p>
            </div>
            <Link to="/projects/3">
              <Button className="w-full" size="sm">View Project & Roles</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
