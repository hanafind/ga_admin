let calendarEl, calendar;
document.addEventListener('DOMContentLoaded', function() {
    calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko',
        datesSet: event =>  {
            console.log(event)
            console.log(event.view.calendarup)

        }
    });
    calendar.render();
    calendar.addEvent(
        {
            title: 'Event1',
            start: '2023-01-27'
        }
    );
});