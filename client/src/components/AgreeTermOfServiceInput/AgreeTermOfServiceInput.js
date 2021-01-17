import React from 'react';
import PropTypes from 'prop-types';

const AgreeTermOfServiceInput = ({
  label,
  id,
  input,
  type,
  classes,
  meta: { touched, error },
}) => {
  return (
    <div>
      <div className={classes.container}>
        <input {...input} placeholder={label} id={id} type={type} />
        <label htmlFor={id}>
          By clicking this checkbox, you agree to our{' '}
          <a href="https://www.google.com" target={'_blank'}>
            Terms of Service.
          </a>
        </label>
      </div>
      {touched && error && <span className={classes.warning}>{error}</span>}
    </div>
  );
};

AgreeTermOfServiceInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  input: PropTypes.object,
  type: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
};

export default AgreeTermOfServiceInput;
