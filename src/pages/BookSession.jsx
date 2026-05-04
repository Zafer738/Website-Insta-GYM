import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, User, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const steps = ['SELECT CLASS', 'SELECT TRAINER', 'CHOOSE TIME', 'CONFIRM'];

export default function BookSession() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedClass = urlParams.get('className') || '';
  const preselectedTrainer = urlParams.get('trainerName') || '';

  const [step, setStep] = useState(preselectedClass ? (preselectedTrainer ? 2 : 1) : 0);
  const [selectedClass, setSelectedClass] = useState(preselectedClass);
  const [selectedTrainer, setSelectedTrainer] = useState(preselectedTrainer);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const { data: classes = [] } = useQuery({
    queryKey: ['gymClasses'],
    queryFn: () => base44.entities.GymClass.list(),
  });

  const { data: trainers = [] } = useQuery({
    queryKey: ['trainers'],
    queryFn: () => base44.entities.Trainer.list(),
  });

  const { data: slots = [] } = useQuery({
    queryKey: ['scheduleSlots'],
    queryFn: () => base44.entities.ScheduleSlot.list(),
  });

  const bookMutation = useMutation({
    mutationFn: (data) => base44.entities.ClassBooking.create(data),
    onSuccess: () => {
      setConfirmed(true);
      toast.success('Session booked successfully!');
    },
  });

  const filteredSlots = slots.filter(s => {
    const matchClass = !selectedClass || s.class_name === selectedClass;
    const matchTrainer = !selectedTrainer || s.trainer_name === selectedTrainer;
    return matchClass && matchTrainer;
  });

  const handleConfirm = () => {
    bookMutation.mutate({
      class_name: selectedClass,
      trainer_name: selectedTrainer,
      schedule_slot_id: selectedSlot?.id,
      day_of_week: selectedSlot?.day_of_week,
      time_slot: selectedSlot ? `${selectedSlot.start_time} - ${selectedSlot.end_time}` : '',
      status: 'confirmed',
      member_email: 'member@voltfit.com',
    });
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase text-foreground mb-4">SESSION CONFIRMED</h2>
          <div className="space-y-2 text-muted-foreground mb-8">
            <p className="font-mono">{selectedClass}</p>
            {selectedTrainer && <p className="font-mono">with {selectedTrainer}</p>}
            {selectedSlot && <p className="font-mono">{selectedSlot.day_of_week?.toUpperCase()} • {selectedSlot.start_time}</p>}
          </div>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="font-heading text-xs tracking-wider bg-primary text-primary-foreground">
                VIEW DASHBOARD
              </Button>
            </Link>
            <Link to="/schedule">
              <Button variant="outline" className="font-heading text-xs tracking-wider">
                BACK TO SCHEDULE
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-20 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/classes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> BACK
            </Link>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// BOOK A SESSION</p>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tighter text-foreground">
              TRAINER <span className="text-primary">BOOKING</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 flex items-center justify-center font-mono text-xs font-bold border ${
                  i <= step ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-heading tracking-wider hidden sm:block ${
                  i <= step ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {s}
                </span>
                {i < steps.length - 1 && <div className="w-8 lg:w-16 h-px bg-border mx-2" />}
              </div>
            ))}
          </div>

          {/* Step 0: Choose Class */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-foreground mb-6">CHOOSE YOUR CLASS</h2>
              {classes.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => { setSelectedClass(cls.name); setStep(1); }}
                  className={`w-full text-left p-6 border bg-card hover:border-primary transition-colors flex items-center justify-between ${
                    selectedClass === cls.name ? 'border-primary' : 'border-border'
                  }`}
                >
                  <div>
                    <p className="font-heading font-bold text-foreground">{cls.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{cls.category?.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 1: Select Trainer */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-foreground mb-6">SELECT TRAINER</h2>
              {trainers.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTrainer(t.name); setStep(2); }}
                  className={`w-full text-left p-6 border bg-card hover:border-primary transition-colors flex items-center gap-4 ${
                    selectedTrainer === t.name ? 'border-primary' : 'border-border'
                  }`}
                >
                  {t.photo_url && <img src={t.photo_url} alt={t.name} className="w-12 h-12 object-cover border border-border" />}
                  <div className="flex-1">
                    <p className="font-heading font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{t.specialty}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
              <Button variant="outline" onClick={() => setStep(0)} className="font-heading text-xs tracking-wider mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> BACK
              </Button>
            </motion.div>
          )}

          {/* Step 2: Choose Time Slot */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-foreground mb-6">CHOOSE TIME SLOT</h2>
              {filteredSlots.length > 0 ? filteredSlots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => { setSelectedSlot(slot); setStep(3); }}
                  className={`w-full text-left p-6 border bg-card hover:border-primary transition-colors flex items-center justify-between ${
                    selectedSlot?.id === slot.id ? 'border-primary' : 'border-border'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[60px]">
                      <p className="font-mono text-sm font-bold text-foreground">{slot.start_time}</p>
                      <p className="font-mono text-xs text-muted-foreground">{slot.end_time}</p>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground">{slot.class_name}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{slot.day_of_week?.toUpperCase()}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
              )) : (
                <div className="text-center py-12 border border-border">
                  <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No time slots available for this selection.</p>
                </div>
              )}
              <Button variant="outline" onClick={() => setStep(1)} className="font-heading text-xs tracking-wider mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> BACK
              </Button>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-heading text-lg font-bold text-foreground mb-6">CONFIRM SESSION</h2>
              <div className="border border-border bg-card p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground font-heading tracking-wider">CLASS</p>
                    <p className="font-heading font-bold text-foreground mt-1">{selectedClass}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-heading tracking-wider">TRAINER</p>
                    <p className="font-heading font-bold text-foreground mt-1">{selectedTrainer || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-heading tracking-wider">TIME</p>
                    <p className="font-heading font-bold text-foreground mt-1">
                      {selectedSlot ? `${selectedSlot.day_of_week?.toUpperCase()} ${selectedSlot.start_time}` : '—'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button variant="outline" onClick={() => setStep(2)} className="font-heading text-xs tracking-wider">
                    <ArrowLeft className="w-4 h-4 mr-2" /> BACK
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={bookMutation.isPending}
                    className="font-heading text-xs tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    {bookMutation.isPending ? 'BOOKING...' : 'CONFIRM BOOKING'} <Check className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
