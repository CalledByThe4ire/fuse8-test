import React from 'react';

import Shevron from './Shevron';

const Icon = (props) => {
  switch (props.name) {
    case 'shevron':
      return <Shevron {...props} />;
    default:
      return;
  }
};

export default Icon;
