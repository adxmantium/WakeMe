// /action/user.js

import _axios from './../api/axios'
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

      console.log('res: ', res);

      const action = {
        type: _actions.FETCHED_USER_INFO_TYPE,
        payload: {
          [done]: true,
          [pendingName]: false,
        }
      };

      // if response does not contain Item, then user is NOT in db - save current user/alarm info now
      if( !res.data.data.Item ) dispatch( saveAlarmData() );
      else action.payload.Item = res.data.data.Item;

      dispatch( action );
    });

    // promise catch
    response.catch(err => dispatch( _actions.error({ pendingName, err }) ) );
	}
}

export const searchForFriends = searched => {
  const pendingName = _actions.SEARCHING_FRIENDS.toLowerCase();
  const done = _actions.SEARCHED_FRIENDS.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.SEARCHING_FRIENDS_TYPE}) );  

    // promise
    const response = _axios.user.get(`${route.SEARCH_USER}?searched=${searched}`);

    response.then(res => {
      console.log('search res: ', res);

      const action = {
        type: _actions.FETCHED_USER_INFO_TYPE,
        payload: {
          [done]: true,
          [pendingName]: false,
        }
      }; 
      
      dispatch( action );
    });

    // promise catch
    response.catch(err => dispatch( _actions.error({ pendingName, err }) ) );
  }
}