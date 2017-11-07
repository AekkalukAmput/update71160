const sensorReducer = (state = {
  resultSensor:[]
},action) => {
  switch (action.type) {
    case "FETCH_SENSOR":
      state = {
        ...state,
        resultSensor : action.payload
      };
    case "FETCH_SENSOR_FULFILLED":
      state = {
        ...state,
        resultSensor : action.payload
      };
      break;

    default:
      break;
  }
  return state;
};
export default sensorReducer
