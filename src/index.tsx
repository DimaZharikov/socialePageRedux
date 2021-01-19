import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./Store/Store";
import App from "./App";
import {Router, withRouter} from "react-router-dom";





ReactDOM.render(
  <React.StrictMode>

      <Provider store={store} >


        <App  />

      </Provider>




  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
