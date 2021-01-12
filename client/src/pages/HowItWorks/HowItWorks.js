import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import HeroBanner from '../../components/HowItWorks/HeroBanner';
import Services from '../../components/HowItWorks/Services';
import Features from '../../components/HowItWorks/Features';
import Questions from '../../components/HowItWorks/Questions';
import CTASection from '../../components/HowItWorks/CTASection';
import Stats from '../../components/HowItWorks/Stats';
import Pricing from '../../components/HowItWorks/Pricing';
import Clients from '../../components/HowItWorks/Clients';

const HowItWorks = (props) => {
  const { isFetching } = props;

  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div>
            <HeroBanner />
            <Services />
            <hr />
            <Features />
            <hr />
            <Questions />
            <CTASection />
            <Stats />
            <Pricing />
            <Clients />
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
