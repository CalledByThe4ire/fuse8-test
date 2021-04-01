import React from 'react';
import styles from './Pagination.module.scss';
import Icon from '../icon';

const Pagination = () => {
  return (
    <div className={styles.Pagination}>
      <button
        className={(styles.PaginationBtn)}
        type="button"
        onClick={() => false}
      >
        <span>See more</span>
        <Icon
          name="shevron"
          width={7}
          height={17}
          viewBox="0 0 7 17"
          fill="#363636"
          SVGClassName="Shevron"
        />
      </button>
    </div>
  );
};

export default Pagination;
