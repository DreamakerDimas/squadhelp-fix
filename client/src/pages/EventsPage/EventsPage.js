import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getEvents,
  checkEvents,
  sortEvents,
  clearEventsStore,
} from '../../actions/actionCreator';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CreateEventForm from '../../components/Events/CreateEventForm';
import EventsList from '../../components/Events/EventsList';
import SpinnerLoader from '../../components/Spinner/Spinner';
import styles from './EventsPage.module.sass';
import CONSTANTS from '../../constants';

const {
  CREATE_EVENT,
  ALL_EVENTS,
  ALARMED_EVENTS,
} = CONSTANTS.EVENTS_CONTENT_TYPES;

const EventsPage = ({
  eventsStore,
  checkEvents,
  sortEvents,
  getEvents,
  clearEventsStore,
  isFetching,
}) => {
  const { events, alarmedEvents } = eventsStore;
  const [switcherId, setSwitcherId] = useState(ALARMED_EVENTS);

  // --Events Controller--
  useEffect(() => {
    // on mount
    checkEvents();
    sortEvents();
    getEvents();

    // on unmount
    return clearEventsStore;
  }, []);

  // check events each 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      checkEvents();
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  // render on store change
  useEffect(() => {}, [events, alarmedEvents]);

  // --End of Events Controller--

  // set content component id
  function setSwitcherHandler(e) {
    e.preventDefault();
    setSwitcherId(e.currentTarget.dataset.id);
  }

  // get content by id
  const renderContent = () => {
    switch (switcherId) {
      case ALARMED_EVENTS: {
        if (alarmedEvents.length > 0) {
          return (
            <>
              <h2>Alarmed Events</h2>
              <EventsList eventsArr={alarmedEvents} />
            </>
          );
        }
        return (
          <>
            <h2>Alarmed Events</h2>
            <h3>No alarmed events yet</h3>
          </>
        );
      }

      case ALL_EVENTS: {
        if (events.length > 0) {
          return (
            <>
              <h2>All Events</h2>
              <EventsList eventsArr={events} />
            </>
          );
        }
        return (
          <>
            <h2>All Events</h2>
            <h3>No events yet</h3>
          </>
        );
      }

      case CREATE_EVENT: {
        return (
          <>
            <h2>Create Event</h2>
            <CreateEventForm
              sortEvents={sortEvents}
              setSwitcherId={setSwitcherId}
            />
          </>
        );
      }
    }
  };

  return (
    <>
      <Header />
      {isFetching ? (
        <SpinnerLoader />
      ) : (
        <>
          <div className={styles.mainContainer}>
            <div className={styles.eventsNav}>
              <div data-id={ALARMED_EVENTS} onClick={setSwitcherHandler}>
                {alarmedEvents.length > 0 && (
                  <div className={styles.alarmIndicator}></div>
                )}
                Alarmed events
              </div>

              <div data-id={ALL_EVENTS} onClick={setSwitcherHandler}>
                All events
              </div>

              <div data-id={CREATE_EVENT} onClick={setSwitcherHandler}>
                Create event
              </div>
            </div>

            <div className={styles.contentContainer}>{renderContent()}</div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

EventsPage.propTypes = {
  eventsStore: PropTypes.object.isRequired,
  checkEvents: PropTypes.func.isRequired,
  sortEvents: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { eventsStore } = state;
  const { isFetching } = state.userStore;
  return { eventsStore, isFetching };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkEvents: () => dispatch(checkEvents()),
    sortEvents: () => dispatch(sortEvents()),
    getEvents: () => dispatch(getEvents()),
    clearEventsStore: () => dispatch(clearEventsStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
