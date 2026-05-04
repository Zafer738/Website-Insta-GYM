import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Clock, Zap, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categoryImages = {
  yoga: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/764f7fdeb_generated_63114f11.png',
  hiit: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/c36470efb_generated_73ac97ec.png',
  strength_training: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/3126b87da_generated_56b2dcec.png',
  cardio: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/95872a1e4_generated_1b038411.png',
};

export default function ClassDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const classId = window.location.pathname.split('/').pop();

  const { data: classes = [] } = useQuery({
    queryKey: ['gymClasses'],
    queryFn: () => base44.entities.GymClass.list(),
  });

  const { data: trainers = [] } = useQuery({
    queryKey: ['trainers'],
    queryFn: () => base44.entities.Trainer.list(),
  });

  const cls = classes.find(c => c.id === classId);

  if (!cls) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading class details...</p>
        </div>
      </div>
    );
  }

  const trainer = trainers.find(t => t.id === cls.trainer_id);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cls.image_url || categoryImages[cls.category] || categoryImages.hiit}
            alt={cls.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/classes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> BACK TO CLASSES
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="font-mono text-xs border-primary text-primary">
                {cls.category?.replace(/_/g, ' ').toUpperCase()}
              </Badge>
              {cls.intensity && (
                <Badge variant="outline" className="font-mono text-xs border-accent text-accent">
                  {cls.intensity.toUpperCase()}
                </Badge>
              )}
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              {cls.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="py-10 sm:py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4">ABOUT THIS CLASS</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {cls.description || 'An intense training session designed to push your limits and deliver real results. Join us and experience the power of focused, expert-led training.'}
              </p>

              {trainer && (
                <div className="mt-12">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-primary mb-4">YOUR TRAINER</h3>
                  <div className="flex items-center gap-4 p-4 border border-border bg-card">
                    {trainer.photo_url && (
                      <img src={trainer.photo_url} alt={trainer.name} className="w-16 h-16 object-cover border border-border" />
                    )}
                    <div>
                      <p className="font-heading font-bold text-foreground">{trainer.name}</p>
                      <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
                    </div>
                    <Link to={`/trainers/${trainer.id}`} className="ml-auto">
                      <Button variant="outline" size="sm" className="font-heading text-xs tracking-wider">
                        VIEW PROFILE
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="border border-border bg-card p-6 space-y-4">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-primary">CLASS INFO</h3>
                {cls.duration_minutes && (
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-mono text-foreground">{cls.duration_minutes} MIN</span>
                  </div>
                )}
                {cls.intensity && (
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Intensity:</span>
                    <span className="font-mono text-foreground">{cls.intensity.toUpperCase()}</span>
                  </div>
                )}
                {cls.max_capacity && (
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Max Capacity:</span>
                    <span className="font-mono text-foreground">{cls.max_capacity}</span>
                  </div>
                )}
              </div>

              <Link to={`/book-session?class=${cls.id}&className=${encodeURIComponent(cls.name)}`}>
                <Button className="w-full font-heading text-sm tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground">
                  BOOK A SESSION <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
