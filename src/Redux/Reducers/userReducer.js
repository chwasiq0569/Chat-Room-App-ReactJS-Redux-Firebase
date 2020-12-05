import { CHECK_USER } from "./../Actions/ActionTypes";
const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
