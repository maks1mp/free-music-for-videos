import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/view/container';
import { Provider } from 'react-redux';
import { store } from './app/store/index';

/* import requestsMiddleware from './app/actions/middlewares'; */

 /* applyMiddleware(requestsMiddleware) */

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
