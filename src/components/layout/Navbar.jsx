import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CLASSES', path: '/classes' },
  { label: 'TRAINERS', path: '/trainers' },
  { label: 'SCHEDULE', path: '/schedule' },
  { label: 'MEMBERSHIP', path: '/membership' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'FAQ', path: '/faq' },
  { label: 'CONTACT', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="w-7 h-7 text-primary" />
            <span className="font-heading text-xl font-bold tracking-tight text-foreground">
              INSTA<span className="text-primary">GYM</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-xs font-heading font-medium tracking-widest transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="font-heading text-xs tracking-wider border-border hover:border-primary hover:text-primary">
                DASHBOARD
              </Button>
            </Link>
            <Link to="/membership">
              <Button size="sm" className="font-heading text-xs tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground">
                JOIN NOW
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-sm font-heading tracking-wider ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex gap-2">
                <Link to="/dashboard" onClick={() => setOpen(false)} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full font-heading text-xs tracking-wider">
                    DASHBOARD
                  </Button>
                </Link>
                <Link to="/membership" onClick={() => setOpen(false)} className="flex-1">
                  <Button size="sm" className="w-full font-heading text-xs tracking-wider bg-primary text-primary-foreground">
                    JOIN NOW
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
