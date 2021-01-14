import React from 'react';
import styles from './Events.module.sass';

const Events = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.eventsNav}>
        <div className="createEvent"></div>
        <div className="eventsList"></div>
        <div className="alarmedEventsList"></div>
      </div>
      <div className={styles.contentContainer}></div>
    </div>
  );
};

export default Events;
