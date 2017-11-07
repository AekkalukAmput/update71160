import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import  logger  from 'redux-logger';

import axios from 'axios';

import rootReducer from './reducers';

var session = localStorage.getItem("session");
console.log("Session : "+session);
if (session !== null) {
  var jwtDecode = require('jwt-decode');
  console.log("GG"+session);
  var dec = jwtDecode(localStorage.getItem("session"));
}else {
  var dec = [];
}
console.log(dec);

const history = createHistory();

const middleware = routerMiddleware(history);
const myLogger = (store) => (next) => (action) => {
  console.log("Logged Action: ",action);
  next(action);
}
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      logger,
      middleware,
      thunk,
      promiseMiddleware()
    )
  )
)
store.dispatch(
    {
        type:"FETCH_DATAUSER",
        payload: dec
    }
)
store.dispatch(
  {
    type: "FETCH_REAL",
    payload :new Promise((resolve,reject) => {
      setTimeout(()=>{
        resolve(axios.get('http://127.0.0.1/ProjectReact/getjs.php')
          .then(res => {
            //console.log(res.data);
            return res.data })
          .catch(err => { throw err; }));
      },1000);
    })
  }
)
store.dispatch(
  {
    type: "FETCH_DB",
    payload :new Promise((resolve,reject) => {
      setTimeout(()=>{
        resolve(axios.get('http://127.0.0.1/ProjectReact/getjs.php')
          .then(res => {
            //console.log(res.data);
            return res.data })
          .catch(err => { throw err; }));
      },500);
    })
  }
)
store.dispatch(
  {
    type: "FETCH_STAT",
    payload :new Promise((resolve,reject) => {
      setTimeout(()=>{
        resolve(axios.get('http://127.0.0.1/ProjectReact/database1.php')
          .then(res => {
            //console.log(res.data);
            return res.data })
          .catch(err => { throw err; }));
      },500);
    })
  }
)
store.dispatch(
  {
    type: "FETCH_SENSOR",
    payload :new Promise((resolve,reject) => {
      setTimeout(()=>{
        resolve(axios.get('http://127.0.0.1/ProjectReact/sensor.php')
          .then(res => {
            //console.log(res.data);
            return res.data })
          .catch(err => { throw err; }));
      },600);
    })
  }
)

ReactDOM.render(
<Provider store={store}>
  <ConnectedRouter history={history} >
    <Login />
  </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
