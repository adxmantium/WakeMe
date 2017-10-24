// /action/waker.js

import _axios from './../api/axios'
import * as route from './../api/routes/user'
import * as _actions from './../constants/waker'

export const add_to_queue = data => ({
	type: _actions.ADD_TO_QUEUE,
	payload: data,
})

export const getWakers = userID => {
  const pendingName = _actions.FETCHING_WAKERS.toLowerCase();
  const done = _actions.FETCHED_WAKERS.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.FETCHING_WAKERS_TYPE}) );  

    // promise
    const response = _axios.waker.post(`${route.WAKERS}?to_fb_user_id=${userID}`);

    response.then(res => {
      console.log('GET wakers: ', res);
      const action = {
        type: _actions.FETCHED_WAKERS_TYPE,
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

export const sendWaker = wakerData => {
  const pendingName = _actions.SENDING_WAKER.toLowerCase();
  const done = _actions.SENT_WAKER.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.SENDING_WAKER_TYPE}) );  

    // promise
    const response = _axios.waker.post(route.WAKERS, wakerData);

    response.then(res => {
      console.log('POST wakers: ', res);
      const action = {
        type: _actions.SENT_WAKER_TYPE,
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