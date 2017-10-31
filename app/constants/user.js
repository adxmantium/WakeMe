// /constants/user.js

import { NavigationActions } from 'react-navigation'

// r = reducer name
const r = '_USER:';

export const UPDATE = r+'UPDATE'
export const SIGN_OUT = r+'SIGN_OUT'

export const FETCHED_USER_INFO = 'FETCHED_USER_INFO'
export const FETCHING_USER_INFO = 'FETCHING_USER_INFO'
export const FETCHED_USER_INFO_TYPE = r+FETCHED_USER_INFO
export const FETCHING_USER_INFO_TYPE = r+FETCHING_USER_INFO

export const SEARCHED_FRIENDS = 'SEARCHED_FRIENDS'
export const SEARCHING_FRIENDS = 'SEARCHING_FRIENDS'
export const SEARCHED_FRIENDS_TYPE = r+SEARCHED_FRIENDS
export const SEARCHING_FRIENDS_TYPE = r+SEARCHING_FRIENDS

export const FETCHED_FRIENDS = 'FETCHED_FRIENDS'
export const FETCHING_FRIENDS = 'FETCHING_FRIENDS'
export const FETCHED_FRIENDS_TYPE = r+FETCHED_FRIENDS
export const FETCHING_FRIENDS_TYPE = r+FETCHING_FRIENDS

export const ADDED_FRIEND = 'ADDED_FRIEND'
export const ADDING_FRIEND = 'ADDING_FRIEND'
export const ADDED_FRIEND_TYPE = r+ADDED_FRIEND
export const ADDING_FRIEND_TYPE = r+ADDING_FRIEND

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

export const modelUsersTable = ({ _user, _alarm }) => {
  const { ampm, enabled, hour, minute, next_alarm_day, repeat, repeat_label } = _alarm;

  // only want these props of _alarm being saved to db
  const alarm = { ampm, enabled, hour, minute, next_alarm_day, repeat, repeat_label };

  return {
    fb_user_id: _user.userID || '',
    email: _user.email || '',
    name: _user.name || '',
    device_token: _user.onesignal_device_token || '1',
    alarm,
  } 
};

export const modelFriendsTable = ({ _user, friend }) => {
  return {
    id: `${_user.userID}_${friend.fb_user_id}`,
    fb_user_id: _user.userID,
    name: _user.name,
    friend_fb_user_id: friend.fb_user_id,
    friend_name: friend.name,
    friend_device_token: friend.device_token,
    friend_request_accepted: false,
  }
}