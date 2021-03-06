import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { clearEventError, createEvent } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

import customValidator from '../../validators/validator';
import Schemes from '../../validators/validationSchemes';
import FormInput from '../FormInput/FormInput';
import DateInput from '../DateInput/DateInput';
import styles from './CreateEventForm.module.sass';
import CONSTANTS from '../../constants';

const { ALL_EVENTS } = CONSTANTS.EVENTS_CONTENT_TYPES;
const { MOMENT_FORMAT } = CONSTANTS;

const CreateEventForm = (props) => {
  const { isFetching } = props.eventsStore;
  const {
    handleSubmit,
    submitting,
    setSwitcherId,
    createEventRequest,
    sortEvents,
  } = props;

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  const initDate = () => moment().add(1, 'days').startOf('Day');

  // endDate for max day in notificationDate (only for display purposes)
  const [endDate, setEndDate] = useState(initDate());

  const parseDate = (value) =>
    value ? value.format(MOMENT_FORMAT) : initDate().format(MOMENT_FORMAT);

  const formatDate = (value) => (value ? moment(value) : initDate());

  // submit handler
  const submit = (values) => {
    const data = {
      ...values,
      startDate: moment().format(MOMENT_FORMAT),
      isAlarmed: false,
      isEnded: false,
      id: uuidv4(),
    };
    createEventRequest(data);
    sortEvents();
    setSwitcherId(ALL_EVENTS);
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit(submit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.inputLabel}>
            Event name
          </label>
          <Field
            name="name"
            type="text"
            component={FormInput}
            classes={formInputClasses}
            label={'Event name'}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="endDate" className={styles.inputLabel}>
            Event end date
          </label>
          <Field
            name="endDate"
            min={moment().endOf('Day')} // only for correct days disable
            component={DateInput}
            parse={parseDate}
            format={formatDate}
            classes={formInputClasses}
            onChange={(event, nextValue) => {
              setEndDate(moment(nextValue));
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="notificationDate" className={styles.inputLabel}>
            When you want to get notification?
          </label>
          <Field
            name="notificationDate"
            min={moment().endOf('Day')} // only for correct days disable
            max={endDate}
            component={DateInput}
            parse={parseDate}
            format={formatDate}
            classes={formInputClasses}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={styles.submitContainer}
        >
          <span className={styles.inscription}>
            {isFetching ? 'Submitting...' : 'CREATE EVENT'}
          </span>
        </button>
      </form>
    </div>
  );
};

CreateEventForm.propTypes = {
  eventsStore: PropTypes.object.isRequired,
  createEventRequest: PropTypes.func.isRequired,
  errorClear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { eventsStore } = state;
  return { eventsStore };
};

const mapDispatchToProps = (dispatch) => ({
  createEventRequest: (data) => dispatch(createEvent(data)),
  errorClear: () => dispatch(clearEventError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'event',
    touchOnChange: true,
    validate: customValidator(Schemes.CreateEventSchema),
  })(CreateEventForm)
);
