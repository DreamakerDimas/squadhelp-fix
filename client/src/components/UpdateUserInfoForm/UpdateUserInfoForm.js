import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearUserError } from '../../actions/actionCreator';
import styles from './UpdateUserInfoForm.module.sass';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schemes from '../../validators/validationSchemes';
import Error from '../../components/Error/Error';

const UpdateUserInfoForm = (props) => {
  const { handleSubmit, submitting, error, clearUserError } = props;
  return (
    <form onSubmit={handleSubmit} className={styles.updateContainer}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearUserError}
        />
      )}
      <div className={styles.container}>
        <span className={styles.label}>First Name</span>
        <Field
          name="firstName"
          component={FormInput}
          type="text"
          label="First Name"
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.error,
            notValid: styles.notValid,
          }}
        />
      </div>
      <div className={styles.container}>
        <span className={styles.label}>Last Name</span>
        <Field
          name="lastName"
          component={FormInput}
          type="text"
          label="LastName"
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.error,
            notValid: styles.notValid,
          }}
        />
      </div>
      <div className={styles.container}>
        <span className={styles.label}>Display Name</span>
        <Field
          name="displayName"
          component={FormInput}
          type="text"
          label="Display Name"
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.error,
            notValid: styles.notValid,
          }}
        />
      </div>
      <Field
        name="file"
        component={ImageUpload}
        classes={{
          uploadContainer: styles.imageUploadContainer,
          inputContainer: styles.uploadInputContainer,
          imgStyle: styles.imgStyle,
        }}
      />
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
};

UpdateUserInfoForm.propTypes = {
  error: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  clearUserError: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { data, error } = state.userStore;
  return {
    error,
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUserError: () => dispatch(clearUserError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'updateProfile',
    validate: customValidator(Schemes.UpdateUserSchema),
  })(UpdateUserInfoForm)
);
