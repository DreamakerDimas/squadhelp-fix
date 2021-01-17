import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressBar.module.sass';

const ProgressBar = (props) => {
  const renderProgress = () => {
    const array = [];
    for (let i = 1; i <= 3; i++) {
      array.push(renderBar(i));
    }
    return array;
  };

  const renderBar = (count) => {
    const currentStep = props.currentStep;
    let classOuter = styles.outerNotActive;
    let classInner = styles.innerNotActive;
    let classProgress = '';
    if (count === currentStep) {
      classOuter = styles.outerActive;
      classInner = styles.innerActive;
      classProgress = styles.progressContainer;
    }
    if (count < currentStep) {
      classOuter = styles.outerComplete;
      classInner = styles.innerComplete;
    }
    return (
      <div className={classProgress} key={count}>
        <div className={styles.progressBarContainer}>
          <div className={classOuter}>
            <div className={classInner}></div>
          </div>
          {count !== 3 && <div className={styles.lineBar}></div>}
        </div>
      </div>
    );
  };

  return <div className={styles.progressBarContainer}>{renderProgress()}</div>;
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
