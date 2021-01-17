import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoleInput.module.sass';

const RoleInput = ({ label, id, strRole, infoRole, input, type }) => {
  return (
    <label htmlFor={id}>
      <div className={styles.roleContainer}>
        <input {...input} type={type} id={id} />
        <div className={styles.infoRoleContainer}>
          <span className={styles.role}>{strRole}</span>
          <span className={styles.infoRole}>{infoRole}</span>
        </div>
      </div>
    </label>
  );
};

RoleInput.propTypes = {
  id: PropTypes.string,
  strRole: PropTypes.string,
  infoRole: PropTypes.string,
  input: PropTypes.object,
  type: PropTypes.string,
};

export default RoleInput;
