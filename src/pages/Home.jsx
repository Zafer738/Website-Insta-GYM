import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';
import { base44 } from '@/api/base44Client';

const HERO_IMG = 'https://media.base44.com/images/public/69df3ef39cc317521483bade/f3f359f62_generated_e3ad44b9.png';

const features = [
  { icon: Zap, title: 'HIGH INTENSITY', desc: 'Push past your limits with our elite training programs designed for maximum results.' },
  { icon: Target, title: 'EXPERT COACHING', desc: 'Certified trainers with years of experience to guide every rep and every set.' },
  { icon: Users, title: 'COMMUNITY', desc: 'Train alongside driven athletes who share your passion for peak performance.' },
  { icon: Clock, title: 'FLEXIBLE SCHEDULE', desc: 'Classes and sessions available from early morning to late night, 7 days a week.' },
];

const classCategories = [
  { name: 'YOGA', cat: 'yoga', img: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/764f7fdeb_generated_63114f11.png' },
  { name: 'HIIT', cat: 'hiit', img: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/c36470efb_generated_73ac97ec.png' },
  { name: 'STRENGTH', cat: 'strength_training', img: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/3126b87da_generated_56b2dcec.png' },
  { name: 'CARDIO', cat: 'cardio', img: 'https://media.base44.com/images/public/69df3ef39cc317521483bade/95872a1e4_generated_1b038411.png' },
];

export default function Home() {
  const navigate = useNavigate();

  const handleMembershipClick = async () => {
    const isAuth = await base44.auth.isAuthenticated();
    if (isAuth) {
      navigate('/membership');
    } else {
      base44.auth.redirectToLogin('/membership');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Industrial gym interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-widest text-primary mb-6">
              // WELCOME TO INSTA GYM
            </p>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-8xl font-bold uppercase tracking-tighter text-foreground leading-none">
              SURPASS<br />
              YOUR <span className="text-primary">LIMITS</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
              Abu Dhabi's most trusted training facility — where raw intensity meets structured discipline. Your transformation starts here in Al Zahiyah.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleMembershipClick} size="lg" className="font-heading text-sm tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                JOIN NOW <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Link to="/classes">
                <Button size="lg" variant="outline" className="font-heading text-sm tracking-wider border-border hover:border-accent hover:text-accent px-8">
                  EXPLORE CLASSES
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 border border-border bg-background group hover:border-primary transition-colors"
              >
                <f.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading text-sm font-bold tracking-wider mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Categories */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="// PROGRAMS"
            title="CHOOSE YOUR DISCIPLINE"
            subtitle="From the meditative focus of yoga to the explosive power of HIIT, find the class that matches your ambition."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {classCategories.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/classes?category=${c.cat}`}
                  className="group relative block aspect-[3/4] overflow-hidden border border-border"
                >
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">{c.name}</h3>
                    <span className="text-primary text-sm font-mono flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// READY?</p>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              YOUR NEXT LEVEL<br />STARTS <span className="text-primary">TODAY</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
              Join a thriving community of dedicated members at Insta Gym Abu Dhabi. View our membership plans and be part of something greater.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleMembershipClick} size="lg" className="font-heading text-sm tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                VIEW MEMBERSHIP PLANS
              </Button>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="font-heading text-sm tracking-wider border-border hover:border-accent px-8">
                  SEE SCHEDULE
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
