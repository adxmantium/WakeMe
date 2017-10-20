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
  const pending = _actions.FETCHING_USER_INFO;
  const done = _actions.FETCHED_USER_INFO;

	return dispatch => {
	  dispatch( _actions.pending({pending, type: _actions.FETCHING_USER_INFO_TYPE}) );

		const response = _axios.user.get(`${route.USER}?fb_user_id=${userID}`);
    
    response.then(res => {

      console.log('res: ', res);
      dispatch( saveAlarmData() );
      return;

      if( res.data.data.Item ){
        const action = {
          type: _actions.FETCHED_USER_INFO_TYPE,
          payload: {
            [done]: true,
            [pending]: false,
            profile_img_loc: res.data,
          }
        };

        dispatch( action );

      }else{

      }
    });
    
    response.catch(err => dispatch( _actions.error({ pending, err }) ) );
	}
}