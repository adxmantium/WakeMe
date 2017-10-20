// /action/user.js

import _axios from './../api/axios'
import * as routes from './../api/routes/user'
import * as _actions from './../constants/camera'
import * as _userActions from './../constants/user'

export const captured = data => ({
	type: _actions.CAPTURED,
	payload: data,
})

export const saveWakeupCall = file => {
  	const pending = 'saving_file',
      	  done = 'saved_file';

	return (dispatch) => {
    dispatch( _userActions.pending({pending: true, type: _actions.SAVING_FILE}) );

		const response = _axios.wakeupcall.post(`${routes.WAKEUP_CALLS}`, {from: 'WakeMe app! :)'});
    
    response.then(res => {
      console.log('res: ', res);
      return;

      const action = {
        type: _actions.SAVED_FILE,
        payload: {
          [done]: true,
          [pending]: false,
          profile_img_loc: res.data,
        }
      };

      dispatch( action );
    })
    
    response.catch( err => dispatch( _userActions.error({ pending, err }) ) );
	}
}