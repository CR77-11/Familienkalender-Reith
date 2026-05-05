import React, { useMemo, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { KitchenDashboard } from './src/components/KitchenDashboard';
import { sampleEvents } from './src/data/sampleEvents';
import { FamilyMember } from './src/types/calendar';
import { isSameCalendarDay } from './src/utils/date';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 5));
  const [selectedMember, setSelectedMember] = useState<FamilyMember | 'Alle'>('Alle');

  const visibleEvents = useMemo(() => {
    return sampleEvents
      .filter((event) => isSameCalendarDay(event.start, selectedDate))
      .filter((event) => {
        if (selectedMember === 'Alle') return true;
        return event.members.includes(selectedMember) || event.driverTo === selectedMember || event.driverFrom === selectedMember;
      })
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [selectedDate, selectedMember]);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <KitchenDashboard
        calendarName="Familienkalender Reith"
        selectedDate={selectedDate}
        selectedMember={selectedMember}
        events={visibleEvents}
        onSelectMember={setSelectedMember}
        onToday={() => setSelectedDate(new Date(2026, 4, 5))}
        onPreviousDay={() => setSelectedDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1))}
        onNextDay={() => setSelectedDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1))}
      />
    </SafeAreaProvider>
  );
}
