import { CHECK_USER } from "./ActionTypes";

export const check_User = (user) => {
  return {
    type: CHECK_USER,
    payload: user,
  };
};
