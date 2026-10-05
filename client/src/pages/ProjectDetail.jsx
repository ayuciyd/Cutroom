import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Film, Users, CheckCircle, Clock } from 'lucide-react';

export const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-6 rounded-xl border border-mist shadow-card">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="primary">Pre-production</Badge>
            <Badge variant="accent">Thriller</Badge>
          </div>
          <h1 className="text-3xl font-bold font-heading text-ink">Shadows of the City</h1>
          <p className="text-sm text-ink/70 mt-1">Directed by Demo Director • Chicago, IL</p>
        </div>
        <Button className="space-x-2">
          <span>Apply to Role</span>
        </Button>
      </div>

      {/* Tabs / Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logline & Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-ink/80 leading-relaxed">
              <p>
                When a disgraced detective uncovers corruption inside the police department, he must choose between protecting his family or bringing the truth to light before time runs out.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Roles</CardTitle>
              <CardDescription>Positions open for auditions and hiring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 border border-mist rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-ink">Lead Detective (Male, 35-45)</h4>
                  <p className="text-xs text-ink/60">Actor • 1 position open</p>
                </div>
                <Button size="sm">Apply</Button>
              </div>

              <div className="p-4 border border-mist rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-ink">Director of Photography (DP)</h4>
                  <p className="text-xs text-ink/60">Crew • 1 position open</p>
                </div>
                <Button size="sm">Apply</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Board preview sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team & Production</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-mist/50">
                <span className="text-ink/60">Budget</span>
                <span className="font-semibold">$20,000 - $50,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-mist/50">
                <span className="text-ink/60">Stage</span>
                <span className="font-semibold">Pre-production</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-ink/60">Team Size</span>
                <span className="font-semibold">4 Members</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
