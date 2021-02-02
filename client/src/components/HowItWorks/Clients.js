import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Clients.module.sass';
import CONSTANTS from '../../constants';

const Clients = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.textContainer}>Featured In</div>
      <div className={styles.linksContainer}>
        <Link
          className={styles.linkBody}
          to="http://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199"
        >
          <img
            className={styles.imgTop}
            src={CONSTANTS.STATIC_IMAGES_PATH + '/sponsors/Forbes-inactive.png'}
            alt="Image Description"
          />
          <img
            className={styles.imgBot}
            src={CONSTANTS.STATIC_IMAGES_PATH + '/sponsors/Forbes-active.png'}
            alt="Image Description"
          />
        </Link>

        <Link
          className={styles.linkBody}
          to="http://thenextweb.com/contributors/crowdsource-startup-name-with-squadhelp/"
        >
          <img
            className={styles.imgTop}
            src={
              CONSTANTS.STATIC_IMAGES_PATH +
              '/sponsors/the_next_web_inactive.png'
            }
            alt="Image Description"
          />
          <img
            className={styles.imgBot}
            src={
              CONSTANTS.STATIC_IMAGES_PATH + '/sponsors/the_next_web_active.png'
            }
            alt="Image Description"
          />
        </Link>

        <Link
          className={styles.linkBody}
          to="http://mashable.com/2011/04/01/make-money-crowdworking/"
        >
          <img
            className={styles.imgTop}
            src={
              CONSTANTS.STATIC_IMAGES_PATH + '/sponsors/mashable-inactive.png'
            }
            alt="Image Description"
          />
          <img
            className={styles.imgBot}
            src={CONSTANTS.STATIC_IMAGES_PATH + '/sponsors/mashable-active.png'}
            alt="Image Description"
          />
        </Link>
      </div>
    </div>
  );
};

export default Clients;
