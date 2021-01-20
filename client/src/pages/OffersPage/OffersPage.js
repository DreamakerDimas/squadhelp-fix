import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './OffersPage.module.sass';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SpinnerLoader from '../../components/Spinner/Spinner';
import {
  getOffers,
  moderateOffer,
  clearOffersStore,
} from '../../actions/actionCreator';
import ModeratedOffer from '../../components/ModeratedOffer/ModeratedOffer';

// For developer:
// Изменил костыльную пагинацию на lazyloader, всё работает корректно.
// Сейчас работаю над дизейблом для обработаного оффера.

const OffersPage = ({
  isFetchingUser,
  getOffers,
  moderateOffer,
  offersStore,
  clearOffersStore,
}) => {
  const { settings } = offersStore;
  const [offersArr, setOffersArr] = useState([]);

  const observer = useRef();
  const lastOfferRef = useCallback(
    (node) => {
      if (offersStore.isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && offersStore.haveMore) {
          getOffers(settings);
        }
      });

      if (node) observer.current.observe(node);
    },
    [offersStore.isFetching, offersStore.haveMore]
  );

  // first query on mount and clear on unmount
  useEffect(() => {
    getOffers(settings);
    return clearOffersStore;
  }, []);

  // update offersArr on offers store update
  useEffect(() => {
    setOffersArr((prevArr) => {
      return [...prevArr, ...offersStore.offers];
    });
  }, [offersStore.offers]);

  // on offer action
  const moderateHandler = (id, isAccepted) => {
    moderateOffer({ id, isAccepted });
  };

  const renderOffers = () => {
    // offers existence check
    if (offersArr.length === 0 && !offersStore.isFetching) {
      return <div>No offers founded</div>;
    }

    return offersArr.map((offer, index) => {
      // ref for last offer
      if (offersArr.length === index + 1) {
        return (
          <ModeratedOffer
            childRef={lastOfferRef}
            key={offer.id}
            data={offer}
            moderateHandler={moderateHandler}
          />
        );
      }

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
      {isFetchingUser ? (
        <SpinnerLoader />
      ) : (
        <>
          <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
              {renderOffers()}
              {offersStore.isFetching && <SpinnerLoader />}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const isFetchingUser = state.userStore.isFetching;
  const offersStore = state.offersStore;
  return { isFetchingUser, offersStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOffers: (data) => dispatch(getOffers(data)),
    moderateOffer: (data) => dispatch(moderateOffer(data)),
    clearOffersStore: () => dispatch(clearOffersStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);
