// /constants/user.js

// r = reducer name
const r = '_USER:';

export const UPDATE = r+'UPDATE';

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