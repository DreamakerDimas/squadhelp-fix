import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CreateEventForm from '../../components/Events/CreateEventForm';
import styles from './EventsPage.module.sass';

const EventsPage = () => {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.eventsNav}>
          <div className="notificationEventsList">Alarmed events</div>
          <div className="eventsList">All events</div>
          <div className="createEvent">Create event</div>
        </div>
        <div className={styles.contentContainer}>
          <CreateEventForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default connect(null, null)(EventsPage);
