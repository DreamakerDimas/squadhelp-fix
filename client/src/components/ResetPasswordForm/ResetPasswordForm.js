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
        <h2>Write email of your account to reset the password</h2>
        <form>
          <Field
            name="email"
            classes={formInputClasses}
            component={FormInput}
            type="text"
            label="Email Address"
          />
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'Send reset mail'}
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
    validate: customValidator(Schemes.ResetSchema),
  })(ResetPasswordForm)
);
