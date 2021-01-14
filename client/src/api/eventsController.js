export const getEventsFromLocal = () => {
  return JSON.parse(localStorage.getItem('events'));
};

export const setEventsInLocal = (events) => {
  const eventsString = JSON.stringify(events);
  localStorage.setItem('events', eventsString);
};

// return events array for notifications
export const getNotificationEvents = (events) => {
  return events.map((event) => {
    //code
  });
};
