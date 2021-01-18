import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { change } from 'redux-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './DomainSelector.module.sass';
import CONSTANTS from '../../constants';

const activeButtClass = classNames({
  [styles.buttonContainer]: true,
  [styles.selected]: true,
});

const DomainSelector = (props) => {
  const {
    input,
    meta: { dispatch, form },
  } = props;

  const {
    DOMAIN_TYPES_ARR,
    DOMAIN_BUTT_HEADERS,
    DOMAIN_BUTT_TEXTS,
  } = CONSTANTS;

  // only for display purposes
  const [selectedId, setSelectedId] = useState(DOMAIN_TYPES_ARR[1]); // ! Hardcoded default value !

  // dispatch domain value in redux contestForm on selector update
  useEffect(() => {
    async function dispatchOnUpdate() {
      await dispatch(change(form, input.name, selectedId));
    }
    dispatchOnUpdate();
  }, [selectedId]);

  function clickHandler(event) {
    event.preventDefault();
    setSelectedId(event.currentTarget.dataset.selector);
  }

  const renderButtons = () => {
    return DOMAIN_TYPES_ARR.map((selector, index) => {
      return (
        <Button
          key={index}
          data-selector={selector}
          variant="outline-light"
          className={
            selector === selectedId ? activeButtClass : styles.buttonContainer
          }
          onClick={clickHandler}
        >
          <span className={styles.buttonHeader}>
            {DOMAIN_BUTT_HEADERS[selector]}
          </span>
          <span className={styles.buttonText}>
            {DOMAIN_BUTT_TEXTS[selector]}
          </span>
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
  input: PropTypes.object,
  meta: PropTypes.object.isRequired,
};

export default DomainSelector;
