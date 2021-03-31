import React from 'react';

export const StoreContext = React.createContext(null);

export const actions = {
  GET_ITEMS: 'GET_ITEMS',
  ADD_SEARCH: 'ADD_SEARCH',
  SET_LOADING: 'SET_LOADING',
};

export const createAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const fetchData = ({ fetchHomes }, type) => {
  return async (dispatch) => {
    dispatch(createAction(actions.SET_LOADING));

    const payload = await fetchHomes();

    return dispatch(createAction(actions.GET_ITEMS, payload));
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case actions.GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case actions.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
