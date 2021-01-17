import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './Notification.module.sass';

const Notification = (props) => {
  return (
    <div>
      <br />
      <span>{props.message}</span>
      <br />
      {props.contestId && (
        <span
          onClick={() => props.history.push(`/contest/${props.contestId}`)}
          className={styles.goToContest}
        >
          Go to contest
        </span>
      )}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  contestId: PropTypes.number,
};

export default withRouter(Notification);
