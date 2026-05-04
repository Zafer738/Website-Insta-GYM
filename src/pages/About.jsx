import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Award, Users, Clock } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const ABOUT_IMG = 'https://media.base44.com/images/public/69df3ef39cc317521483bade/48afc9034_generated_f7a855fe.png';

const stats = [
  { value: '400+', label: 'MEMBERS', icon: Users },
  { value: '50+', label: 'CLASSES/WEEK', icon: Clock },
  { value: '10+', label: 'EXPERT TRAINERS', icon: Award },
  { value: '15K', label: 'SQ FT FACILITY', icon: Dumbbell },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_IMG} alt="Chalk-covered hands gripping barbell" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// ABOUT INSTA GYM</p>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-foreground">
              FORGED IN <span className="text-primary">IRON</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={ABOUT_IMG} alt="Training intensity" className="w-full aspect-[4/3] object-cover border border-border" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="font-mono text-xs tracking-widest text-primary mb-4">// OUR STORY</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-6">
                MORE THAN A GYM
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Insta Gym was born from a simple belief: Abu Dhabi deserves a world-class training facility that doesn't compromise. 
                  Located in the heart of Al Zahiyah, we built a space where serious athletes and beginners alike come to transform.
                </p>
                <p>
                  Our industrial-grade facility features 15,000 square feet of premium equipment, 
                  from Olympic lifting platforms to cutting-edge cardio machines. Conveniently located 
                  backside Big Mart on Sheikh Zayed Bin Sultan St — easy to find, impossible to leave unchanged.
                </p>
                <p>
                  With 10-13 certified trainers and 50+ weekly classes spanning yoga, HIIT, 
                  strength training, and cardio, Insta Gym is recognized as one of Abu Dhabi's most 
                  reliable, welcoming, and community-driven fitness destinations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 border border-border bg-background"
              >
                <s.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="font-mono text-3xl sm:text-4xl font-bold text-foreground">{s.value}</p>
                <p className="font-heading text-xs tracking-widest text-muted-foreground mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Walkthrough */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="// GYM WALKTHROUGH"
            title="SEE IT FOR YOURSELF"
            subtitle="Take a tour of our facility and see what makes Insta Gym Abu Dhabi stand out."
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="border border-border overflow-hidden w-full max-w-sm">
              <video
                src="https://media.base44.com/videos/public/69df3ef39cc317521483bade/26b6462b9_instagymVIDEO.mp4"
                controls
                className="w-full"
                poster={ABOUT_IMG}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading
            label="// OUR MISSION"
            title="BUILT FOR PERFORMANCE"
            subtitle="We exist to provide the ultimate training environment — one that challenges you, supports you, and drives you toward your peak physical potential. No shortcuts. No excuses. Just results."
          />
        </div>
      </section>
    </div>
  );
}
