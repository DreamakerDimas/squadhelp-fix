import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.sass';

const Services = () => {
  return (
    <div className={styles.mailContainer}>
      <div className={styles.rowTitle}>
        <span>Our Services</span>
        <h2>3 Ways To Use Squadhelp</h2>
        <p>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </div>
      <div className={styles.rowWays}>
        <div className={styles.columnWay}>
          <figure></figure>
          <h3>Launch a Contest</h3>
          <p>
            Work with hundreds of creative experts to get custom name
            suggestions for your business or brand. All names are auto-checked
            for URL availability.
          </p>
          <Link>Launch a Contest</Link>
        </div>
        <div className={styles.columnWay}>
          <figure></figure>
          <h3>Explore Names For Sale</h3>
          <p>
            Our branding team has curated thousands of pre-made names that you
            can purchase instantly. All names include a matching URL and a
            complimentary Logo Design
          </p>
          <Link>Explore Names For Sale</Link>
        </div>
        <div className={styles.columnWay}>
          <figure></figure>
          <h3>Agency-level Managed</h3>
          <p>
            Our Managed contests combine the power of crowdsourcing with the
            rich experience of our branding consultants. Get a complete
            agency-level experience at a fraction of Agency costs
          </p>
          <Link>Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
