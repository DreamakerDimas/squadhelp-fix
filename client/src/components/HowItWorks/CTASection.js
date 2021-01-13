import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CTASection.module.sass';
import CONSTANTS from '../../constants';

const CTASection = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h3>Ready to get started?</h3>
        <p>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <Link className={styles.startContestButt} to="startContest">
          <span>Start A Contest</span>
        </Link>
      </div>
      <img
        className={styles.leftSVG}
        src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/abstract-shapes-8.svg'}
        alt="Image Description"
      />
      <img
        className={styles.rightSVG}
        src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/abstract-shapes-5.svg'}
        alt="Image Description"
      />
    </div>
  );
};

export default CTASection;
