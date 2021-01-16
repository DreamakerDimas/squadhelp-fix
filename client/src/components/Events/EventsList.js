import React from 'react';
import EventComponent from './EventComponent/EventComponent';
import styles from './EventsList.module.sass';

const EventsList = ({ eventsArr }) => {
  return (
    <div className={styles.mainContainer}>
      {eventsArr.map((elem, index) => (
        <EventComponent
          key={index}
          name={elem.name}
          startDate={elem.startDate}
          endDate={elem.endDate}
          notificationDate={elem.notificationDate}
          isAlarmed={elem.isAlarmed}
          isEnded={elem.isEnded}
        />
      ))}
    </div>
  );
};

export default EventsList;
