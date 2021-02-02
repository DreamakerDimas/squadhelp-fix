import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './DomainSelector.module.sass';
import CONSTANTS from '../../constants';

const activeButtClass = classNames({
  [styles.buttonContainer]: true,
  [styles.selected]: true,
});

const DomainSelector = ({ input }) => {
  const { DOMAIN_BUTTONS } = CONSTANTS;

  function clickHandler(event) {
    input.onChange(event.currentTarget.dataset.selector);
  }

  const renderButtons = () => {
    return DOMAIN_BUTTONS.map((domain, index) => {
      return (
        <Button
          key={index}
          data-selector={domain.type}
          variant="outline-light"
          className={
            domain.type === input.value
              ? activeButtClass
              : styles.buttonContainer
          }
          onClick={clickHandler}
        >
          <span className={styles.buttonHeader}>{domain.header}</span>
          <span className={styles.buttonText}>{domain.body}</span>
        </Button>
      );
    });
  };

  return (
    <ButtonGroup className={styles.buttonsContainer}>
      {renderButtons()}
    </ButtonGroup>
  );
};

DomainSelector.propTypes = {
  input: PropTypes.object.isRequired,
};

export default DomainSelector;
