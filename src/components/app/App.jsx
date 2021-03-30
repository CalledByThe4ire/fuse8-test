import React, { useReducer } from 'react';
import useMiddlewareReducer from 'use-middleware-reducer';
import thunk from 'redux-thunk';

import styles from './App.module.scss';

import initialState from '../../initialState';
import { reducer, StoreContext, createAction, actions } from '../../reducer';
import { api } from '../../api';

const middleware = [thunk];

const searchItems = (items, search) => {
  if (search.length === 0) {
    return items;
  }

  return items.filter((item) => {
    return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState, middleware);

  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <div className={styles.App}>App goes here</div>
    </StoreContext.Provider>
  );
};

export default App;
