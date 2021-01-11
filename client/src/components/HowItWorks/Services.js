import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.sass';
import CONSTANTS from '../../constants';

const Services = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.rowTitle}>
        <span>Our Services</span>
        <h2>3 Ways To Use Squadhelp</h2>
        <p>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.cardBody}>
          <img
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/icon-7.svg'}
            alt="Image Description"
          />
          <h3>Launch a Contest</h3>
          <p>
            Work with hundreds of creative experts to get custom name
            suggestions for your business or brand. All names are auto-checked
            for URL availability.
          </p>
          <Link className={styles.button}>Launch a Contest</Link>
        </div>
        <div className={styles.cardBody}>
          <img
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/icon-40.svg'}
            alt="Image Description"
          />
          <h3>Explore Names For Sale</h3>
          <p>
            Our branding team has curated thousands of pre-made names that you
            can purchase instantly. All names include a matching URL and a
            complimentary Logo Design
          </p>
          <Link className={styles.button}>Explore Names For Sale</Link>
        </div>
        <div className={styles.cardBody}>
          <img
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/icon-24.svg'}
            alt="Image Description"
          />
          <h3>Agency-level Managed</h3>
          <p>
            Our Managed contests combine the power of crowdsourcing with the
            rich experience of our branding consultants. Get a complete
            agency-level experience at a fraction of Agency costs
          </p>
          <Link className={styles.button}>Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
