import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Clock, User, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayLabels = { monday: 'MON', tuesday: 'TUE', wednesday: 'WED', thursday: 'THU', friday: 'FRI', saturday: 'SAT', sunday: 'SUN' };

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('monday');

  const queryClient = useQueryClient();

  const { data: slots = [] } = useQuery({
    queryKey: ['scheduleSlots'],
    queryFn: () => base44.entities.ScheduleSlot.list(),
  });

  const bookMutation = useMutation({
    mutationFn: (slot) => base44.entities.ClassBooking.create({
      class_name: slot.class_name,
      trainer_name: slot.trainer_name,
      schedule_slot_id: slot.id,
      day_of_week: slot.day_of_week,
      time_slot: `${slot.start_time} - ${slot.end_time}`,
      status: 'confirmed',
      member_email: 'member@voltfit.com',
    }),
    onSuccess: () => {
      toast.success('Spot reserved! See you there.');
      queryClient.invalidateQueries({ queryKey: ['scheduleSlots'] });
    },
  });

  const daySlots = slots
    .filter(s => s.day_of_week === activeDay)
    .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''));

  return (
    <div>
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-widest text-primary mb-4">// WEEKLY TIMETABLE</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
              CLASS <span className="text-primary">SCHEDULE</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              View our weekly class timetable and reserve your spot. Available classes update in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Day Selector */}
          <div className="flex gap-1.5 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none">
            {days.map(day => (
              <Button
                key={day}
                variant={activeDay === day ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveDay(day)}
                className={`font-heading text-xs tracking-wider min-w-[52px] flex-shrink-0 ${
                  activeDay === day
                    ? 'bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {dayLabels[day]}
              </Button>
            ))}
          </div>

          {/* Slots */}
          <div className="space-y-3">
            {daySlots.map((slot, i) => {
              const spotsLeft = (slot.spots_available ?? slot.max_spots ?? 20);
              const isFull = spotsLeft <= 0;
              const isAlmostFull = spotsLeft > 0 && spotsLeft <= 3;

              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-6 border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-center min-w-[70px]">
                      <p className="font-mono text-lg font-bold text-foreground">{slot.start_time}</p>
                      <p className="font-mono text-xs text-muted-foreground">{slot.end_time}</p>
                    </div>
                    <div className="w-px h-10 bg-border hidden sm:block" />
                    <div>
                      <h3 className="font-heading text-base font-bold text-foreground">{slot.class_name}</h3>
                      {slot.trainer_name && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <User className="w-3 h-3" /> {slot.trainer_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    {slot.max_spots && (
                      <Badge
                        variant="outline"
                        className={`font-mono text-xs ${
                          isFull
                            ? 'border-destructive text-destructive'
                            : isAlmostFull
                            ? 'border-primary text-primary'
                            : 'border-accent text-accent'
                        }`}
                      >
                        <Users className="w-3 h-3 mr-1" />
                        {isFull ? 'FULL' : `${spotsLeft} SPOTS`}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      disabled={isFull || bookMutation.isPending}
                      onClick={() => bookMutation.mutate(slot)}
                      className="font-heading text-xs tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                    >
                      {isFull ? 'FULL' : 'RESERVE SPOT'}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {daySlots.length === 0 && (
            <div className="text-center py-20 border border-border">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-heading">No classes scheduled for {activeDay.charAt(0).toUpperCase() + activeDay.slice(1)}.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
