import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalendarEvent, FamilyMember } from '../types/calendar';
import { familyMembers, memberColors } from '../data/family';
import { speyerWeather } from '../data/weather';
import { formatDateHeadline, formatTime, nextEventText } from '../utils/date';

type Props = {
  calendarName: string;
  selectedDate: Date;
  selectedMember: FamilyMember | 'Alle';
  events: CalendarEvent[];
  onSelectMember: (member: FamilyMember | 'Alle') => void;
  onToday: () => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
};

export function KitchenDashboard({
  calendarName,
  selectedDate,
  selectedMember,
  events,
  onSelectMember,
  onToday,
  onPreviousDay,
  onNextDay
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const now = new Date(2026, 4, 5, 13, 10);

  const nextEvent = useMemo(() => events.find((event) => event.start.getTime() >= now.getTime()), [events]);

  const morning = events.filter((event) => event.start.getHours() < 12);
  const afternoon = events.filter((event) => event.start.getHours() >= 12 && event.start.getHours() < 18);
  const evening = events.filter((event) => event.start.getHours() >= 18);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.calendarName}>{calendarName}</Text>
          <Text style={styles.date}>{formatDateHeadline(selectedDate)}</Text>
          <Text style={styles.today}>Heute</Text>
        </View>

        <View style={styles.weatherCard}>
          <Text style={styles.weatherTop}>{speyerWeather.icon} {speyerWeather.city} · {speyerWeather.currentTempC}°C</Text>
          <Text style={styles.weatherHint}>{speyerWeather.hint} · {speyerWeather.highC}° / {speyerWeather.lowC}°</Text>
        </View>
      </View>

      <View style={styles.filters}>
        {(['Alle', ...familyMembers] as Array<FamilyMember | 'Alle'>).map((member) => (
          <Pressable
            key={member}
            onPress={() => onSelectMember(member)}
            style={[styles.filterPill, selectedMember === member && styles.filterPillActive]}
          >
            <Text style={[styles.filterText, selectedMember === member && styles.filterTextActive]}>{member}</Text>
          </Pressable>
        ))}
        <View style={styles.dayButtons}>
          <Pressable style={styles.smallButton} onPress={onPreviousDay}><Text>←</Text></Pressable>
          <Pressable style={styles.smallButton} onPress={onToday}><Text>Heute</Text></Pressable>
          <Pressable style={styles.smallButton} onPress={onNextDay}><Text>→</Text></Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Section title="🌅 MORGEN" events={morning} onPress={setSelectedEvent} />
        <Section title="🌤️ NACHMITTAG" events={afternoon} onPress={setSelectedEvent} />
        <Section title="🌙 ABEND" events={evening} onPress={setSelectedEvent} />
      </ScrollView>

      <View style={styles.nextBar}>
        {nextEvent ? (
          <>
            <Text style={styles.nextLabel}>⏱️ NÄCHSTER TERMIN</Text>
            <Text style={styles.nextText}>{nextEvent.icon} {nextEvent.members[0]} – {nextEvent.title} {nextEventText(now, nextEvent.start)}</Text>
          </>
        ) : (
          <Text style={styles.nextText}>Für heute stehen keine weiteren Termine an.</Text>
        )}
      </View>

      <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </View>
  );
}

function Section({ title, events, onPress }: { title: string; events: CalendarEvent[]; onPress: (event: CalendarEvent) => void }) {
  if (events.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {events.map((event) => <EventRow key={event.id} event={event} onPress={() => onPress(event)} />)}
    </View>
  );
}

function EventRow({ event, onPress }: { event: CalendarEvent; onPress: () => void }) {
  const mainMember = event.members[0];
  const color = memberColors[mainMember] ?? '#777';
  const ride = event.driverTo || event.driverFrom
    ? `🚗 ${event.driverTo ?? ''}${event.driverFrom ? ` → ${event.driverFrom}` : ''}`
    : '';

  return (
    <Pressable style={styles.eventRow} onPress={onPress}>
      <View style={[styles.memberStripe, { backgroundColor: color }]} />
      <Text style={styles.time}>{formatTime(event.start)}</Text>
      <View style={styles.eventBody}>
        <Text style={styles.eventTitle}>{event.icon} {event.members.length > 1 ? 'Familie' : mainMember}</Text>
        <Text style={styles.eventSubtitle}>{event.title}</Text>
        {ride ? <Text style={styles.ride}>{ride}</Text> : null}
      </View>
    </Pressable>
  );
}

