import React from 'react';
import { connect } from 'react-redux';
import { authActionReset, clearAuth } from '../../actions/actionCreator';
import Error from '../../components/Error/Error';
import SpinnerLoader from '../../components/Spinner/Spinner';

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
      <div>
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
        {message && <span>{message}</span>}
      </div>
    );
  }
}

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
