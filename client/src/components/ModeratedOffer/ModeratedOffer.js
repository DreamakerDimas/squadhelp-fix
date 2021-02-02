import React from 'react';
import PropTypes from 'prop-types';
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

  const acceptHandler = () => {
    moderateHandler(id, true);
  };

  const declineHandler = () => {
    moderateHandler(id, false);
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

      {!isDisabled ? (
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
      ) : (
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

ModeratedOffer.propTypes = {
  data: PropTypes.object.isRequired,
  moderateHandler: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default ModeratedOffer;
