import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './HowItWorks.module.sass';
import CONSTANTS from '../../constants';

const HowItWorks = (props) => {
  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.mainContainer}>
            <div className={styles.heroBanner}>banner</div>
            <div className={styles.servicesSection}></div>
            <div className={styles.featuresSection}></div>
            <div className={styles.questionsSection}></div>
            <div className={styles.ctaSection}></div>
            <div className={styles.statsSection}></div>
            <div className={styles.pricingSection}></div>
            <div className={styles.clientsSection}></div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(HowItWorks);
