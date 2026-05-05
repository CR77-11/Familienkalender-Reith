async function loadWeather() {
  const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=49.317&longitude=8.431&current_weather=true");
  const data = await res.json();

  const temp = Math.round(data.current_weather.temperature);
  const wind = data.current_weather.windspeed;

  document.getElementById("weather").innerText =
    `🌤️ Speyer ${temp}°C · Wind ${wind} km/h`;
}

const events = [
  { time: "07:30", period: "MORGEN", icon: "🎒", person: "Henri", title: "Schule", category: "Schule", members: ["Henri"], location: "Schule", reminder: "30 Minuten vorher" },
  { time: "08:15", period: "MORGEN", icon: "💼", person: "Christian", title: "Kundentermin", category: "Beruf", members: ["Christian"], location: "Büro", reminder: "15 Minuten vorher" },
  { time: "14:30", period: "NACHMITTAG", icon: "🎹", person: "Greta", title: "Klavierunterricht", category: "Privat", members: ["Greta"], location: "Musikschule", driverTo: "Annette", reminder: "60 Minuten vorher" },
  { time: "16:00", period: "NACHMITTAG", icon: "⚽", person: "Justus", title: "Fußballtraining", category: "Sport", members: ["Justus"], location: "Sportplatz Mainz", driverTo: "Christian", driverFrom: "Annette", reminder: "60 Minuten vorher", notes: "Trikot + Trinkflasche mitnehmen" },
  { time: "18:30", period: "ABEND", icon: "👨‍👩‍👧‍👦", person: "Familie", title: "Abendessen", category: "Privat", members: ["Annette", "Christian", "Greta", "Justus", "Henri"], location: "Zuhause", reminder: "Keine" }
];

let selectedMember = "Alle";
const schedule = document.getElementById("schedule");
const dialog = document.getElementById("eventDialog");
const dialogContent = document.getElementById("dialogContent");

function driveText(event) {
  if (event.driverTo && event.driverFrom) return `🚗 ${event.driverTo} → ${event.driverFrom}`;
  if (event.driverTo) return `🚗 ${event.driverTo}`;
  if (event.driverFrom) return `🚗 Rückfahrt: ${event.driverFrom}`;
  return "";
}

function visibleEvents() {
  if (selectedMember === "Alle") return events;
  return events.filter(e => e.members.includes(selectedMember) || e.person === selectedMember);
}

function render() {
  const grouped = visibleEvents().reduce((acc, event) => {
    acc[event.period] ||= [];
    acc[event.period].push(event);
    return acc;
  }, {});
  schedule.innerHTML = "";
  ["MORGEN", "NACHMITTAG", "ABEND"].forEach(period => {
    if (!grouped[period]) return;
    const section = document.createElement("section");
    section.className = "period";
    section.innerHTML = `<div class="period-title">${period}</div>`;
    grouped[period].forEach(event => {
      const item = document.createElement("article");
      item.className = event === visibleEvents()[0] ? "event next-highlight" : "event";
      item.innerHTML = `
        <div class="time">${event.time}</div>
        <div>
          <div class="event-title">${event.icon} ${event.person}</div>
          <div class="event-sub">${event.title}</div>
          ${driveText(event) ? `<div class="drive">${driveText(event)}</div>` : ""}
        </div>`;
      item.addEventListener("click", () => openDetail(event));
      section.appendChild(item);
    });
    schedule.appendChild(section);
  });
  const next = visibleEvents()[0];
  document.getElementById("nextEvent").textContent = next ? `${next.icon} ${next.person} – ${next.title} · ${next.time}` : "Heute keine weiteren Termine";
}

function openDetail(event) {
  dialogContent.innerHTML = `
    <h2 class="detail-title">${event.icon} ${event.title}</h2>
    <div class="detail-row"><strong>Person:</strong> ${event.person}</div>
    <div class="detail-row"><strong>Zeit:</strong> ${event.time}</div>
    <div class="detail-row"><strong>Ort:</strong> ${event.location || "—"}</div>
    ${event.driverTo ? `<div class="detail-row"><strong>Hinfahrt:</strong> ${event.driverTo}</div>` : ""}
    ${event.driverFrom ? `<div class="detail-row"><strong>Rückfahrt:</strong> ${event.driverFrom}</div>` : ""}
    <div class="detail-row"><strong>Erinnerung:</strong> ${event.reminder || "Keine"}</div>
    ${event.notes ? `<div class="detail-row"><strong>Notiz:</strong> ${event.notes}</div>` : ""}
  `;
  dialog.showModal();
}

document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    selectedMember = chip.dataset.member;
    render();
  });
});

document.getElementById("weatherCard").addEventListener("click", () => {
  alert("Wettermodul: Später kann hier eine echte Wetter-API für Speyer angeschlossen werden.");
});
render();
loadWeather();
