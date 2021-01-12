import React from 'react';
import styles from './Stats.module.sass';

const Stats = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.statsContainer}></div>
      <div className={styles.statsContainer}></div>
      <div className={styles.statsContainer}></div>
    </div>
  );
};

export default Stats;
