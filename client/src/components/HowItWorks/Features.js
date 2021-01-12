import React from 'react';
import styles from './Features.module.sass';
import CONSTANTS from '../../constants';

const Features = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.featuresTitle}>
        <img
          src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/icon-27.svg'}
          alt="Image Description"
        />
        <h2>How Do Naming Contests Work?</h2>
      </div>
      <div className={styles.featuresContainer}>
        <div className={styles.leftColumn}>
          <img
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/support-man.svg'}
            alt="Image Description"
          />
        </div>
        <div className={styles.rightColumn}>
          <ul>
            <li>
              <div className={styles.textBox}>
                <h2>1.</h2>
                <p>
                  Fill out your Naming Brief and begin receiving name ideas in
                  minutes.
                </p>
              </div>
            </li>
            <li>
              <div className={styles.textBox}>
                <h2>2.</h2>
                <p>
                  Rate the submissions and provide feedback to creatives.
                  Creatives submit even more names based on your feedback.
                </p>
              </div>
            </li>
            <li>
              <div className={styles.textBox}>
                <h2>3.</h2>
                <p>
                  Our team helps you test your favorite names with your target
                  audience. We also assist with Trademark screening.
                </p>
              </div>
            </li>
            <li>
              <div className={styles.textBox}>
                <h2>4.</h2>
                <p>Pick a Winner. The winner gets paid for their submission.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
