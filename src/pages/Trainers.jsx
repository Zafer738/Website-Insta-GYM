import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Trainers() {
  const { data: trainers = [] } = useQuery({
    queryKey: ['trainers'],
    queryFn: () => base44.entities.Trainer.list(),
  });

  return (
    <div>
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// OUR TEAM</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              PERSONAL <span className="text-primary">TRAINERS</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Our certified experts bring years of experience and specialized knowledge to guide every step of your journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {trainers.map((trainer, i) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/trainers/${trainer.id}`}
                  className="group block border border-border bg-card overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={trainer.photo_url || 'https://media.base44.com/images/public/69df3ef39cc317521483bade/0c70d95ac_generated_c0992114.png'}
                      alt={trainer.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-heading text-sm sm:text-lg font-bold tracking-tight text-foreground">{trainer.name}</h3>
                    <p className="text-xs sm:text-sm text-primary font-mono mt-1">{trainer.specialty}</p>
                    {trainer.experience_years && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground font-mono">
                        <Award className="w-3 h-3" /> {trainer.experience_years} YEARS EXPERIENCE
                      </div>
                    )}
                    <span className="flex items-center gap-1 text-xs text-primary font-heading tracking-wider mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      VIEW PROFILE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {trainers.length === 0 && (
            <div className="text-center py-20">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-heading">Our trainer profiles are being updated.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}