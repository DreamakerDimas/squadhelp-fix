import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './SlideUp.module.sass';

const SlideUp = () => {
  const [isHided, setHided] = useState(true);

  const containerClass = classNames({
    [styles.container]: true,
    [styles.hided]: isHided,
    [styles.display]: !isHided,
  });

  // scroll setter handler
  const setScrollHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = document.documentElement.scrollTop;
      if (currentPosition <= 500) {
        setHided(true);
        return;
      }
      setHided(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHided]);

  return (
    <div
      className={containerClass}
      onClick={() => {
        if (!isHided) setScrollHandler();
      }}
    >
      <span className={'fas fa-arrow-up'}></span>
    </div>
  );
};

export default SlideUp;
