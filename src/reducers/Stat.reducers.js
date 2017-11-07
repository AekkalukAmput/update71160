const statReducer = (state = {
  resultSTAT:[]
},action) => {
  switch (action.type) {
    case "FETCH_STAT":
      state = {
        ...state,
        resultSTAT : action.payload
      };
    case "FETCH_STAT_FULFILLED":
      state = {
        ...state,
        resultSTAT : action.payload
      };
      break;

    default:
      break;
  }
  return state;
};
export default statReducer
