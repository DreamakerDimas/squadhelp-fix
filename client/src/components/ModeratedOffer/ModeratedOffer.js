import React from 'react';
import styles from './ModeratedOffer.module.sass';
import CONSTANTS from '../../constants';

function ModeratedOffer({ data, moderateHandler, isFetching }) {
  const {
    id,
    userId,
    contestId,
    text,
    fileName,
    originalFileName,
    isAccepted,
  } = data;

  const isDisabled = typeof isAccepted === 'boolean';

  const acceptHandler = (e) => {
    e.preventDefault();
    moderateHandler(data.id, true);
  };

  const declineHandler = (e) => {
    e.preventDefault();
    moderateHandler(data.id, false);
  };

  return (
    <div className={styles.offerContainer}>
      <div className={styles.offerHeader}>
        <span>Offer Id: {id}</span>
        <span>User Id: {userId}</span>
        <span>Contest Id: {contestId}</span>
      </div>

      <div className={styles.offerBody}>
        {text && <span>{text}</span>}
        {fileName && (
          <img
            className={styles.image}
            src={`${CONSTANTS.publicURL}${fileName}`}
          ></img>
        )}
        {originalFileName && <span>{originalFileName}</span>}
      </div>

      {!isDisabled && (
        <div className={styles.offerActions}>
          <button
            disabled={isFetching}
            className={styles.acceptButt}
            onClick={acceptHandler}
          >
            Confirm
          </button>
          <button
            disabled={isFetching}
            className={styles.declineButt}
            onClick={declineHandler}
          >
            Decline
          </button>
        </div>
      )}

      {isDisabled && (
        <div className={styles.statusContainer}>
          {isAccepted ? (
            <span className={styles.acceptedSpan}>accepted</span>
          ) : (
            <span className={styles.declinedSpan}>rejected</span>
          )}
        </div>
      )}
    </div>
  );
}

export default ModeratedOffer;
