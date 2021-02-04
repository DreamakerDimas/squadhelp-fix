import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import UserInfo from '../../components/UserInfo/UserInfo';
import PayForm from '../../components/PayForm/PayForm';
import classNames from 'classnames';
import {
  cashOut,
  changeProfileModeView,
  clearPaymentStore,
} from '../../actions/actionCreator';
import styles from './UserProfile.module.sass';
import CONSTANTS from '../../constants';

const UserProfile = (props) => {
  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    props.cashOut({ number, expiry, cvc, sum });
  };

  const {
    balance,
    role,
    profileModeView,
    changeProfileModeView,
    error,
    clearPaymentStore,
  } = props;
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={classNames(styles.optionContainer, {
                [styles.currentOption]:
                  profileModeView === CONSTANTS.USER_INFO_MODE,
              })}
              onClick={() => changeProfileModeView(CONSTANTS.USER_INFO_MODE)}
            >
              UserInfo
            </div>
            {role === CONSTANTS.CREATOR && (
              <div
                className={classNames(styles.optionContainer, {
                  [styles.currentOption]:
                    profileModeView === CONSTANTS.CASHOUT_MODE,
                })}
                onClick={() => changeProfileModeView(CONSTANTS.CASHOUT_MODE)}
              >
                Cashout
              </div>
            )}
          </div>
        </div>
        {profileModeView === CONSTANTS.USER_INFO_MODE ? (
          <UserInfo />
        ) : (
          <div className={styles.container}>
            {parseInt(balance) === 0 ? (
              <span className={styles.notMoney}>
                There is no money on your balance
              </span>
            ) : (
              <div>
                <PayForm
                  sendRequest={pay}
                  submitError={error}
                  clearError={clearPaymentStore}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  balance: PropTypes.string,
  role: PropTypes.string.isRequired,
  profileModeView: PropTypes.string.isRequired,
  error: PropTypes.object,
  cashOut: PropTypes.func.isRequired,
  changeProfileModeView: PropTypes.func.isRequired,
  clearPaymentStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { balance, role } = state.userStore.data;
  const { profileModeView } = state.userProfile;
  const { error } = state.payment;
  return { balance, role, profileModeView, error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cashOut: (data) => dispatch(cashOut(data)),
    changeProfileModeView: (data) => dispatch(changeProfileModeView(data)),
    clearPaymentStore: () => dispatch(clearPaymentStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