function EventDetails({ event, onClose }: { event: CalendarEvent | null; onClose: () => void }) {
  return (
    <Modal transparent visible={Boolean(event)} animationType="fade">
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        {event ? (
          <Pressable style={styles.detailCard}>
            <Text style={styles.detailTitle}>{event.icon} {event.title}</Text>
            <Text style={styles.detailLine}>👤 {event.members.join(', ')}</Text>
            <Text style={styles.detailLine}>🕒 {formatTime(event.start)} – {formatTime(event.end)}</Text>
            {event.location ? <Text style={styles.detailLine}>📍 {event.location}</Text> : null}
            {event.driverTo ? <Text style={styles.detailLine}>🚗 Hinfahrt: {event.driverTo}</Text> : null}
            {event.driverFrom ? <Text style={styles.detailLine}>🚗 Rückfahrt: {event.driverFrom}</Text> : null}
            <Text style={styles.detailLine}>🔔 {event.reminders.length ? `${event.reminders[0].minutesBefore} Minuten vorher` : 'Keine Erinnerung'}</Text>
            {event.repeat.frequency !== 'none' ? <Text style={styles.detailLine}>🔁 Wiederholung: {event.repeat.frequency}</Text> : null}
            {event.notes ? <Text style={styles.notes}>📝 {event.notes}</Text> : null}
            <Pressable style={styles.closeButton} onPress={onClose}><Text style={styles.closeText}>Schließen</Text></Pressable>
          </Pressable>
        ) : null}
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F4EE', padding: 36 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  calendarName: { fontSize: 26, color: '#6F6A61', fontWeight: '700' },
  date: { marginTop: 10, fontSize: 50, color: '#25231F', fontWeight: '800', textTransform: 'capitalize' },
  today: { marginTop: 2, fontSize: 22, color: '#8A8479' },
  weatherCard: { backgroundColor: '#FFFFFFAA', padding: 18, borderRadius: 24, minWidth: 300, alignItems: 'flex-end' },
  weatherTop: { fontSize: 25, fontWeight: '800', color: '#25231F' },
  weatherHint: { marginTop: 6, fontSize: 19, color: '#6F6A61' },
  filters: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 22 },
  filterPill: { paddingHorizontal: 18, paddingVertical: 10, backgroundColor: '#FFF', borderRadius: 999 },
  filterPillActive: { backgroundColor: '#25231F' },
  filterText: { fontSize: 17, color: '#25231F', fontWeight: '700' },
  filterTextActive: { color: '#FFF' },
  dayButtons: { marginLeft: 'auto', flexDirection: 'row', gap: 8 },
  smallButton: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16 },
  list: { paddingTop: 22, paddingBottom: 120 },
  section: { marginBottom: 22 },
  sectionTitle: { color: '#8A8479', fontWeight: '900', letterSpacing: 1.2, fontSize: 17, marginBottom: 8 },
  eventRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFFD9', borderRadius: 26, marginBottom: 12, minHeight: 94, overflow: 'hidden' },
  memberStripe: { width: 10, alignSelf: 'stretch' },
  time: { width: 118, textAlign: 'center', fontSize: 26, fontWeight: '900', color: '#25231F' },
  eventBody: { flex: 1, paddingVertical: 14 },
  eventTitle: { fontSize: 28, fontWeight: '900', color: '#25231F' },
  eventSubtitle: { marginTop: 2, fontSize: 21, color: '#4D4942' },
  ride: { marginTop: 5, fontSize: 19, color: '#6F6A61', fontWeight: '700' },
  nextBar: { position: 'absolute', left: 36, right: 36, bottom: 24, backgroundColor: '#25231F', borderRadius: 28, padding: 22 },
  nextLabel: { color: '#CFC8BC', fontSize: 15, fontWeight: '900', letterSpacing: 1.2 },
  nextText: { color: '#FFF', marginTop: 5, fontSize: 26, fontWeight: '900' },
  modalBackdrop: { flex: 1, backgroundColor: '#00000055', alignItems: 'center', justifyContent: 'center' },
  detailCard: { width: 560, backgroundColor: '#FFF', borderRadius: 34, padding: 34 },
  detailTitle: { fontSize: 34, fontWeight: '900', marginBottom: 18, color: '#25231F' },
  detailLine: { fontSize: 22, marginBottom: 10, color: '#3E3A34' },
  notes: { fontSize: 21, marginTop: 10, color: '#3E3A34', backgroundColor: '#F7F4EE', padding: 16, borderRadius: 18 },
  closeButton: { marginTop: 26, backgroundColor: '#25231F', borderRadius: 18, padding: 16, alignItems: 'center' },
  closeText: { color: '#FFF', fontSize: 19, fontWeight: '800' }
});
