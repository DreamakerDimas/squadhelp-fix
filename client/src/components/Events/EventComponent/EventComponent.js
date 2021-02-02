import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../constants';
import styles from './EventComponent.module.sass';
import RemainingBar from './RemainingBar';

const EventComponent = ({
  name,
  startDate,
  endDate,
  notificationDate,
  isAlarmed,
  isEnded,
  deleteEvent,
}) => {
  const getCurrentDateString = () => moment().format(CONSTANTS.MOMENT_FORMAT);
  const [currentDate, setCurrentDate] = useState(getCurrentDateString());

  // Update currentDate each minute and re-render
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getCurrentDateString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const deleteHandler = () => {
    deleteEvent();
  };

  const renderRemainingTime = () => {
    const remaining = moment(endDate) - moment(currentDate);
    const dur = moment.duration(remaining);

    if (dur.years()) {
      return `Remaining time: 
      ${dur.years()} year(s), 
      ${dur.months()} month(s), 
      ${dur.days()} day(s), 
      ${dur.hours()} hour(s), 
      ${dur.minutes()} minute(s).`;
    }

    if (dur.months()) {
      return `Remaining time: 
      ${dur.months()} month(s), 
      ${dur.days()} day(s), 
      ${dur.hours()} hour(s), 
      ${dur.minutes()} minute(s).`;
    }

    return `Remaining time: 
    ${dur.days()} day(s), 
    ${dur.hours()} hour(s), 
    ${dur.minutes()} minute(s).`;
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.eventHead}>
        <h2>{name}</h2>

        {isAlarmed && !isEnded && (
          <h3 className={styles.alarmMessage}>
            It's time to start your contest!
          </h3>
        )}

        {isEnded && <h3 className={styles.endMessage}>Event was over!</h3>}

        {!isEnded && (
          <div className={styles.remainingTime}> {renderRemainingTime()} </div>
        )}
      </div>

      <div className={styles.progressBarContainer}>
        {
          <RemainingBar
            startDate={startDate}
            endDate={endDate}
            notificationDate={notificationDate}
            currentDate={currentDate}
            isEnded={isEnded}
            isAlarmed={isAlarmed}
          />
        }
      </div>

      <div className={styles.datesContainer}>
        <div className={styles.date}>
          <span>Created at:</span> <p>{startDate}</p>
        </div>

        <div className={styles.date}>
          <span>Start notification date:</span> <p>{notificationDate}</p>
        </div>

        <div className={styles.date}>
          <span>End date:</span> <p>{endDate}</p>
        </div>
      </div>

      <div className={styles.removeButt} onClick={deleteHandler}>
        <span>&times;</span>
      </div>
    </div>
  );
};

EventComponent.propTypes = {
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  notificationDate: PropTypes.string.isRequired,
  isAlarmed: PropTypes.bool.isRequired,
  isEnded: PropTypes.bool.isRequired,
};

export default EventComponent;
