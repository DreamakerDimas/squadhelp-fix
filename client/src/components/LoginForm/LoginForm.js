import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authActionLogin, clearAuth } from '../../actions/actionCreator';
import styles from './LoginForm.module.sass';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schemes from '../../validators/validationSchemes';
import Error from '../../components/Error/Error';

class LoginForm extends React.Component {
  componentWillUnmount() {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.loginRequest(values);
  };

  render() {
    const { error, isFetching } = this.props.auth;
    const { handleSubmit, submitting, authClear } = this.props;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };

    return (
      <div className={styles.loginForm}>
        <h2>LOGIN TO YOUR ACCOUNT</h2>
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
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'LOGIN'}
            </span>
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  authClear: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (data) => dispatch(authActionLogin(data)),
  authClear: () => dispatch(clearAuth()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'login',
    validate: customValidator(Schemes.LoginSchema),
  })(LoginForm)
);
