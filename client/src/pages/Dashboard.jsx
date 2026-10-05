import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Film, Users, PlusCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ink">Creator Dashboard</h1>
          <p className="text-sm text-ink/70">Manage your active projects and pending applications.</p>
        </div>
        <Link to="/projects/create">
          <Button className="space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center space-x-4 p-4">
          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Film className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-ink/60 font-medium">Active Projects</p>
            <p className="text-2xl font-bold font-heading text-ink">3</p>
          </div>
        </Card>
        
        <Card className="flex items-center space-x-4 p-4">
          <div className="bg-accent/20 text-ink p-3 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-ink/60 font-medium">Pending Applicants</p>
            <p className="text-2xl font-bold font-heading text-ink">5</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 p-4">
          <div className="bg-success/10 text-success p-3 rounded-lg">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-ink/60 font-medium">Team Members</p>
            <p className="text-2xl font-bold font-heading text-ink">12</p>
          </div>
        </Card>
      </div>

      {/* Projects List Preview */}
      <Card>
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
          <CardDescription>Projects you are currently directing or producing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-mist rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/50 transition-colors">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-base font-heading">Shadows of the City</h4>
                <Badge variant="primary">Pre-production</Badge>
              </div>
              <p className="text-sm text-ink/70">Neo-noir thriller set in downtown Chicago.</p>
            </div>
            <Link to="/projects/1">
              <Button variant="outline" size="sm">Manage Project</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
