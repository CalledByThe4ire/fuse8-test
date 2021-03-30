import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import './fonts/opensans-regular.woff';
import './fonts/opensans-regular.woff2';
import './fonts/opensans-bold.woff';
import './fonts/opensans-bold.woff2';

import App from './components/app';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
