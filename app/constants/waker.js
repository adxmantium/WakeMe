// /constants/camera.js

import moment from 'moment'
import ENV from './../../env'

// r = reducer name
const r = '_WAKER:'

export const ADD_TO_QUEUE = r+'ADD_TO_QUEUE'

export const FETCHED_WAKERS = 'FETCHED_WAKERS'
export const FETCHING_WAKERS = 'FETCHING_WAKERS'
export const FETCHED_WAKERS_TYPE = r+FETCHED_WAKERS
export const FETCHING_WAKERS_TYPE = r+FETCHING_WAKERS

export const SENT_WAKER = 'SENT_WAKER'
export const SENDING_WAKER = 'SENDING_WAKER'
export const SENT_WAKER_TYPE = r+SENT_WAKER
export const SENDING_WAKER_TYPE = r+SENDING_WAKER

export const DELETED_WAKERS = 'DELETED_WAKERS'
export const DELETING_WAKERS = 'DELETING_WAKERS'
export const DELETED_WAKERS_TYPE = r+DELETED_WAKERS
export const DELETING_WAKERS_TYPE = r+DELETING_WAKERS

export const UPDATE_WAKER = r+'UPDATE_WAKER'

export const buildFileName = ({ _user, to_friend, friends_id }) => 
  `${_user.userID}_${to_friend[friends_id]}__${moment().format('YYYY-M-D_H-mm-ss')}`

export const modelWakersTable = ({ _user, to_friend, file_name, file_path }) => ({
  waker_id: file_name,
  from_fb_user_id: _user.userID,
  from_name: _user.name,
  to_fb_user_id: _user.id === to_friend.fb_user_id ? to_friend.friend_fb_user_id : to_friend.fb_user_id,
  to_name: _user.id === to_friend.fb_user_id ? to_friend.friend_name : to_friend.name,
  to_device_token: _user.id === to_friend.fb_user_id ? to_friend.friend_device_token : to_friend.device_token,
  file_path
})

// input: array of wakers
// return: array of waker file names only
export const modelDeleteWakersFromS3 = wakers => 
  wakers.map(waker => ({"Key": waker.file_path.split('/').reverse()[0] }));

// input: array of wakers
// return: array of objects of waker_id's only
export const modelDeleteWakersFromDB = wakers => wakers.map(({ waker_id }) => ({ waker_id }));

// sensitive info required to upload files to my s3 bucket
export const S3_OPTIONS = {
  bucket: ENV.S3_BUCKET,
  region: ENV.S3_REGION,
  accessKey: ENV.S3_ACCESS,
  secretKey: ENV.S3_SECRET,
  awsUrl: ENV.S3_URL,
}

export const MIMETYPES = {
  mov: 'video/quicktime',
  mp4: 'video/mp4',
  avi: 'video/x-msvideo',
  wmv: 'video/x-ms-wmv',
  '3pg': 'video/3gpp',
  ts: 'video/MP2T',
  m3u8: 'application/x-mpegURL',
  flv: 'video/x-flv',
  gif: 'image/gif',
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  bmp: 'image/bmp',
  webp: 'image/webp',
}