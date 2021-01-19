import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './OffersPage.module.sass';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SpinnerLoader from '../../components/Spinner/Spinner';
import {
  getOffers,
  moderateOffer,
  setOffer,
} from '../../actions/actionCreator';
import ModeratedOffer from '../../components/ModeratedOffer/ModeratedOffer';

const initSettings = { limit: 10, offset: 0, order: 'asc', page: 1 };

// offset = (page-1)*limit

const OffersPage = ({ isFetching, getOffers, moderateOffer, offersStore }) => {
  const [offersArr, setOffersArr] = useState([]);
  const [settings, setSettings] = useState(initSettings);

  // on settings update
  useEffect(() => {
    getOffers(settings);
  }, [settings]);

  // on offers store update
  useEffect(() => {
    setOffersArr(offersStore.offers);
  }, [offersStore.offers]);

  const nextHandler = () => {
    setSettings((prevSettings) => {
      const newPage = prevSettings.page + 1;
      return {
        ...prevSettings,
        page: newPage,
        offset: prevSettings.page * prevSettings.limit,
      };
    });
  };

  const prevHandler = () => {
    setSettings((prevSettings) => {
      const newPage = prevSettings.page - 1;
      return {
        ...prevSettings,
        page: newPage,
        offset: (newPage - 1) * prevSettings.limit,
      };
    });
  };

  const moderateHandler = (id, isAccepted) => {
    moderateOffer({ id, isAccepted });
    setTimeout(() => {
      getOffers(settings);
    }, 1000); // for animation and fix
  };

  const renderOffers = () => {
    return offersArr.map((offer) => {
      return (
        <ModeratedOffer
          key={offer.id}
          data={offer}
          moderateHandler={moderateHandler}
        />
      );
    });
  };

  return (
    <>
      <Header />
      {isFetching ? (
        <SpinnerLoader />
      ) : (
        <>
          <div className={styles.mainContainer}>
            <div className={styles.settings}></div>
            <div className={styles.contentContainer}>
              {offersStore.isFetching ? <SpinnerLoader /> : renderOffers()}
            </div>
            <div className={styles.pagination}>
              <button disabled={settings.page === 1} onClick={prevHandler}>
                Prev
              </button>
              {settings.page}
              <button disabled={!offersStore.haveMore} onClick={nextHandler}>
                Next
              </button>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const isFetching = state.userStore.isFetching;
  const offersStore = state.offersStore;
  return { isFetching, offersStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOffers: (data) => dispatch(getOffers(data)),
    moderateOffer: (data) => dispatch(moderateOffer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);
