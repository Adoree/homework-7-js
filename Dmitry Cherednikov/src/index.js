import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Root from './components/Root';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
  <Root store={store}/>,
  document.getElementById('root')
);

registerServiceWorker();