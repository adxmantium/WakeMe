// /action/friends.js

import _axios from './../api/axios'
import { saveAlarmData } from './alarm'
import * as route from './../api/routes/user'
import * as _actions from './../constants/user'

export const searchForFriends = searched => {
  const pendingName = _actions.SEARCHING_FRIENDS.toLowerCase();
  const done = _actions.SEARCHED_FRIENDS.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.SEARCHING_FRIENDS_TYPE}) );  

    // promise
    const response = _axios.user.get(`${route.SEARCH_USER}?searched=${searched}`);

    response.then(res => {
      const action = {
        type: _actions.SEARCHED_FRIENDS_TYPE,
        payload: {
          [done]: true,
          [pendingName]: false,
        }
      }; 

      if( res.data.data ){
        action.payload.searchResults = res.data.data.Items;
      }
      
      dispatch( action );
    });

    // promise catch
    response.catch(err => dispatch( _actions.error({ pendingName, err }) ) );
  }
}

export const getFriends = userID => {
  const pendingName = _actions.FETCHING_FRIENDS.toLowerCase();
  const done = _actions.FETCHED_FRIENDS.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.FETCHING_FRIENDS_TYPE}) );  

    // promise
    const response = _axios.friends.get(`${route.FRIENDS}?fb_user_id=${userID}`);

    // promise then
    response.then(res => {
      console.log('get friends res: ', res);
      const action = {
        type: _actions.FETCHED_FRIENDS_TYPE,
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

export const addFriend = friendData => {
  const pendingName = _actions.ADDING_FRIEND.toLowerCase();
  const done = _actions.ADDED_FRIEND.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.ADDING_FRIEND_TYPE}) );  

    // promise
    const response = _axios.friends.post(route.FRIENDS, friendData);

    response.then(res => {
      console.log('res: ', res);
      const action = {
        type: _actions.ADDED_FRIEND_TYPE,
        payload: {
          friendData,
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