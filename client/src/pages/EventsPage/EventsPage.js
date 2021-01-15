import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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

const EventsPage = () => {
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
        return <EventsList />;
      }
      case CREATE_EVENT: {
        return <CreateEventForm />;
      }
    }
  };

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

export default EventsPage;
