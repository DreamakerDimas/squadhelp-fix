import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';
import Error from '../../components/Error/Error';
import SpinnerLoader from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { authActionReset, clearAuth } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './ResetPage.module.sass';
class ResetTokenPage extends React.Component {
  async componentDidMount() {
    await this.sendData();
  }

  componentWillUnmount() {
    this.props.authClear();
  }

  async sendData() {
    await this.props.resetPasswordRequest(this.getToken());
  }

  getToken() {
    return this.props.match.params.token;
  }

  render() {
    const { message, error, isFetching } = this.props.auth;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.resetContainer}>
          <div className={styles.headerPagesLinks}>
            <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
            <div className={styles.linkContainer}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <span>Login</span>
              </Link>
            </div>
          </div>
          <div className={styles.resetFormContainer}>
            {isFetching ? (
              <SpinnerLoader />
            ) : (
              error && (
                <Error
                  data={error.data}
                  status={error.status}
                  withoutClosing={true}
                />
              )
            )}
            {message && <div className={styles.resetSuccess}>{message}</div>}
          </div>
        </div>
      </div>
    );
  }
}

ResetTokenPage.propTypes = {
  auth: PropTypes.object.isRequired,
  authClear: PropTypes.func.isRequired,
  resetPasswordRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPasswordRequest: (data) => dispatch(authActionReset(data)),
    authClear: () => dispatch(clearAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetTokenPage);
