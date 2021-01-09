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
    const { error, isFetching } = this.props.auth;
    console.log(isFetching);
    console.log(error);
    return (
      <div>
        {isFetching ? (
          <SpinnerLoader />
        ) : error ? (
          <Error
            data={error.data}
            status={error.status}
            withoutClosing={true}
          />
        ) : (
          <div>Password was reset successfully</div>
        )}
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
