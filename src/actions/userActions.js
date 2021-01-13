import {USER_DETAILS} from '../types';
import * as APIs from '../apis';

export const saveUserDetails = (data) => {
  return {type: USER_DETAILS, payload: data};
};

export const login = (params) => {
  return (dispatch) => {
    return APIs.login(params)
      .then((_r) => {
        //-- Handle response here and decide what you want to save.
        let userDetails = _r;
        dispatch(saveUserDetails(userDetails));
        return userDetails;
      })
      .catch((err) => {
        console.log(
          'There has been a problem with your fetch operation: ' + err.message,
        );
      });
  };
};

export const logout = (params) => {
  return (dispatch) => {
    return APIs.logout(params)
      .then((_r) => {
        return _r;
      })
      .catch((err) => {
        console.log(
          'There has been a problem with your fetch operation: ' + err.message,
        );
      });
  };
};

/**
 * MAKE SURE YOU ADD FUNCTION TO THIS METHOD. IT IS USED IN withRedux HOC to add all the functions to Component.
 */

export function dispatchActionsUser(dispatch) {
  return {
    login: (d) => dispatch(login(d)),
    saveUserDetails: (d) => dispatch(saveUserDetails(d)),
    logout: (d) => dispatch(logout(d)),
  };
}
