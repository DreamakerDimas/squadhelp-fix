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
    <>
      <div>
        <div className={classes.container}>
          <label htmlFor={id}>
            <input {...input} placeholder={label} id={id} type={type} />
            <div>
              By clicking this checkbox, you agree to our{' '}
              <a href="https://www.google.com" target={'_blank'}>
                Terms of Service.
              </a>
            </div>
          </label>
        </div>
      </div>
      {touched && error && <span className={classes.warning}>{error}</span>}
    </>
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
