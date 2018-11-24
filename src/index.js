import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import App from './containers/App';

import registerServiceWorker from './registerServiceWorker';

import './static/reset.css';
import './static/main.css';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
document.getElementById('root'));

registerServiceWorker();
