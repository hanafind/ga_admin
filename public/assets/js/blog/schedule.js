let calendarEl, calendar;
document.addEventListener('DOMContentLoaded', function() {
    calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'ko'
    });
    calendar.render();
});