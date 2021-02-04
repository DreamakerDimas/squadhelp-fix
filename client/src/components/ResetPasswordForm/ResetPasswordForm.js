import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { authActionResetMail, clearAuth } from '../../actions/actionCreator';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schemes from '../../validators/validationSchemes';
import Error from '../../components/Error/Error';
import styles from './ResetPasswordForm.module.sass';
class ResetPasswordForm extends React.Component {
  componentWillUnmount() {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.resetRequest(values);
  };

  render() {
    const { message, error, isFetching } = this.props.auth;
    const { handleSubmit, submitting, authClear } = this.props;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };

    return (
      <div className={styles.resetForm}>
        <h2>RESET PASSWORD</h2>
        <h3>
          Write the email of your account and new password. To your email will
          be sent reset link.
        </h3>
        <form onSubmit={handleSubmit(this.clicked)}>
          <Field
            name="email"
            classes={formInputClasses}
            component={FormInput}
            type="text"
            label="Email Address"
          />
          <Field
            name="password"
            classes={formInputClasses}
            component={FormInput}
            type="password"
            label="Password"
          />
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={authClear}
            />
          )}
          {message && <h3>{message}</h3>}
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'SEND'}
            </span>
          </button>
        </form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  auth: PropTypes.object.isRequired,
  resetRequest: PropTypes.func.isRequired,
  authClear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  resetRequest: (data) => dispatch(authActionResetMail(data)),
  authClear: () => dispatch(clearAuth()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'reset',
    validate: customValidator(Schemes.LoginSchema),
  })(ResetPasswordForm)
);
