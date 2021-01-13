import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pricing.module.sass';
import CONSTANTS from '../../constants';

const Pricing = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftColumn}>
        <ul>
          <li>
            <div className={styles.listBtn}>{'>'}</div>
            <div className={styles.listBody}>
              <h3>Pay a Fraction of cost vs hiring an agency</h3>
              <p>
                For as low as $199, our naming contests and marketplace allow
                you to get an amazing brand quickly and affordably.
              </p>
            </div>
          </li>
          <li className={styles.borderTop}></li>
          <li>
            <span className={styles.listBtn}>{'>'}</span>
            <div className={styles.listBody}>
              <h3>Satisfaction Guarantee</h3>
              <p>
                Of course! We have policies in place to ensure that you are
                satisfied with your experience. <Link>Learn more</Link>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.rightColumn}>
        <h4>Questions?</h4>
        <p>
          Speak with a Squadhelp platform expert to learn more and get your
          questions answered.
        </p>
        <Link className={styles.consultationButt}>Schedule Consultation</Link>
        <a href={`tel:${CONSTANTS.PHONE_NUMBER}`} className={styles.phoneLink}>
          <img
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/phone_icon.svg'}
            alt="Phone"
          />
          <span>{CONSTANTS.PHONE_NUMBER}</span>
        </a>
        <span>Call us for assistance</span>
      </div>
    </div>
  );
};

export default Pricing;
