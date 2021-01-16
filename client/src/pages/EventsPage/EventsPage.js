import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getEvents,
  checkEvents,
  sortEvents,
} from '../../actions/actionCreator';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CreateEventForm from '../../components/Events/CreateEventForm';
import EventsList from '../../components/Events/EventsList';
import styles from './EventsPage.module.sass';
import CONSTANTS from '../../constants';

const {
  CREATE_EVENT,
  ALL_EVENTS,
  ALARMED_EVENTS,
} = CONSTANTS.EVENTS_CONTENT_TYPES;

const EventsPage = ({ eventsStore, checkEvents, sortEvents, getEvents }) => {
  const [eventsArr, setEventsArr] = useState([]);
  const [alarmedEventsArr, setAlarmedEventsArr] = useState([]);
  const [switcherId, setSwitcherId] = useState(ALARMED_EVENTS);

  // --Switcher Controller--
  // set content component
  function setSwitcherHandler(e) {
    e.preventDefault();
    console.log(e.currentTarget.dataset.id);
    setSwitcherId(e.currentTarget.dataset.id);
  }

  // get content component
  const renderContent = () => {
    switch (switcherId) {
      case ALARMED_EVENTS: {
        return <EventsList eventsArr={alarmedEventsArr} />;
      }
      case ALL_EVENTS: {
        return <EventsList eventsArr={eventsArr} />;
      }
      case CREATE_EVENT: {
        return <CreateEventForm sortEvents={sortEvents} />;
      }
    }
  };
  // --End of Switcher Controller--

  // --Events Controller--
  // on mount
  useEffect(() => {
    checkEvents();
    sortEvents();
    getEvents();
  }, []);

  // check events each 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      checkEvents();
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  // set state of eventsArr when store did update
  useEffect(() => {
    setEventsArr(eventsStore.events);
    setAlarmedEventsArr(eventsStore.alarmedEvents);
  }, [eventsStore]);

  // --End of Events Controller--

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.eventsNav}>
          <div data-id={ALARMED_EVENTS} onClick={setSwitcherHandler}>
            {alarmedEventsArr.length > 0 && (
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
  );
};

const mapStateToProps = (state) => {
  const { eventsStore } = state;
  return { eventsStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkEvents: () => dispatch(checkEvents()),
    sortEvents: () => dispatch(sortEvents()),
    getEvents: () => dispatch(getEvents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
