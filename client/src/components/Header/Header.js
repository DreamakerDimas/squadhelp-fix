import React from 'react';
import Logo from '../Logo';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { clearStore, headerRequest } from '../../actions/actionCreator';
import { controller, chatController } from '../../api/ws/socketController';
import classNames from 'classnames';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFixed: false,
    };
  }

  componentDidMount() {
    if (!this.props.data) {
      this.props.getUser();
    }
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.outerWidth <= 700) {
      this.setState({ isFixed: false });
      return;
    }
    if (window.scrollY >= 80) {
      this.setState({ isFixed: true });
    } else {
      this.setState({ isFixed: false });
    }
  };

  logOut = () => {
    controller.unsubscribe(this.props.data.id);
    chatController.unsubscribeChat(this.props.data.id);
    localStorage.removeItem('accessToken');
    this.props.clearStore();
    this.props.history.replace('/login');
  };

  startContests = () => {
    this.props.history.push('/startContest');
  };

  openOffers = () => {
    this.props.history.push('/offersModeration');
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <span onClick={this.logOut}>Logout</span>
              </li>
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>LOGIN</span>
          </Link>
          <Link to="/registration" style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>SIGN UP</span>
          </Link>
        </>
      );
    }
  };

  render() {
    const headerClass = classNames({
      [styles.navContainer]: true,
      [styles.fixed]: this.state.isFixed,
    });

    if (this.props.isFetching) {
      return null;
    }
    return (
      <>
        <div className={styles.headerContainer}>
          <div className={styles.fixedHeader}>
            <span className={styles.info}>
              Squadhelp recognized as one of the Most Innovative Companies by
              Inc Magazine.
            </span>
            <a href="http://www.google.com">Read Announcement</a>
          </div>
          <div className={styles.loginSignnUpHeaders}>
            <a
              href={`tel:${CONSTANTS.PHONE_NUMBER}`}
              className={styles.numberContainer}
            >
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`}
                alt="phone"
              />
              <span>{CONSTANTS.PHONE_NUMBER}</span>
            </a>
            <div className={styles.userButtonsContainer}>
              {this.renderLoginButtons()}
            </div>
          </div>
          <div className={headerClass}>
            <Logo className={styles.logo} />
            <div className={styles.leftNav}>
              <div className={styles.nav}>
                <ul>
                  <li>
                    <div>
                      <span>NAME IDEAS</span>
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                        alt="menu"
                      />
                    </div>
                    <ul>
                      <li>
                        <a href="http://www.google.com">Beauty</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">Consulting</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">E-Commerce</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">Fashion & Clothing</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">Finance</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">Real Estate</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">Tech</a>
                      </li>
                      <li className={styles.last}>
                        <a href="http://www.google.com">More Categories</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div>
                      <span>CONTESTS</span>
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                        alt="menu"
                      />
                    </div>
                    <ul>
                      <li>
                        <Link to="/how-it-works">HOW IT WORKS</Link>
                      </li>
                      <li>
                        <Link to="/events">EVENTS</Link>
                      </li>
                      <li>
                        <a href="http://www.google.com">PRICING</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">AGENCY SERVICE</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">ACTIVE CONTESTS</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">WINNERS</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">LEADERBOARD</a>
                      </li>
                      <li className={styles.last}>
                        <a href="http://www.google.com">BECOME A CREATIVE</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div>
                      <span>Our Work</span>
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                        alt="menu"
                      />
                    </div>
                    <ul>
                      <li>
                        <a href="http://www.google.com">NAMES</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">TAGLINES</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">LOGOS</a>
                      </li>
                      <li className={styles.last}>
                        <a href="http://www.google.com">TESTIMONIALS</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div>
                      <span>Names For Sale</span>
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                        alt="menu"
                      />
                    </div>
                    <ul>
                      <li>
                        <a href="http://www.google.com">POPULAR NAMES</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">SHORT NAMES</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">INTRIGUING NAMES</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">NAMES BY CATEGORY</a>
                      </li>
                      <li>
                        <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                      </li>
                      <li className={styles.last}>
                        <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div>
                      <span>Blog</span>
                      <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                        alt="menu"
                      />
                    </div>
                    <ul>
                      <li>
                        <a href="http://www.google.com">
                          ULTIMATE NAMING GUIDE
                        </a>
                      </li>
                      <li>
                        <a href="http://www.google.com">
                          POETIC DEVICES IN BUSINESS NAMING
                        </a>
                      </li>
                      <li>
                        <a href="http://www.google.com">CROWDED BAR THEORY</a>
                      </li>
                      <li className={styles.last}>
                        <a href="http://www.google.com">ALL ARTICLES</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              {/* START CONTEST BUTTON FOR CUSTOMER */}
              {this.props.data && this.props.data.role === CONSTANTS.CUSTOMER && (
                <div
                  className={styles.startContestBtn}
                  onClick={this.startContests}
                >
                  START CONTEST
                </div>
              )}
              {/* END of button for CUSTOMER */}

              {/* */}
              {this.props.data && this.props.data.role === CONSTANTS.MODERATOR && (
                <div
                  className={styles.startContestBtn}
                  onClick={this.openOffers}
                >
                  OFFERS
                </div>
              )}
            </div>
          </div>
        </div>
        {this.state.isFixed && <div className={styles.marginTop}></div>}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state.userStore;
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(headerRequest()),
    clearStore: () => dispatch(clearStore()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
