import React, { useState, useEffect } from 'react';
import moment from 'moment';
import MomentInput from 'react-moment-input';
import styles from './CreateEventForm.module.sass';
import Error from '../Error/Error';
import { clearEventError, createEvent } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import customValidator from '../../validators/validator';
import Schemes from '../../validators/validationSchemes';

const CreateEventForm = (props) => {
  const { error, isFetching } = props.eventsStore;
  const { submitting, errorClear } = props;
  const initDate = () => moment().add(1, 'days').startOf('Day');

  const [eventName, setEventName] = useState('');
  const [endDate, setEndDate] = useState(initDate);
  const [notificationDate, setNotificationDate] = useState(initDate);
  const [isEndDateError, setEndDateError] = useState(false);
  const [isNotificationDateError, setNotificationDateError] = useState(false);

  const checkDates = () => {
    setEndDateError(!endDate.isAfter(moment()));
    setNotificationDateError(
      !notificationDate.isAfter(moment()) || !notificationDate.isBefore(endDate)
    );
  };

  const clicked = () => {
    const creationDate = moment().format();
    const notificationDateString = notificationDate.format();
    const endDateString = endDate.format();
    const data = {
      name: eventName,
      creationDate,
      notificationDate: notificationDateString,
      endDate: endDateString,
    };
    console.log(data);
    props.createEventRequest(data);
  };

  useEffect(() => {
    checkDates();
  }, [endDate, notificationDate]);

  return (
    <div className={styles.mainContainer}>
      <h2>Create Event</h2>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <span className={styles.inputLabel}>Event name</span>
          <input
            name="name"
            type="text"
            value={eventName}
            onChange={(event) => {
              setEventName(event.target.value);
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <span className={styles.inputLabel}>Event end date</span>
          <MomentInput
            name="date"
            min={moment().endOf('Day')} // only for correct days disable
            readOnly={false}
            showIcon={true}
            format="YYYY-MM-DD HH:mm"
            value={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
          />
          {isEndDateError && (
            <div className={styles.dateError}>End date should be in future</div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <span className={styles.inputLabel}>
            When you want to get notification?
          </span>
          <MomentInput
            id="notificationTime"
            name="notificationTime"
            min={moment().endOf('Day')} // only for correct days disable
            max={endDate.startOf('Day')} // only for correct days disable
            readOnly={false}
            showIcon={true}
            format="YYYY-MM-DD HH:mm"
            value={notificationDate}
            onChange={(date) => {
              setNotificationDate(date);
            }}
          />
          {isNotificationDateError && (
            <div className={styles.dateError}>
              Notification date should be between current date and end of event
              date
            </div>
          )}
        </div>

        <button
          onClick={clicked}
          disabled={submitting || isEndDateError || isNotificationDateError}
          className={styles.submitContainer}
        >
          <span className={styles.inscription}>
            {isFetching ? 'Submitting...' : 'CREATE'}
          </span>
        </button>
      </div>
      {error && (
        <div>
          {error} <span onClick={errorClear()}>x</span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { eventsStore } = state;
  return { eventsStore };
};

const mapDispatchToProps = (dispatch) => ({
  createEventRequest: (data) => dispatch(createEvent(data)),
  errorClear: () => dispatch(clearEventError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventForm);
