import moment from 'moment';

export const getEventsFromLocal = () => {
  return JSON.parse(localStorage.getItem('events'));
};

export const setEventsInLocal = (events) => {
  const eventsString = JSON.stringify(events);
  localStorage.setItem('events', eventsString);
};

// return events array for notifications
export const setEventsBooleans = (events) => {
  return events.map((event) => {
    event.isAlarmed = moment().isAfter(moment(event.notificationDate));
    event.isEnded = moment().isAfter(moment(event.endDate));
    return event;
  });
};

// return array with isAlarmed events
export const getAlarmedEventsArr = (events) => {
  return events.filter((event) => {
    return event.isAlarmed;
  });
};

// return sorted events array
export const sortEventsArr = (events) => {
  return events.sort((a, b) => (moment(a.endDate).isAfter(b.endDate) ? 1 : -1));
};
