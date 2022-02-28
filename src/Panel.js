import React from "react"
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import ReactDOM from "react-dom";
import GlobalStyles from './styles/globalStyles';
import UserLoader from './components/UserLoader';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <GlobalStyles />
      <UserLoader />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
