import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { User, MapPin, Briefcase, Star, Link as LinkIcon } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Profile Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-accent/30 text-ink flex items-center justify-center font-bold text-3xl font-heading shadow-soft border-2 border-accent">
            CR
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold font-heading text-ink">Demo Director</h1>
                <p className="text-sm text-primary font-medium">Independent Film Director & Writer</p>
              </div>
              <Button variant="outline" size="sm">Edit Profile</Button>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-ink/70 pt-1">
              <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1" /> Chicago, IL</span>
              <span className="flex items-center"><Briefcase className="h-3.5 w-3.5 mr-1" /> 8 Years Exp.</span>
              <Badge variant="success">Available for Hire</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Bio & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-ink/80 leading-relaxed">
                Passionate narrative film director focused on crime thrillers and character-driven dramas. Graduate of Columbia College Chicago Film Department with multiple short festival selections.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio & Reel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border border-mist rounded-lg flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">Director's Reel 2025</span>
                </div>
                <Badge variant="outline">Vimeo</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Skills & Equipment</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {['Directing', 'Screenwriting', 'Casting', 'RELIABLE', 'RED Komodo', 'DaVinci Resolve'].map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
