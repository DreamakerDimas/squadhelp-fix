import React from 'react';
import styles from './Stats.module.sass';
import CONSTANTS from '../../constants';

const Stats = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.statsContainer}>
        <img
          src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/stars.svg'}
          alt="Image Description"
        />
        <p>
          <span>4.9 out of 5 stars </span> from 25,000+ customers.
        </p>
      </div>
      <div className={styles.border} />
      <div className={styles.statsContainer}>
        <img
          src={CONSTANTS.STATIC_IMAGES_PATH + '/img2(1).png'}
          alt="Image Description"
        />
        <p>
          Our branding community stands <span>200,000+</span> strong.
        </p>
      </div>
      <div className={styles.border} />
      <div className={styles.statsContainer}>
        <img
          src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/sharing-files.svg'}
          alt="Image Description"
        />
        <p>
          <span>140+ Industries</span> supported across more than{' '}
          <span>85 countries </span> – and counting.
        </p>
      </div>
    </div>
  );
};

export default Stats;
