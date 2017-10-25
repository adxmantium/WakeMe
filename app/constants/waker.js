// /constants/camera.js

import moment from 'moment'

// r = reducer name
const r = '_WAKER:'

export const ADD_TO_QUEUE = r+'ADD_TO_QUEUE'

export const FETCHED_WAKERS = 'FETCHED_WAKERS'
export const FETCHING_WAKERS = 'FETCHING_WAKERS'
export const FETCHED_WAKERS_TYPE = r+'FETCHED_WAKERS'
export const FETCHING_WAKERS_TYPE = r+'FETCHING_WAKERS'

export const SENT_WAKER = 'SENT_WAKER'
export const SENDING_WAKER = 'SENDING_WAKER'
export const SENT_WAKER_TYPE = r+SENT_WAKER
export const SENDING_WAKER_TYPE = r+SENDING_WAKER

export const modelWakersTable = ({ _user, to_friend, file }) => {
  return {
    waker_id: `${_user.userID}_${to_friend.friend_fb_user_id}__${moment().format('YYYY_M_D___H_m_s')}`,
    from_fb_user_id: _user.userID,
    from_name: _user.name,
    to_fb_user_id: to_friend.friend_fb_user_id,
    to_name: to_friend.friend_name,
    to_device_token: to_friend.friend_device_token,
    file
  }
}