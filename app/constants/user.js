// /constants/user.js

import { NavigationActions } from 'react-navigation'

// r = reducer name
const r = '_USER:';

export const UPDATE = r+'UPDATE';
export const SIGN_OUT = r+'SIGN_OUT';

export const pending = ({ reducerName, pendingName, type, data = {} }) => ({
  type: `${reducerName || '_USER'}:${type || 'GET_REQUEST_PENDING'}`,
  payload: {
    ...data,
    [pendingName]: true,
    [pendingName+'_err']: false,
  }
});

export const error = ({ reducerName, pendingName, type, err }) => ({
  type: `${reducerName || '_USER'}:${type || 'GET_REQUEST_PENDING_ERR'}`,
  payload: {
    [pendingName]: false,
    [pendingName+'_err']: err,
  }
});

export const resetStackAndNavTo = (routes = []) => {
  return NavigationActions.reset({
          index: routes.length - 1,
          actions: routes.map(routeName => NavigationActions.navigate({ routeName }))
        });
}