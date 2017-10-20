// /constants/user.js

import { NavigationActions } from 'react-navigation'

// r = reducer name
const r = '_USER:';

export const UPDATE = r+'UPDATE'
export const SIGN_OUT = r+'SIGN_OUT'

export const FETCHED_USER_INFO = 'FETCHED_USER_INFO'
export const FETCHING_USER_INFO = 'FETCHING_USER_INFO_PENDING'
export const FETCHED_USER_INFO_TYPE = r+'FETCHED_USER_INFO'
export const FETCHING_USER_INFO_TYPE = r+'FETCHING_USER_INFO_PENDING'

export const pending = ({ pendingName, type, data = {} }) => ({
  type: type || '_USER:GET_REQUEST_PENDING',
  payload: {
    ...data,
    [pendingName]: true,
    [pendingName+'_err']: false,
  }
});

export const error = ({ pendingName, type, err }) => ({
  type: type || '_USER:GET_REQUEST_PENDING_ERR',
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