// /action/waker.js

import _axios from './../api/axios'
import * as route from './../api/routes/user'
import * as _actions from './../constants/waker'
import * as _userActions from './../constants/user'

export const updateWaker = payload => ({
  type: _actions.UPDATE_WAKER,
  payload
})

export const add_to_queue = data => ({
	type: _actions.ADD_TO_QUEUE,
	payload: data,
})

// get my wakers
export const getWakers = userID => {
  const pendingName = _actions.FETCHING_WAKERS.toLowerCase();
  const done = _actions.FETCHED_WAKERS.toLowerCase();  

  return dispatch => {
    dispatch( _userActions.pending({pendingName, type: _actions.FETCHING_WAKERS_TYPE}) );  

    // promise
    const response = _axios.waker.get(`${route.WAKERS}?to_fb_user_id=${userID}`);

    response.then(res => {
      // console.log('GET wakers: ', res);
      const action = {
        type: _actions.FETCHED_WAKERS_TYPE,
        payload: {
          [done]: true,
          [pendingName]: false,
        }
      }; 

      if( res.data.data.Items ) action.payload.queue = res.data.data.Items;
      
      dispatch( action );
    });

    // promise catch
    response.catch(err => dispatch( _userActions.error({ pendingName, err }) ) );
  }
}

// send/save waker
export const sendWaker = ({ wakerData, last_waker_to_save }) => {
  const pendingName = _actions.SENDING_WAKER.toLowerCase();
  const done = _actions.SENT_WAKER.toLowerCase();  

  return dispatch => {
    dispatch( _userActions.pending({pendingName, type: _actions.SENDING_WAKER_TYPE}) );  

    // promise
    const response = _axios.waker.post(route.WAKERS, wakerData);

    response.then(res => {
      // console.log('POST wakers: ', res);
      const action = {
        type: _actions.SENT_WAKER_TYPE,
        payload: {
          [done]: true,
          [pendingName]: false,
          last_waker_to_save,
        }
      }; 

      if( res.data.data ){
        action.payload.searchResults = res.data.data.Items;
      }
      
      dispatch( action );
    });

    // promise catch
    response.catch(err => dispatch( _userActions.error({ pendingName, err }) ) );
  }
}

// delete wakers
export const deleteWakers = ({ wakers, wakerObjects }) => {
  const pendingName = _actions.DELETING_WAKERS.toLowerCase();
  const done = _actions.DELETED_WAKERS.toLowerCase();  

  return dispatch => {
    dispatch( _userActions.pending({pendingName, type: _actions.DELETING_WAKERS_TYPE}) );  

    // promise
    const response = _axios.waker.delete(route.WAKERS, {data: { wakers, wakerObjects }});

    response.then(res => {
      console.log('DELETE wakers: ', res);

      const action = {
        type: _actions.DELETED_WAKERS_TYPE,
        payload: {
          queue: [],
          [done]: true,
          [pendingName]: false,
        }
      }; 
      
      dispatch( action );
    });

    // promise catch
    response.catch(err => dispatch( _userActions.error({ pendingName, err }) ) );
  }
}