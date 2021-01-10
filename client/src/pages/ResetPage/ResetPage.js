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
      <div className={styles.resetContainer}>
        <div className={styles.headerPagesLinks}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          <div className={styles.buttonsContainer}>
            <div className={styles.linkContainer}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <span>Login</span>
              </Link>
            </div>
            <div className={styles.linkContainer}>
              <Link to="/registration" style={{ textDecoration: 'none' }}>
                <span>Signup</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.resetFormContainer}>
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
