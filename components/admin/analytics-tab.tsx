'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Users, Eye, Timer, Activity } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

interface GAValue {
  value?: string;
}
interface GARow {
  dimensionValues?: GAValue[];
  metricValues?: GAValue[];
}
interface GAReport {
  rows?: GARow[];
  totals?: GARow[];
  rowCount?: number;
}
interface AnalyticsData {
  daily: GAReport;
  topPages: GAReport;
  countries: GAReport;
  devices: GAReport;
  totals: GAReport;
  realtime: GAReport;
}

const PIE_COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#f43f5e'];

function formatGaDate(d: string) {
  if (d.length !== 8) return d;
  return new Date(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`).toLocaleDateString(
    undefined,
    { month: 'short', day: 'numeric' }
  );
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

function formatPercent(v: number) {
  return `${Math.round((v <= 1 ? v * 100 : v) * 10) / 10}%`;
}

export function AnalyticsTab() {
  const { user } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await user?.getIdToken();
        const res = await fetch('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to load analytics');
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          {error === 'GA4_PROPERTY_ID not configured' ? (
            <>
              <p className="font-medium text-foreground mb-2">GA4 not configured</p>
              <p className="text-sm max-w-md mx-auto">
                Set <code>GA4_PROPERTY_ID</code> in your environment (GA → Admin → Property
                settings → Property ID) and grant the Firebase service account Viewer access
                on the GA4 property.
              </p>
            </>
          ) : (
            <p>{error || 'No analytics data'}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  const t = data.totals?.totals?.[0]?.metricValues || [];
  const realtimeUsers = Number(
    data.realtime?.totals?.[0]?.metricValues?.[0]?.value ??
      data.realtime?.rows?.[0]?.metricValues?.[0]?.value ??
      0
  );

  const daily = (data.daily?.rows || []).map((r) => ({
    date: formatGaDate(r.dimensionValues?.[0]?.value || ''),
    users: Number(r.metricValues?.[0]?.value || 0),
    sessions: Number(r.metricValues?.[1]?.value || 0),
    views: Number(r.metricValues?.[2]?.value || 0),
  }));

  const pages = (data.topPages?.rows || []).map((r) => ({
    page: r.dimensionValues?.[0]?.value || '',
    views: Number(r.metricValues?.[0]?.value || 0),
    users: Number(r.metricValues?.[1]?.value || 0),
  }));

  const countries = (data.countries?.rows || []).map((r) => ({
    country: r.dimensionValues?.[0]?.value || '',
    users: Number(r.metricValues?.[0]?.value || 0),
  }));

  const devices = (data.devices?.rows || []).map((r) => ({
    name: r.dimensionValues?.[0]?.value || 'unknown',
    value: Number(r.metricValues?.[0]?.value || 0),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3" /> Active now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" /> Users (30d)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Number(t[0]?.value || 0)}</div>
            <p className="text-xs text-muted-foreground">{t[1]?.value || 0} new</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Number(t[2]?.value || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Eye className="h-3 w-3" /> Page views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Number(t[3]?.value || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Timer className="h-3 w-3" /> Avg. session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(Number(t[4]?.value || 0))}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Bounce rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercent(Number(t[5]?.value || 0))}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Traffic — last 30 days</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" fontSize={12} tickLine={false} />
              <YAxis fontSize={12} tickLine={false} width={36} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} />
              <Area type="monotone" dataKey="sessions" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} />
              <Area type="monotone" dataKey="views" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Top pages</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pages} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis type="number" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="page"
                  fontSize={11}
                  width={140}
                  tickFormatter={(v: string) => (v.length > 20 ? `${v.slice(0, 20)}…` : v)}
                />
                <Tooltip />
                <Bar dataKey="views" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Devices</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devices}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  label={(e) => `${e.name} ${e.value}`}
                >
                  {devices.map((d, i) => (
                    <Cell key={d.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top countries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Users</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countries.map((c) => (
                <TableRow key={c.country}>
                  <TableCell>{c.country}</TableCell>
                  <TableCell className="text-right">{c.users}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
