import React from "react"
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import PanelRoutes from './routes/panel.js';
import ReactDOM from "react-dom";
import Header from './components/Header';
import GlobalStyles from './styles/globalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <GlobalStyles />
      <Header />
      <PanelRoutes />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
