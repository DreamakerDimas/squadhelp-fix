export const getEventsFromLocal = () => {
  return localStorage.getItem('events');
};

export const setEventsInLocal = (events) => {
  localStorage.setItem('events', events);
};

// return events array for notifications
export const getNotificationEvents = (events) => {
  return events.map((event) => {
    //code
  });
};
