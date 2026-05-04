import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const sendMutation = useMutation({
    mutationFn: (data) => base44.entities.ContactMessage.create(data),
    onSuccess: () => {
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMutation.mutate(form);
  };

  return (
    <div>
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// GET IN TOUCH</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              CONTACT <span className="text-primary">US</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Have a question or ready to start? Reach out — our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground">PHONE & EMAIL</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 border border-border bg-card">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">PHONE</p>
                    <p className="text-muted-foreground mt-1">+971 123 456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 border border-border bg-card">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">EMAIL</p>
                    <p className="text-muted-foreground mt-1">info@instagym.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 border border-border bg-card">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">LOCATION</p>
                    <p className="text-muted-foreground mt-1">Backside Big Mart<br />Sheikh Zayed Bin Sultan St, Al Zahiyah - E15<br />Abu Dhabi, UAE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 border border-border bg-card">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">HOURS</p>
                    <p className="text-muted-foreground mt-1">Open 24 Hours, 7 Days a Week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground mb-8">SEND A MESSAGE</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-muted-foreground">NAME</Label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="mt-2 bg-card border-border focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-muted-foreground">EMAIL</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="mt-2 bg-card border-border focus:border-primary"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-heading text-xs tracking-wider text-muted-foreground">SUBJECT</Label>
                  <Input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="mt-2 bg-card border-border focus:border-primary"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <Label className="font-heading text-xs tracking-wider text-muted-foreground">MESSAGE</Label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={6}
                    className="mt-2 bg-card border-border focus:border-primary"
                    placeholder="Write your message..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sendMutation.isPending}
                  className="w-full font-heading text-sm tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {sendMutation.isPending ? 'SENDING...' : 'SEND MESSAGE'} <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
