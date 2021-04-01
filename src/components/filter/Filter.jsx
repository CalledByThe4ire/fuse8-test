import React, { useContext } from 'react';

import { StoreContext, createAction, actions } from '../../reducer';
import styles from './Filter.module.scss';

const Filter = () => {
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const state = store.state;

  const handleInput = ({ target: { value } }) => {
    const trimmedValue = value.trim();

    dispatch(createAction(actions.ADD_SEARCH, trimmedValue));
  };
  return (
    <form className={styles.Filter}>
      <label className={styles.FilterLabel} htmlFor="filter">
        Filter
      </label>
      <input
        className={styles.FilterInput}
        type="text"
        id="filter"
        placeholder="Type smth to filter"
        value={state.search}
        onInput={handleInput}
        maxLength={60}
      />
    </form>
  );
};

export default Filter;
