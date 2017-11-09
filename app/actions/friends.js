// /action/friends.js

import axios from 'axios'
import _axios from './../api/axios'
import { saveAlarmData } from './alarm'
import { sendNotification } from './user'
import * as route from './../api/routes/user'
import * as _actions from './../constants/user'

export const searchForFriends = ({ searched, userID }) => {
  const pendingName = _actions.SEARCHING_FRIENDS.toLowerCase();
  const done = _actions.SEARCHED_FRIENDS.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.SEARCHING_FRIENDS_TYPE}) );  

    // promise
    const response = _axios.user.get(`${route.SEARCH_USER}?searched=${searched}&fb_user_id=${userID}`);

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

export const getAllFriends = ({ userID }) => {
  const pendingName = _actions.FETCHING_FRIENDS.toLowerCase();
  const done = _actions.FETCHED_FRIENDS.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.FETCHING_FRIENDS_TYPE}) );  

    // promise
    const acceptedPendingFriends = () => _axios.friends.get(`${route.FRIENDS}?value=${userID}&type=`);
    const outstandingFriends = () => _axios.friends.get(`${route.FRIENDS}?value=${userID}&type=outstanding`);

    const response = axios.all([acceptedPendingFriends(), outstandingFriends()]);

    response.then(axios.spread((accPenFr, outsFr) => {
      const action = {
        type: _actions.FETCHED_FRIENDS_TYPE,
        payload: {
          [done]: true,
          my_user_id: userID,
          [pendingName]: false,
          friends_list: accPenFr.data.data.Items,
          outstanding_list: outsFr.data.data.Items,
        }
      }; 
      
      dispatch( action );
    }));

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
      const action = {
        type: _actions.ADDED_FRIEND_TYPE,
        payload: {
          friendData,
          [done]: true,
          [pendingName]: false,
        }
      }; 
      
      dispatch( action );

      // send friend request notification
      const data = _actions.friendRequestModel( friendData );
      dispatch( sendNotification({ 
        data, 
        notification_type: 'friend_request',
        pending_action_type: _actions.SENDING_NOTIFICATION_TYPE,
        done_action_type: _actions.SENT_NOTIFICATION_TYPE,
      }) );
    });

    // promise catch
    response.catch(err => dispatch( _actions.error({ pendingName, err }) ) );
  }
}

export const acceptFriendship = friendData => {
  const pendingName = _actions.ACCEPTING_FRIENDSHIP.toLowerCase();
  const done = _actions.ACCEPTED_FRIENDSHIP.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.ACCEPTING_FRIENDSHIP_TYPE}) );  

    // promise
    const response = _axios.friends.post(route.FRIENDS, friendData);

    response.then(res => {
      const action = {
        type: _actions.ACCEPTED_FRIENDSHIP_TYPE,
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