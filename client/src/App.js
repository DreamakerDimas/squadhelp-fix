import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ResetPage from './pages/ResetPage/ResetPage';
import ResetTokenPage from './pages/ResetPage/ResetTokenPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import EventsPage from './pages/EventsPage/EventsPage';
import OffersPage from './pages/OffersPage/OffersPage';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/how-it-works" component={HowItWorks} />
          <Route exact path="/events" component={PrivateHoc(EventsPage)} />
          <Route
            exact
            path="/login"
            component={OnlyNotAuthorizedUserHoc(LoginPage)}
          />
          <Route
            exact
            path="/registration"
            component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
          />
          <Route
            exact
            path="/reset"
            component={OnlyNotAuthorizedUserHoc(ResetPage)}
          />
          <Route
            path="/reset/:token"
            component={OnlyNotAuthorizedUserHoc(ResetTokenPage)}
          />
          <Route exact path="/payment" component={PrivateHoc(Payment)} />
          <Route
            exact
            path="/startContest"
            component={PrivateHoc(StartContestPage)}
          />
          <Route
            exact
            path="/startContest/nameContest"
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.NAME_CONTEST,
              title: 'Company Name',
            })}
          />
          <Route
            exact
            path="/startContest/taglineContest"
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.TAGLINE_CONTEST,
              title: 'TAGLINE',
            })}
          />
          <Route
            exact
            path="/startContest/logoContest"
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.LOGO_CONTEST,
              title: 'LOGO',
            })}
          />
          <Route
            exact
            path="/offersModeration"
            component={PrivateHoc(OffersPage)}
          />
          <Route exact path="/dashboard" component={PrivateHoc(Dashboard)} />
          <Route
            exact
            path="/contest/:id"
            component={PrivateHoc(ContestPage)}
          />
          <Route exact path="/account" component={PrivateHoc(UserProfile)} />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    );
  }
}

export default App;
