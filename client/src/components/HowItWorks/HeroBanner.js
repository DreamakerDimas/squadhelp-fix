import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroBanner.module.sass';
import CONSTANTS from '../../constants';

const HeroBanner = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.columnLeft}>
        <span>World's #1 Naming Platform</span>
        <div className={styles.articleContainer}>
          <h1>How Does Squadhelp Work?</h1>
          <p>
            Squadhelp helps you come up with a great name for your business by
            combining the power of crowdsourcing with sophisticated technology
            and Agency-level validation services.
          </p>
        </div>
        <Link className={styles.videoButton} to="https://vimeo.com/368584367">
          <img
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/play-button.svg'}
            alt="Play"
          />
          <span>Play Video</span>
        </Link>
      </div>
      <div className={styles.columnRight}>
        <figure>
          <img
            src={CONSTANTS.STATIC_IMAGES_PATH + '/svg/app-user.svg'}
            alt="Image Description"
          />
        </figure>
      </div>
    </div>
  );
};

export default HeroBanner;
