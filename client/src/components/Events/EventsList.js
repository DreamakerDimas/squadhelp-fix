import React from 'react';
import { connect } from 'react-redux';
import { removeEvent } from '../../actions/actionCreator';
import PropTypes from 'prop-types';
import EventComponent from './EventComponent/EventComponent';
import styles from './EventsList.module.sass';

const EventsList = ({ eventsArr, removeEvent }) => {
  const deleteEvent = (id) => {
    removeEvent(id);
  };

  return (
    <div className={styles.mainContainer}>
      {eventsArr.map((elem, index) => (
        <EventComponent
          key={index}
          name={elem.name}
          startDate={elem.startDate}
          endDate={elem.endDate}
          notificationDate={elem.notificationDate}
          isAlarmed={elem.isAlarmed}
          isEnded={elem.isEnded}
          deleteEvent={() => deleteEvent(elem.id)}
        />
      ))}
    </div>
  );
};

EventsList.propTypes = {
  eventsArr: PropTypes.array.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeEvent: (data) => dispatch(removeEvent(data)),
  };
};

export default connect(null, mapDispatchToProps)(EventsList);
