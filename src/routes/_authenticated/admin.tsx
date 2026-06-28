import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { supabase } from "@/integrations/supabase/client";
import { getAdminStats, isCurrentUserAdmin } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Mytalora — AI Finds Jobs. We Handle Applies For You." }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const fetchStats = useServerFn(getAdminStats);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => setEmail(data.user?.email ?? ""));
  }, []);

  const adminCheck = useQuery({
    queryKey: ["is-admin"],
    queryFn: () => checkAdmin(),
  });

  const stats = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStats(),
    enabled: adminCheck.data?.isAdmin === true,
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (adminCheck.isLoading) {
    return <div className="p-8 text-muted-foreground">Loading…</div>;
  }

  if (adminCheck.data && !adminCheck.data.isAdmin) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-2xl font-semibold">Access denied</h1>
        <p className="mt-2 text-muted-foreground">
          Your account ({email}) does not have the <code>admin</code> role. Grant it in
          the database by inserting into <code>public.user_roles</code> with your user id and
          role <code>'admin'</code>.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Your user id: {adminCheck.data.userId}</p>
        <Button className="mt-6" variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </main>
    );
  }

  if (stats.isLoading || !stats.data) {
    return <div className="p-8 text-muted-foreground">Loading stats…</div>;
  }

  const s = stats.data;

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <Stat label="Total Leads" value={s.totals.leads} />
        <Stat label="Unique Visitors" value={s.totals.visitors} />
        <Stat label="Page Views" value={s.totals.pageViews} />
        <Stat label="Payments" value={s.totals.payments} />
        <Stat label="Conversion" value={`${s.totals.conversion}%`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Last 30 days</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={s.daily}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="leads" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Top Countries</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={s.countries}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="country" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Traffic Sources</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={s.sources}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="source" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent leads</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">When</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Plan</th>
                  <th className="py-2 pr-4">Lang</th>
                </tr>
              </thead>
              <tbody>
                {s.recentLeads.map((l: any) => (
                  <tr key={l.id} className="border-t">
                    <td className="py-2 pr-4 whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="py-2 pr-4">{l.name ?? "—"}</td>
                    <td className="py-2 pr-4">{l.email ?? "—"}</td>
                    <td className="py-2 pr-4">{l.phone ?? "—"}</td>
                    <td className="py-2 pr-4">{l.plan ?? "—"}</td>
                    <td className="py-2 pr-4">{l.lang ?? "—"}</td>
                  </tr>
                ))}
                {s.recentLeads.length === 0 && (
                  <tr><td colSpan={6} className="py-6 text-center text-muted-foreground">No leads yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="mt-1 text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
