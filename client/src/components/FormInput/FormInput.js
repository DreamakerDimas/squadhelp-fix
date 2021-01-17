import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormInput = (props) => {
  const {
    label,
    input,
    type,
    classes,
    meta: { touched, error },
  } = props;

  const inputClassName = classNames(classes.input, {
    [classes.notValid]: touched && error,
    [classes.valid]: touched && !error,
  });

  return (
    <div className={classes.container}>
      <input
        {...input}
        placeholder={label}
        type={type}
        className={inputClassName}
      />
      {classes.warning && touched && error && (
        <span className={classes.warning}>{error}</span>
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  type: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
};

export default FormInput;
