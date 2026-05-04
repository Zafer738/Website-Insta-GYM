import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const tierOrder = { basic: 0, standard: 1, premium: 2 };

export default function MembershipPlans() {
  const { data: plans = [] } = useQuery({
    queryKey: ['membershipPlans'],
    queryFn: () => base44.entities.MembershipPlan.list(),
  });

  const sorted = [...plans].sort((a, b) => (tierOrder[a.tier] ?? 0) - (tierOrder[b.tier] ?? 0));

  const handleSelect = async (plan) => {
    toast.success(`${plan.name} selected! Welcome to VoltFit.`);
  };

  return (
    <div>
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// INVEST IN YOURSELF</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              MEMBERSHIP <span className="text-primary">PLANS</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Three tiers engineered for different levels of commitment. Choose the plan that matches your ambition.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:border md:border-border">
            {sorted.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`p-6 sm:p-8 lg:p-12 flex flex-col ${
                  plan.is_popular
                    ? 'bg-card border-2 border-primary shadow-[0_0_40px_rgba(255,95,31,0.15)] relative'
                    : 'bg-background border border-border md:border-r md:border-t-0 md:border-b-0 md:border-l-0 md:last:border-r-0'
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground font-heading text-xs tracking-wider px-4 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3" /> MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <p className="font-heading text-xs tracking-widest text-muted-foreground uppercase mb-2">
                    {plan.tier}
                  </p>
                  <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">
                    {plan.name}
                  </h2>
                </div>

                <div className="mb-6 sm:mb-8">
                  <span className="font-mono text-4xl sm:text-5xl font-bold text-foreground">
                    AED {plan.price_monthly}
                  </span>
                  <span className="text-muted-foreground text-sm font-mono">
                    {plan.tier === 'basic' ? '/month' : plan.tier === 'standard' ? '/3 months' : '/year'}
                  </span>
                </div>

                <div className="flex-1 space-y-3 mb-8">
                  {(plan.features || []).map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSelect(plan)}
                  className={`w-full font-heading text-sm tracking-wider ${
                    plan.is_popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  SELECT PLAN <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-heading">Membership plans are being configured.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
