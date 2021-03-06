import React from 'react';
import styles from './ContestContainer.module.sass';
import Spinner from '../../components/Spinner/Spinner';

class ContestsContainer extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    const { isFetching, haveMore } = this.props;
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (haveMore && !isFetching) {
        this.props.loadMore(this.props.children.length);
      }
    }
  };

  render() {
    const { isFetching, children } = this.props;
    if (!isFetching && children.length === 0) {
      return <div className={styles.notFound}>Nothing not found</div>;
    } else {
      return (
        <div>
          {children}
          {isFetching && (
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          )}
        </div>
      );
    }
  }
}

export default ContestsContainer;
