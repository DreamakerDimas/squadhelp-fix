import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import CONSTANTS from '../../../constants';
import styles from './EventComponent.module.sass';

const EventComponent = ({
  name,
  startDate,
  endDate,
  notificationDate,
  isAlarmed,
  isEnded,
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

  // get progress bar numbers in unix format
  const getProgressBarNumbers = () => {
    const start = moment(startDate).unix();
    const middle = moment(notificationDate).unix();
    const end = moment(endDate).unix();
    const current = moment(currentDate).unix();

    return {
      fullBarAmount: end - start,
      firstHalf: middle - start,
      restHalf: end - middle,
      currentAmount: current - start,
    };
  };

  // get progress bar values in percentage
  const getProgressBarPercentages = () => {
    const {
      fullBarAmount,
      firstHalf,
      restHalf,
      currentAmount,
    } = getProgressBarNumbers();

    const toNotificationPercentage = Math.round(
      (firstHalf / fullBarAmount) * 100
    );
    const fromNotificationPercentage = Math.round(
      (restHalf / fullBarAmount) * 100
    );

    const currentPercentage = Math.round((currentAmount / fullBarAmount) * 100);
    const fromNotificationCurrentPercentage = Math.round(
      ((currentAmount - firstHalf) / fullBarAmount) * 100
    );

    return {
      toNotificationPercentage,
      fromNotificationPercentage,
      currentPercentage,
      fromNotificationCurrentPercentage,
    };
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
    //

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
    //

    // if current date before notification date
    return (
      <ProgressBar>
        <ProgressBar animated variant="info" now={currentPercentage} />
      </ProgressBar>
    );
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
