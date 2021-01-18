import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const FormTextArea = ({ label, input, classes, meta: { touched, error } }) => {
  const { container, inputStyle, notValid, warning } = classes;
  return (
    <div className={container}>
      <textarea
        {...input}
        placeholder={label}
        className={classNames(inputStyle, { [notValid]: touched && error })}
      />
      {touched && error && <span className={warning}>{error}</span>}
    </div>
  );
};

FormTextArea.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  classes: PropTypes.object,
  meta: PropTypes.object,
};

export default FormTextArea;
