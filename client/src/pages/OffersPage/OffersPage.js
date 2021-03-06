import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './OffersPage.module.sass';
import Header from '../../components/Header/Header';
import SpinnerLoader from '../../components/Spinner/Spinner';
import {
  getOffers,
  moderateOffer,
  clearOffersStore,
} from '../../actions/actionCreator';
import ModeratedOffer from '../../components/ModeratedOffer/ModeratedOffer';

const OffersPage = ({
  isFetchingUser,
  getOffers,
  moderateOffer,
  offersStore,
  clearOffersStore,
}) => {
  const { settings, isFetching, haveMore, offers } = offersStore;

  // on mount
  useEffect(() => {
    getOffers(settings);

    return clearOffersStore;
  }, []);

  // scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const isLoadNotNeed =
        !haveMore ||
        isFetching ||
        currentPosition !== document.documentElement.offsetHeight;

      if (isLoadNotNeed) return;

      getOffers(settings);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, settings, haveMore]);

  // on offer action
  const moderateHandler = (id, isAccepted) => {
    moderateOffer({ id, isAccepted });
  };

  const updateHandler = () => {
    getOffers(settings);
  };

  const renderOffers = () => {
    // offers existence check
    if (offers.length === 0 && !isFetching) {
      return (
        <div className={styles.noOffers}>
          <span>No offers founded</span>{' '}
          <i class="fas fa-redo" onClick={updateHandler}></i>
        </div>
      );
    }

    return offers.map((offer) => (
      <ModeratedOffer
        key={offer.id}
        data={offer}
        moderateHandler={moderateHandler}
        isFetching={isFetching}
      />
    ));
  };

  return (
    <>
      <Header />
      {isFetchingUser ? (
        <SpinnerLoader />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.contentContainer}>
            {renderOffers()}
            {isFetching && <SpinnerLoader />}
          </div>
        </div>
      )}
    </>
  );
};

OffersPage.propTypes = {
  isFetchingUser: PropTypes.bool.isRequired,
  getOffers: PropTypes.func.isRequired,
  moderateOffer: PropTypes.func.isRequired,
  offersStore: PropTypes.object.isRequired,
  clearOffersStore: PropTypes.func.isRequired,
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
