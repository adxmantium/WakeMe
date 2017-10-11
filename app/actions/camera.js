// /action/user.js

import _axios from './../api/axios'
import * as route from './../api/routes/user'
import * as actions from './../constants/camera'

export const captured = data => ({
	type: actions.CAPTURED,
	payload: data,
})

export const saveFile = file => {
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