// /action/user.js

import _axios from './../api/axios'
import * as route from './../api/routes/user'
import * as _actions from './../constants/user'

export const updateUser = data => ({
  type: _actions.UPDATE,
  payload: data,
})

export const saveProfilePic = file => {
  	const pending = 'saving_profile_pic',
    	  done = 'saved_profile_pic';

	return (dispatch) => {
	    dispatch( action.pending({ 
	    	pending, 
	    	type: pending.toUpperCase(),
	    }) );

		// _axios.post(`${action.save}`, file)
  //         .then(res => {
  //            var action = {
  //              type: `_USER:${done.toUpperCase()}`,
  //              payload: {
  //                [done]: true,
  //                [pending]: false,
  //                profile_img_loc: res.data,
  //              }
  //            };

  //            dispatch( action );
  //         })
  //         .catch( err => dispatch( action.error({ pending, err }) ) );
	}
}