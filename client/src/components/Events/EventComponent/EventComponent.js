import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../constants';
import styles from './EventComponent.module.sass';

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

  const deleteHandler = (e) => {
    e.preventDefault();
    deleteEvent();
  };

  // get date in unix timestamp
  const getTimestamp = (date) => moment(date).unix();

  // get progress bar numbers in unix format
  const getProgressBarNumbers = () => {
    const start = getTimestamp(startDate);
    const middle = getTimestamp(notificationDate);
    const end = getTimestamp(endDate);
    const current = getTimestamp(currentDate);

    return {
      fullBarAmount: end - start,
      firstHalf: middle - start,
      restHalf: end - middle,
      currentAmount: current - start,
    };
  };

  // calc percentage value
  const calcPercentage = (half, full) => Math.round((half / full) * 100);

  // get progress bar values in percentage
  const getProgressBarPercentages = () => {
    const {
      fullBarAmount,
      firstHalf,
      restHalf,
      currentAmount,
    } = getProgressBarNumbers();

    const toNotificationPercentage = calcPercentage(firstHalf, fullBarAmount);
    const fromNotificationPercentage = calcPercentage(restHalf, fullBarAmount);

    const currentPercentage = calcPercentage(currentAmount, fullBarAmount);
    const fromNotificationCurrentPercentage = calcPercentage(
      currentAmount - firstHalf,
      fullBarAmount
    );

    return {
      toNotificationPercentage,
      fromNotificationPercentage,
      currentPercentage,
      fromNotificationCurrentPercentage,
    };
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

  const renderProgressBar = () => {
    const {
      toNotificationPercentage,
      fromNotificationPercentage,
      currentPercentage,
      fromNotificationCurrentPercentage,
    } = getProgressBarPercentages();

    // if current date after end date
    if (isEnded) {
      return (
        <ProgressBar>
          <ProgressBar striped variant="info" now={toNotificationPercentage} />
          <ProgressBar
            striped
            variant="warning"
            now={fromNotificationPercentage}
          />
        </ProgressBar>
      );
    }
    // ---

    // if current date after notification date
    if (isAlarmed) {
      return (
        <ProgressBar>
          <ProgressBar animated variant="info" now={toNotificationPercentage} />
          <ProgressBar
            animated
            variant="warning"
            now={fromNotificationCurrentPercentage}
          />
        </ProgressBar>
      );
    }
    // ---

    // if current date before notification date
    return (
      <ProgressBar>
        <ProgressBar animated variant="info" now={currentPercentage} />
      </ProgressBar>
    );
  };

  // Main return ---
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
      <div className={styles.progressBarContainer}>{renderProgressBar()}</div>

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
