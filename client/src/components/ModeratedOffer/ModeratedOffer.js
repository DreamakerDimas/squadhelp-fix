import React from 'react';
import styles from './ModeratedOffer.module.sass';

const ModeratedOffer = ({ data }) => {
  return (
    <div className={styles.offerContainer}>
      <div className={styles.offerHeader}>
        <span>OfferId: {data.id}</span>
        <span>UserId: {data.userId}</span>
        <span>ContestId: {data.contestId}</span>
      </div>
      <div className={styles.offerBody}>
        <span>Text: {data.text}</span>
        <span>fileName: {data.fileName}</span>
        <span>originalFileName: {data.originalFileName}</span>
      </div>
      <div className={styles.offerActions}>
        <button>+</button>
        <button>-</button>
      </div>
    </div>
  );
};

export default ModeratedOffer;
