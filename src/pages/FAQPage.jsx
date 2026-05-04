import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
  const { data: faqs = [] } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => base44.entities.FAQ.list(),
  });

  const sorted = [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div>
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// QUESTIONS?</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              FREQUENTLY ASKED<br /><span className="text-primary">QUESTIONS</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Everything you need to know about Insta Gym. Can't find your answer? Contact us directly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {sorted.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-3">
              {sorted.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <AccordionItem value={faq.id} className="border border-border bg-card px-6">
                    <AccordionTrigger className="font-heading text-sm font-bold tracking-tight text-foreground hover:text-primary py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-20">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-heading">FAQ content is being prepared.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
