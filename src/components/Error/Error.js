import React from 'react';
import styles from './error.module.scss';
import icon from './bug.png';

// eslint-disable-next-line react/prop-types
const ErrorIndicator = ({ message }) => (
  <div className={styles.error}>
    <div>
      <img src={icon} alt="error icon" />
    </div>
    <div className={styles.text}>
      Что-то пошло не так. Попробуйте перезагрузить страницу или вернуться сюда позже.
    </div>
    <div className={styles.details}>
      {`подробнее: ${message}`}
    </div>
  </div>
);

export default ErrorIndicator;
