import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/actionCreator';
import EventComponent from './EventComponent/EventComponent';

const EventsList = (props) => {
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

  return (
    <div>
      {eventsArr.map((elem, index) => (
        <EventComponent
          key={index}
          name={elem.name}
          startDate={elem.startDate}
          endDate={elem.endDate}
          notificationDate={elem.notificationDate}
        />
      ))}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
