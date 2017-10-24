// /action/user.js

import _axios from './../api/axios'
import { getFriends } from './friends'
import { saveAlarmData } from './alarm'
import * as route from './../api/routes/user'
import * as _actions from './../constants/user'

export const updateUser = data => ({
  type: _actions.UPDATE,
  payload: data,
})

export const signOut = () => ({
  type: _actions.SIGN_OUT,
  payload: {},
})

export const getUserInfo = ({ userID }) => {
  const pendingName = _actions.FETCHING_USER_INFO.toLowerCase();
  const done = _actions.FETCHED_USER_INFO.toLowerCase();

	return dispatch => {
	  dispatch( _actions.pending({pendingName, type: _actions.FETCHING_USER_INFO_TYPE}) );

    // promise
		const response = _axios.user.get(`${route.USER}?fb_user_id=${userID}`);
    
    // promise then
    response.then(res => {
      const action = {
        type: _actions.FETCHED_USER_INFO_TYPE,
        payload: {
          [done]: true,
          [pendingName]: false,
        }
      };

      // if response does not contain Item, then user is NOT in db - save current user/alarm info now
      if( !res.data.data.Item ) dispatch( saveAlarmData() );
      else{
        // since we know if we get here, user was already saved in db, then fetch user's friends
        action.payload.Item = res.data.data.Item;
        dispatch( getFriends({ userID }) ); // fetches my pending friend requests
        dispatch( getFriends({ userID, type: 'outstanding' }) ); // fetches my outstanding friend requests
      }

      dispatch( action );
    });

    // promise catch
    response.catch(err => dispatch( _actions.error({ pendingName, err }) ) );
	}
}