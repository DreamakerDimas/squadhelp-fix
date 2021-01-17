import React from 'react';
import MomentInput from 'react-moment-input';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DateInput = (props) => {
  const {
    input,
    min,
    max,
    classes,
    meta: { touched, error },
  } = props;

  const inputClassName = classNames(classes.input, {
    [classes.notValid]: touched && error,
    [classes.valid]: touched && !error,
  });

  return (
    <div className={classes.container}>
      <MomentInput
        {...input}
        className={inputClassName}
        min={min}
        max={max}
        readOnly={false}
        showIcon={true}
        format="YYYY-MM-DD HH:mm"
      />
      {classes.warning && touched && error && (
        <span className={classes.warning}>{error}</span>
      )}
    </div>
  );
};

DateInput.propTypes = {
  input: PropTypes.object,
  min: PropTypes.object,
  max: PropTypes.object,
  classes: PropTypes.object,
  meta: PropTypes.object,
};

export default DateInput;
