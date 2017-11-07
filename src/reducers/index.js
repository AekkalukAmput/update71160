import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

/*
 * Import reducers from local location
 */
import appReducer from './App.reducers';
import userReducer from './User.reducers';
import dataReducer from './Data.reducers';
import FetchReducer from './Fetch.reducers';
import statReducer from './Stat.reducers';
import sensorReducer from './Sensor.reducers';

/*
 * Combine all to rootReducer
 */
const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  db: dataReducer,
  fetch: FetchReducer,
  stat: statReducer,
  sensor: sensorReducer,

  // combine the reduce router to store
  router: routerReducer
});

export default rootReducer;
