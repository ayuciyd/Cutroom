import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Projects = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ink">My Projects</h1>
          <p className="text-sm text-ink/70">Manage all your created projects and applications.</p>
        </div>
        <Link to="/projects/create">
          <Button className="space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Create Project</span>
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Shadows of the City</CardTitle>
              <Badge variant="primary">Pre-production</Badge>
            </div>
            <CardDescription>Neo-noir thriller about a detective in downtown Chicago.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <span className="text-xs text-ink/60">3 Open Roles • 4 Applicants</span>
            <Link to="/projects/1">
              <Button variant="outline" size="sm">Open Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
