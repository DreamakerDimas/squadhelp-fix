import React from 'react';
import styles from './ModeratedOffer.module.sass';
import CONSTANTS from '../../constants';

const ModeratedOffer = ({ data, moderateHandler, changeShowImage }) => {
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
        <span>Offer Id: {data.id}</span>
        <span>User Id: {data.userId}</span>
        <span>Contest Id: {data.contestId}</span>
      </div>
      <div className={styles.offerBody}>
        {data.text && <span>Text: {data.text}</span>}
        {data.fileName && (
          <img
            className={styles.image}
            src={`${CONSTANTS.publicURL}${data.fileName}`}
          ></img>
        )}
        {data.originalFileName && <span>{data.originalFileName}</span>}
      </div>
      <div className={styles.offerActions}>
        <button className={styles.acceptButt} onClick={acceptHandler}>
          Confirm
        </button>
        <button className={styles.declineButt} onClick={declineHandler}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default ModeratedOffer;
