import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, User, Settings, Activity, Award, Clock, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me()
      .then(u => { setUser(u); setAuthChecked(true); })
      .catch(() => { base44.auth.redirectToLogin('/dashboard'); });
  }, []);

  const { data: bookings = [] } = useQuery({
    queryKey: ['myBookings'],
    queryFn: () => base44.entities.ClassBooking.list('-created_date', 50),
  });

  const { data: plans = [] } = useQuery({
    queryKey: ['membershipPlans'],
    queryFn: () => base44.entities.MembershipPlan.list(),
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => base44.entities.ClassBooking.update(id, { status: 'cancelled' }),
    onSuccess: () => {
      toast.success('Booking cancelled.');
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
    },
  });

  const activeBookings = bookings.filter(b => b.status === 'confirmed');
  const totalSessions = bookings.filter(b => b.status === 'confirmed').length;

  if (!authChecked) return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <section className="py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// MEMBER PORTAL</p>
            <h1 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tighter text-foreground">
              MEMBER <span className="text-primary">DASHBOARD</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Welcome back{user?.full_name ? `, ${user.full_name}` : ''}. Track your progress and manage your sessions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: 'ACTIVE BOOKINGS', value: activeBookings.length, icon: Calendar },
              { label: 'TOTAL SESSIONS', value: totalSessions, icon: Activity },
              { label: 'MEMBER SINCE', value: user?.created_date ? new Date(user.created_date).getFullYear() : '—', icon: Award },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-border bg-card"
              >
                <stat.icon className="w-5 h-5 text-primary mb-3" />
                <p className="font-mono text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="font-heading text-xs tracking-widest text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bookings" className="space-y-8">
            <TabsList className="bg-card border border-border p-1 h-auto">
              <TabsTrigger value="bookings" className="font-heading text-xs tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar className="w-4 h-4 mr-2" /> VIEW BOOKINGS
              </TabsTrigger>
              <TabsTrigger value="membership" className="font-heading text-xs tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CreditCard className="w-4 h-4 mr-2" /> MEMBERSHIP
              </TabsTrigger>
              <TabsTrigger value="profile" className="font-heading text-xs tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings className="w-4 h-4 mr-2" /> PROFILE & SETTINGS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <div className="space-y-3">
                {activeBookings.length > 0 ? activeBookings.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border border-border bg-card"
                  >
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{booking.class_name}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground font-mono">
                        {booking.day_of_week && <span>{booking.day_of_week.toUpperCase()}</span>}
                        {booking.time_slot && <span>{booking.time_slot}</span>}
                        {booking.trainer_name && <span>• {booking.trainer_name}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-xs border-accent text-accent">
                        {booking.status?.toUpperCase()}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelMutation.mutate(booking.id)}
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> CANCEL
                      </Button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-20 border border-border">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-heading mb-4">No active bookings.</p>
                    <Link to="/schedule">
                      <Button className="font-heading text-xs tracking-wider bg-primary text-primary-foreground">
                        BOOK A CLASS
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="membership">
              <div className="border border-border bg-card p-8">
                <h3 className="font-heading text-lg font-bold text-foreground mb-6">YOUR MEMBERSHIP</h3>
                <p className="text-muted-foreground mb-6">
                  View and manage your membership plan. Upgrade or renew anytime.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {plans.map(plan => (
                    <div key={plan.id} className={`p-6 border ${plan.is_popular ? 'border-primary' : 'border-border'} bg-background`}>
                      <p className="font-heading text-xs tracking-widest text-muted-foreground">{plan.tier?.toUpperCase()}</p>
                      <p className="font-heading text-lg font-bold text-foreground mt-1">{plan.name}</p>
                      <p className="font-mono text-2xl font-bold text-primary mt-2">AED {plan.price_monthly}<span className="text-xs text-muted-foreground">{plan.tier === 'basic' ? '/month' : plan.tier === 'standard' ? '/3 months' : '/year'}</span></p>
                    </div>
                  ))}
                </div>
                <Link to="/membership" className="inline-block mt-6">
                  <Button variant="outline" className="font-heading text-xs tracking-wider border-primary text-primary">
                    MEMBERSHIP RENEWAL
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="border border-border bg-card p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> PERSONAL INFO
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="font-heading text-xs tracking-wider text-muted-foreground">FULL NAME</Label>
                      <Input value={user?.full_name || ''} disabled className="mt-2 bg-background border-border" />
                    </div>
                    <div>
                      <Label className="font-heading text-xs tracking-wider text-muted-foreground">EMAIL</Label>
                      <Input value={user?.email || ''} disabled className="mt-2 bg-background border-border" />
                    </div>
                  </div>
                </div>

                <div className="border border-border bg-card p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" /> PAYMENT DETAILS
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Payment information is securely managed through your membership portal. Contact support for billing inquiries.
                  </p>
                  <Link to="/contact" className="inline-block mt-4">
                    <Button variant="outline" size="sm" className="font-heading text-xs tracking-wider">
                      CONTACT SUPPORT
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  variant="outline"
                  onClick={() => base44.auth.logout()}
                  className="font-heading text-xs tracking-wider border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" /> SIGN OUT
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
