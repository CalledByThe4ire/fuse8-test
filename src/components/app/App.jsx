import React from 'react';
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
import {
  reducer,
  StoreContext,
  createAction,
  actions,
  fetchData,
} from '../../reducer';
import { api } from '../../api';
import Card from '../card';

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

const App = () => {
  const [state, dispatch] = useMiddlewareReducer(
    reducer,
    initialState,
    middleware
  );
  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <div className={styles.App}>
        <ScreenClassProvider>
          <Container style={{ width: 'inherit' }}>
            <div className={styles.AppContainer}>
              <ScreenClassRender
                render={(screenClass) => {
                  return _.chunk(
                    searchItems(state.items, ''),
                    screenClass === 'lg'
                      ? 3
                      : screenClass === 'md' || screenClass === 'sm'
                      ? 2
                      : 1
                  ).map((chunk, index, array) => {
                    return (
                      <Row
                        style={{
                          marginBottom: `${
                            index === array.length - 1
                              ? 0
                              : `${
                                  screenClass === 'sm' || screenClass === 'xs'
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
                  });
                }}
              />
            </div>
          </Container>
        </ScreenClassProvider>
      </div>
    </StoreContext.Provider>
  );
};

export default App;
