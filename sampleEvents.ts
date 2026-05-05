import { CalendarEvent } from '../types/calendar';

const day = 5;
const month = 4; // May, zero-based
const year = 2026;

export const sampleEvents: CalendarEvent[] = [
  {
    id: 'schule-henri',
    title: 'Schule',
    category: 'Schule',
    icon: '🎒',
    members: ['Henri'],
    start: new Date(year, month, day, 7, 30),
    end: new Date(year, month, day, 13, 0),
    location: 'Schule',
    reminders: [{ type: 'push', minutesBefore: 30 }],
    repeat: { frequency: 'weekly', exceptDuringSchoolHolidays: true },
    createdBy: 'Annette'
  },
  {
    id: 'kunde-christian',
    title: 'Kundentermin',
    category: 'Beruf',
    icon: '💼',
    members: ['Christian'],
    start: new Date(year, month, day, 8, 15),
    end: new Date(year, month, day, 9, 30),
    location: 'Büro',
    reminders: [{ type: 'push', minutesBefore: 60 }],
    repeat: { frequency: 'none' },
    createdBy: 'Christian'
  },
  {
    id: 'klavier-greta',
    title: 'Klavierunterricht',
    category: 'Privat',
    icon: '🎹',
    members: ['Greta'],
    start: new Date(year, month, day, 14, 30),
    end: new Date(year, month, day, 15, 15),
    location: 'Musikschule Speyer',
    notes: 'Notenmappe mitnehmen',
    reminders: [{ type: 'push', minutesBefore: 60 }],
    repeat: { frequency: 'weekly' },
    driverTo: 'Annette',
    createdBy: 'Annette'
  },
  {
    id: 'fussball-justus',
    title: 'Fußballtraining',
    category: 'Sport',
    icon: '⚽',
    members: ['Justus'],
    start: new Date(year, month, day, 16, 0),
    end: new Date(year, month, day, 17, 30),
    location: 'Sportplatz Mainz',
    notes: 'Trikot + Trinkflasche mitnehmen',
    reminders: [{ type: 'push', minutesBefore: 60 }],
    repeat: { frequency: 'weekly' },
    driverTo: 'Christian',
    driverFrom: 'Annette',
    createdBy: 'Christian'
  },
  {
    id: 'abendessen',
    title: 'Gemeinsames Abendessen',
    category: 'Familie',
    icon: '👨‍👩‍👧‍👦',
    members: ['Annette', 'Christian', 'Henri', 'Justus', 'Greta'],
    start: new Date(year, month, day, 18, 30),
    end: new Date(year, month, day, 19, 15),
    location: 'Zuhause',
    reminders: [],
    repeat: { frequency: 'none' },
    createdBy: 'Annette'
  }
];
