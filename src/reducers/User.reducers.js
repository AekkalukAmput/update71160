const userReducer = (state =  {
  name : "ruj",
  resultuser : {

      results: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IiIsInVzZXJuYW1lIjoiIiwibmFtZSI6IiIsInN0YXR1cyI6IjAifQ.d7UOSMYD8IsQbLyiSdSpMdwA2mgn_ioGXFV7C26eSzQ"

  },
  datauser : []
    }, action ) => {
      switch(action.type) {
        case "FETCH_USER":
        state={
          ...state,
          resultuser : action.payload
        };
        break;
        case "FETCH_USER_FULFILLED":
        state={
          ...state,
          resultuser : action.payload
        };
        break;
          case "FETCH_DATAUSER":
              state={
                  ...state,
                  datauser : action.payload
              };
              break;

        default:
          break;
      }
      return state;
    };
    export default userReducer;
