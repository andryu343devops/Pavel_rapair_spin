import { google } from "googleapis";

export async function getAvailableSlots(accessToken: string) {
  const calendar = google.calendar({ version: "v3", auth: accessToken });

  // Получаем события из Google Календаря
  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = response.data.items || [];

  return events.map((event) => ({
    id: event.id,
    date: event.start?.date || event.start?.dateTime?.split("T")[0],
    time: event.start?.dateTime ? event.start.dateTime.split("T")[1].substring(0, 5) : "All Day",
  }));
}

export async function bookSlot(accessToken: string, date: string, time: string, notes: string) {
  const calendar = google.calendar({ version: "v3", auth: accessToken });

  const event = {
    summary: "Бронирование",
    description: notes,
    start: { dateTime: `${date}T${time}:00`, timeZone: "America/Chicago" },
    end: { dateTime: `${date}T${(parseInt(time) + 1).toString().padStart(2, "0")}:00`, timeZone: "America/Chicago" },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
  });

  return response.data;
}

export async function cancelSlot(accessToken: string, eventId: string) {
  const calendar = google.calendar({ version: "v3", auth: accessToken });

  await calendar.events.delete({
    calendarId: "primary",
    eventId,
  });

  return { success: true };
}
