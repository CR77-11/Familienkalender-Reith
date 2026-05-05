export type FamilyMember = 'Annette' | 'Christian' | 'Henri' | 'Justus' | 'Greta';

export type EventCategory = 'Privat' | 'Beruf' | 'Schule' | 'Sport' | 'Familie';

export type Reminder = {
  type: 'push' | 'email';
  minutesBefore: number;
};

export type RepeatRule = {
  frequency: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval?: number;
  exceptDuringSchoolHolidays?: boolean;
};

export type CalendarEvent = {
  id: string;
  title: string;
  category: EventCategory;
  icon: string;
  members: FamilyMember[];
  start: Date;
  end: Date;
  allDay?: boolean;
  location?: string;
  notes?: string;
  reminders: Reminder[];
  repeat: RepeatRule;
  driverTo?: FamilyMember;
  driverFrom?: FamilyMember;
  createdBy: FamilyMember;
};
