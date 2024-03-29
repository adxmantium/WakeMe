// /constants/user.js

import moment from 'moment'
import ENV from './../../env'
import { NavigationActions } from 'react-navigation'

// r = reducer name
const r = '_USER:';

export const UPDATE = r+'UPDATE'
export const SIGN_OUT = r+'SIGN_OUT'

export const FETCHED_USER_INFO = 'FETCHED_USER_INFO'
export const FETCHING_USER_INFO = 'FETCHING_USER_INFO'
export const FETCHED_USER_INFO_TYPE = r+FETCHED_USER_INFO
export const FETCHING_USER_INFO_TYPE = r+FETCHING_USER_INFO

// friends
export const UPDATE_FRIENDS = r+'UPDATE_FRIENDS'
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

export const ACCEPTED_FRIENDSHIP = 'ACCEPTED_FRIENDSHIP'
export const ACCEPTING_FRIENDSHIP = 'ACCEPTING_FRIENDSHIP'
export const ACCEPTED_FRIENDSHIP_TYPE = r+ACCEPTED_FRIENDSHIP
export const ACCEPTING_FRIENDSHIP_TYPE = r+ACCEPTING_FRIENDSHIP

export const SENT_NOTIFICATION = 'SENT_NOTIFICATION'
export const SENDING_NOTIFICATION = 'SENDING_NOTIFICATION'
export const SENT_NOTIFICATION_TYPE = r+SENT_NOTIFICATION
export const SENDING_NOTIFICATION_TYPE = r+SENDING_NOTIFICATION

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
  const { ampm, enabled, hour, minute, next_alarm_day, repeat, repeat_label, notifications } = _alarm;

  // only want these props of _alarm being saved to db
  const alarm = { ampm, enabled, hour, minute, next_alarm_day, repeat, repeat_label, notifications };

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
    device_token: _user.onesignal_device_token,
    friend_fb_user_id: friend.fb_user_id,
    friend_name: friend.name,
    friend_device_token: friend.device_token,
    friend_request_accepted: false,
    notification_type: 'friend_request_inquiry',
  }
}

// For sending wakers to myself
export const modelMyself = ({ _user }) => {
  return {
    id: `${_user.id}_${_user.id}`,
    fb_user_id: _user.id,
    name: _user.name,
    device_token: _user.onesignal_device_token,
    friend_fb_user_id: _user.id,
    friend_name: _user.name,
    friend_device_token: _user.onesignal_device_token,
    friend_request_accepted: false,
    notification_type: 'friend_request_inquiry',
  }
}

export const friendRequestModel = notification => ({
  app_id: ENV.ONESIGNAL_APP_ID,
  contents: {en: `${notification.name} wants to be your friend :)`}, // main message
  template_id: ENV.ONESIGNAL_FRIEND_REQUEST_TEMPLATE_ID, // fill rest of fields using template designed on dashboard
  include_player_ids: [notification.friend_device_token], // device token of user who should receive notification
  data: notification
})

export const alarmNotificationModel = ({ _user, alarmData }) => {
  const { hour, minute, ampm, repeat } = alarmData;
  const notifications = [];

  const timezone = new Date().toString().split(' ').reverse()[1]; // get just the timezone
  const hours = ampm === 'pm' ? parseInt(hour) + 12 : hour; // convert to 24 hr clock
  const delivery_time_of_day = moment({ hour, minute }).format('h:mm')+ampm.toUpperCase();
  const delayed_option = 'timezone';
  let date = null;
  let repeat_empty = true;

  for(const day in repeat){
    repeat_empty = false;

    date = moment({ hours, minute }).day(day);

    // if today is after the date, add one week to date, b/c date has already passed
    if( moment().isAfter(date) ) date = date.add(1, 'w');
    
    date = date.format('YYYY-MM-DD HH:mm:ss');

    notifications.push({
      app_id: ENV.ONESIGNAL_APP_ID,
      template_id: ENV.ONESIGNAL_ALARM_TEMPLATE_ID, // fill rest of fields using template designed on dashboard
      include_player_ids: [_user.onesignal_device_token], // my device token
      send_after: `${date} ${timezone}`,
      delayed_option,
      delivery_time_of_day
    });
  }

  // if there are no repeat days selected, just set the alarm for tomorrow
  if( repeat_empty ){
    date = moment({ hours, minute });

    // if today is after the date, add one day to date, b/c date has already passed
    if( moment().isAfter(date) ) date = date.add(1, 'd');
    
    date = date.format('YYYY-MM-DD HH:mm:ss');

    notifications.push({
      app_id: ENV.ONESIGNAL_APP_ID,
      template_id: ENV.ONESIGNAL_ALARM_TEMPLATE_ID, // fill rest of fields using template designed on dashboard
      include_player_ids: [_user.onesignal_device_token], // my device token
      send_after: `${date} ${timezone}`,
      delayed_option,
      delivery_time_of_day
    });
  }

  return notifications;
}