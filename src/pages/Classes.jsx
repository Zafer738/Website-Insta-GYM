import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Zap, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SectionHeading from '@/components/ui/SectionHeading';

const categoryImages = {
  yoga: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/764f7fdeb_generated_63114f11.png',
  hiit: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/c36470efb_generated_73ac97ec.png',
  strength_training: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/3126b87da_generated_56b2dcec.png',
  cardio: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/95872a1e4_generated_1b038411.png',
};

const categoryLabels = {
  yoga: 'YOGA',
  hiit: 'HIIT',
  strength_training: 'STRENGTH',
  cardio: 'CARDIO',
};

const categories = ['all', 'yoga', 'hiit', 'strength_training', 'cardio'];

export default function Classes() {
  const urlParams = new URLSearchParams(useLocation().search);
  const initialCat = urlParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const { data: classes = [] } = useQuery({
    queryKey: ['gymClasses'],
    queryFn: () => base44.entities.GymClass.list(),
  });

  const filtered = activeCategory === 'all'
    ? classes
    : classes.filter(c => c.category === activeCategory);

  return (
    <div>
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// OUR PROGRAMS</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              CLASSES & <span className="text-primary">PROGRAMS</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              From yoga to high-intensity interval training, find the discipline that fuels your fire.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-8 sm:mb-12 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`font-heading text-xs tracking-wider ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {cat === 'all' ? 'ALL' : categoryLabels[cat]}
              </Button>
            ))}
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/classes/${cls.id}`}
                  className="group block border border-border bg-card overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={cls.image_url || categoryImages[cls.category] || categoryImages.hiit}
                      alt={cls.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="font-mono text-xs border-primary text-primary">
                        {categoryLabels[cls.category] || cls.category?.toUpperCase()}
                      </Badge>
                      {cls.intensity && (
                        <Badge variant="outline" className="font-mono text-xs border-accent text-accent">
                          {cls.intensity.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-foreground mb-2">
                      {cls.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {cls.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      {cls.duration_minutes && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                          <Clock className="w-3 h-3" /> {cls.duration_minutes} MIN
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-primary font-heading tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        VIEW DETAILS <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-heading">No classes found in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
