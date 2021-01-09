import React from 'react';
import { Field } from 'redux-form';

class ResetPasswordForm extends React.Component {
  componentWillUnmount() {
    this.props.authClear();
  }

  resetRequest = () => {};

  render() {
    const { handleSubmit, submitting, auth, authClear } = this.props;
    const { error } = auth;
    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };

    return (
      <div className={styles.resetForm}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        <h2>
          Write email of your account and new password, on your mail will be
          sended reset link.
        </h2>
        <form>
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

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  resetRequest: (data) => dispatch(authActionReset(data)),
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
