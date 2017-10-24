// /constants/camera.js

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
    waker_id: `${_user.userID}_${friend.fb_user_id}`,
    from_fb_user_id: _user.userID,
    from_name: _user.name,
    to_fb_user_id: to_friend.fb_user_id,
    to_name: to_friend.name,
    to_device_token: to_friend.device_token,
    // file: file.path,
  }
}