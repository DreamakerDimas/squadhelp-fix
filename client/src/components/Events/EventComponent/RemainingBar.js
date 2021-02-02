import React from 'react';
import moment from 'moment';
import { ProgressBar } from 'react-bootstrap';

const RemainingBar = ({
  startDate,
  notificationDate,
  endDate,
  currentDate,
  isEnded,
  isAlarmed,
}) => {
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

  return renderProgressBar();
};

export default RemainingBar;
