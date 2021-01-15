import React from 'react';
import MomentInput from 'react-moment-input';
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

export default DateInput;
