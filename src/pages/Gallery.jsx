import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FACILITY_IMG = 'https://media.base44.com/images/public/69df3ef39cc317521483bade/a9502ddb5_generated_f3eb6278.png';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: images = [] } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: () => base44.entities.GalleryImage.list(),
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const categories = ['all', 'facility', 'training', 'events', 'equipment'];
  const filtered = activeFilter === 'all' ? images : images.filter(img => img.category === activeFilter);

  return (
    <div>
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// THE FACILITY</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              <span className="text-primary">GALLERY</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Explore our industrial-grade training facility. 15,000 square feet of raw iron and concrete, built for performance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex gap-2 mb-8 sm:mb-12 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeFilter === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(cat)}
                className={`font-heading text-xs tracking-wider ${
                  activeFilter === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {cat.toUpperCase()}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer border border-border overflow-hidden"
                onClick={() => setSelectedImage(img)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-heading text-xs sm:text-sm font-bold text-foreground truncate">{img.title}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{img.category?.toUpperCase()}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-heading">Gallery images are being added.</p>
            </div>
          )}

          {/* Gym Location */}
          <div className="mt-12 sm:mt-20 border border-border p-5 sm:p-8 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-bold text-foreground">GYM LOCATION</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <iframe
                  title="Insta Gym Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.0!2d54.3696!3d24.4896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sInsta+Gym+Abu+Dhabi!5e0!3m2!1sen!2sae!4v1"
                  className="w-full aspect-video border border-border"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conveniently located in Al Zahiyah, Abu Dhabi — easily accessible with parking nearby. Open around the clock, every day of the year.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground font-mono">
                  <p>Backside Big Mart</p>
                  <p>Sheikh Zayed Bin Sultan St, Al Zahiyah - E15</p>
                  <p>Abu Dhabi, UAE</p>
                  <p className="text-primary mt-2">Open 24 Hours — 7 Days a Week</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Al+Zahiyah+Sheikh+Zayed+Bin+Sultan+St+Abu+Dhabi+UAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-heading tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors w-fit"
                >
                  <ExternalLink className="w-4 h-4" /> OPEN IN GOOGLE MAPS
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
