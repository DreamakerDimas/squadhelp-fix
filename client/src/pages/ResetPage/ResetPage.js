import React from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import Logo from '../../components/Logo';
import styles from './ResetPage.module.sass';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';

const ResetPage = (props) => {
  const changeRoute = () => {
    props.history.replace('/');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          <div className={styles.linkLoginContainer}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <span>Login</span>
            </Link>
            <Link to="/registration" style={{ textDecoration: 'none' }}>
              <span>Signup</span>
            </Link>
          </div>
        </div>
        <div className={styles.loginFormContainer}>
          <ResetPasswordForm changeRoute={changeRoute} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => dispatch(clearErrorSignUpAndLogin()),
  };
};

export default connect(null, mapDispatchToProps)(ResetPage);
