import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/actionCreator';
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

const EventsPage = (props) => {
  // --Switcher Controller--
  const [switcherId, setSwitcherId] = useState(ALARMED_EVENTS);

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
        return <div></div>;
      }
      case ALL_EVENTS: {
        return <EventsList eventsArr={eventsArr} />;
      }
      case CREATE_EVENT: {
        return <CreateEventForm />;
      }
    }
  };
  // --End of Switcher Controller--

  // --Events Controller--
  const { eventsStore, getEvents } = props;
  const [eventsArr, setEventsArr] = useState([]);

  // on mount
  useEffect(() => {
    getEvents();
  }, []);

  // set state of eventsArr when store did update
  useEffect(() => {
    setEventsArr(eventsStore.events);
  }, [eventsStore]);

  // --End of Events Controller--

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.eventsNav}>
          <div data-id={ALARMED_EVENTS} onClick={setSwitcherHandler}>
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
    getEvents: () => dispatch(getEvents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
