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
            className={styles.SVG}
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/forbes.svg'}
            alt="Image Description"
          />
        </Link>

        <Link
          className={styles.linkBody}
          to="http://thenextweb.com/contributors/crowdsource-startup-name-with-squadhelp/"
        >
          <img
            className={styles.SVG}
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/TNW.svg'}
            alt="Image Description"
          />
        </Link>

        <Link
          className={styles.linkBody}
          to="http://www.chicagotribune.com/bluesky/originals/ct-squadhelp-startup-names-bsi-20170331-story.html"
        >
          <img
            className={styles.SVG}
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/chicago.svg'}
            alt="Image Description"
          />
        </Link>

        <Link
          className={styles.linkBody}
          to="http://mashable.com/2011/04/01/make-money-crowdworking/"
        >
          <img
            className={styles.SVG}
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/Mashable.svg'}
            alt="Image Description"
          />
        </Link>
      </div>
    </div>
  );
};

export default Clients;
