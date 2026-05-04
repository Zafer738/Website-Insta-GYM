import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TrainerDetail() {
  const trainerId = window.location.pathname.split('/').pop();

  const { data: trainers = [] } = useQuery({
    queryKey: ['trainers'],
    queryFn: () => base44.entities.Trainer.list(),
  });

  const trainer = trainers.find(t => t.id === trainerId);

  if (!trainer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading trainer profile...</p>
      </div>
    );
  }

  return (
    <div>
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/trainers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> BACK TO TRAINERS
            </Link>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// TRAINER PROFILE</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              {trainer.name}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="max-w-sm mx-auto lg:max-w-none">
              <img
                src={trainer.photo_url || 'https://media.base44.com/images/public/69df3ef39cc317521483bade/0c70d95ac_generated_c0992114.png'}
                alt={trainer.name}
                className="w-full aspect-[3/4] object-cover border border-border"
              />
            </div>

            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div>
                <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-primary mb-2">SPECIALTY</h2>
                <p className="text-xl text-foreground font-heading">{trainer.specialty}</p>
              </div>

              {trainer.experience_years && (
                <div className="flex items-center gap-3 p-4 border border-border bg-card">
                  <Award className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-mono text-2xl font-bold text-foreground">{trainer.experience_years}</p>
                    <p className="text-xs text-muted-foreground font-heading tracking-wider">YEARS OF EXPERIENCE</p>
                  </div>
                </div>
              )}

              {trainer.bio && (
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-primary mb-3">ABOUT</h3>
                  <p className="text-muted-foreground leading-relaxed">{trainer.bio}</p>
                </div>
              )}

              {trainer.certifications && trainer.certifications.length > 0 && (
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-primary mb-3">
                    EXPERIENCE & CERTIFICATIONS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert, i) => (
                      <Badge key={i} variant="outline" className="font-mono text-xs border-accent text-accent">
                        <Shield className="w-3 h-3 mr-1" /> {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Link to={`/book-session?trainer=${trainer.id}&trainerName=${encodeURIComponent(trainer.name)}`}>
                <Button className="font-heading text-sm tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                  BOOK THIS TRAINER <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
