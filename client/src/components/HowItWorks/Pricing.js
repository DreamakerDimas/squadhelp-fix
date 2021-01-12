import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pricing.sass';
import CONSTANTS from '../../constants';

const Pricing = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftColumn}>
        <ul>
          <li></li>
          <li className={styles.borderTop}></li>
          <li></li>
        </ul>
      </div>
      <div className={styles.rightColumn}>
        <h4>Questions?</h4>
        <p>
          Speak with a Squadhelp platform expert to learn more and get your
          questions answered.
        </p>
        <Link className={styles.consultationButt}></Link>
        <Link className={styles.phoneLink}>
          <img></img>
          {CONSTANTS.PHONE_NUMBER}
        </Link>
        <span>Call us for assistance</span>
      </div>
    </div>
  );
};
