import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { TStore, createStore } from './Store/Store';
import { useLocalStore } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';
import { Exercise, Workout } from './Interfaces/Interfaces';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
