import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  setConfiguration,
  ScreenClassProvider,
  ScreenClassRender,
  Container,
  Row,
  Col,
} from 'react-grid-system';
import useMiddlewareReducer from 'use-middleware-reducer';
import thunk from 'redux-thunk';
import _ from 'lodash';

import styles from './App.module.scss';
import initialState from '../../initialState';
import { reducer, StoreContext, actions, fetchData } from '../../reducer';
import { api } from '../../api';
import Card from '../card';
import Filter from '../filter';

const middleware = [thunk];

const gridConfig = {
  breakpoints: [576, 780, 1280],
  containerWidths: [576, 780, 1180],
  maxScreenClass: 'lg',
  gridColumns: 12,
  gutterWidth: 22,
};

setConfiguration(gridConfig);

const searchItems = (items, search) => {
  if (search.length === 0) {
    return items;
  }

  return items.filter((item) => {
    return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
};

const App = ({ title }) => {
  const [state, dispatch] = useMiddlewareReducer(
    reducer,
    initialState,
    middleware
  );

  useEffect(() => {
    dispatch(fetchData(api.fetchHomes, actions.GET_ITEMS));
  }, [dispatch]);

  return (
    <Router>
      <StoreContext.Provider value={{ dispatch, state }}>
        <div className={styles.App}>
          <h1 className={styles.AppTitle}>{title}</h1>
          {state.items.length === 0 ? (
            <p className={styles.AppAlert}>There is no items to work with</p>
          ) : (
            <ScreenClassProvider>
              <Container style={{ width: 'inherit', marginBottom: '60px' }}>
                <div className={styles.AppContainer}>
                  <Filter />
                  <ScreenClassRender
                    render={(screenClass) => {
                      return (
                        !state.isLoading &&
                        _.chunk(
                          searchItems(state.items, state.search),
                          screenClass === 'lg'
                            ? 3
                            : screenClass === 'md' || screenClass === 'sm'
                            ? 2
                            : 1
                        ).map((chunk, index, array) => {
                          return (
                            <Row
                              key={index}
                              style={{
                                marginBottom: `${
                                  index === array.length - 1
                                    ? 0
                                    : `${
                                        screenClass === 'sm' ||
                                        screenClass === 'xs'
                                          ? '11px'
                                          : screenClass === 'md'
                                          ? '22px'
                                          : '38px'
                                      }`
                                }`,
                              }}
                            >
                              {chunk.map((value) => {
                                const { id, ...props } = value;
                                return (
                                  <Col sm={6} md={6} lg={4} key={id}>
                                    <Card {...props} />
                                  </Col>
                                );
                              })}
                            </Row>
                          );
                        })
                      );
                    }}
                  />
                </div>
              </Container>
            </ScreenClassProvider>
          )}
        </div>
      </StoreContext.Provider>
    </Router>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;
