// /action/waker.js

import _axios from './../api/axios'
import * as route from './../api/routes/user'
import * as _actions from './../constants/waker'

export const add_to_queue = data => ({
	type: _actions.ADD_TO_QUEUE,
	payload: data,
})

export const sendWakeUpCall = ({ friends, file }) => {
  const pendingName = _actions.SENDING_WAKEUPCALL.toLowerCase();
  const done = _actions.SENT_WAKEUPCALL.toLowerCase();  

  return dispatch => {
    dispatch( _actions.pending({pendingName, type: _actions.SENDING_WAKEUPCALL_TYPE}) );  

    // promise
    const response = _axios.waker.get(`${route.SEARCH_USER}?searched=${searched}&fb_user_id=${userID}`);

    response.then(res => {
      const action = {
        type: _actions.SENT_WAKEUPCALL_TYPE,
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