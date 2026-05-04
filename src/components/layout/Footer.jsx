import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-6 h-6 text-primary" />
              <span className="font-heading text-lg font-bold tracking-tight">
                INSTA<span className="text-primary">GYM</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Abu Dhabi's most reliable and community-driven training facility. Where every member is supported, challenged, and celebrated.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest text-primary mb-4">QUICK LINKS</h4>
            <div className="space-y-2">
              {[
                { label: 'Classes', path: '/classes' },
                { label: 'Trainers', path: '/trainers' },
                { label: 'Schedule', path: '/schedule' },
                { label: 'Membership', path: '/membership' },
                { label: 'Gallery', path: '/gallery' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest text-primary mb-4">SUPPORT</h4>
            <div className="space-y-2">
              {[
                { label: 'FAQ', path: '/faq' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'About', path: '/about' },
                { label: 'Dashboard', path: '/dashboard' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest text-primary mb-4">CONTACT</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+971 123 456</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@instagym.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Backside Big Mart, Sheikh Zayed Bin Sultan St, Al Zahiyah - E15, Abu Dhabi, UAE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 INSTA GYM. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            FORGED IN IRON. BUILT FOR PERFORMANCE.
          </p>
        </div>
      </div>
    </footer>
  );
}
