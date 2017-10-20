// /action/user.js

import _axios from './../api/axios'
import * as route from './../api/routes/user'
import * as _actions from './../constants/alarm'
import * as _userActions from './../constants/user'

export const saveAlarm = data => ({
	type: _actions.SAVE,
	payload: data,
})

export const saveAlarmData = alarmData => {
  const pending = _actions.SAVING_ALARM_DATA;
  const done = _actions.SAVED_ALARM_DATA;

  return (dispatch, getState) => {

    // if alarmData arg is undefined, use current state of _alarm from store - only used on init
    const { _user, _alarm: _a } = getState();
    const _alarm = alarmData || _a;

    // build data based on how it will be saved to db
    const postData = _actions.buildAlarmData({ _user, _alarm });

    console.log('data: ', postData);

    // dispatch pending
    dispatch( _userActions.pending({pending, type: _actions.SAVING_ALARM_DATA_TYPE}) );

    const response = _axios.user.post(route.USER, postData);

    response.then(res => {
      console.log('post res: ', res);

      const action = {
        type: _actions.SAVED_ALARM_DATA_TYPE,
        payload: {
          [done]: true,
          [pending]: false,
        }
      }
    });

    response.catch(err => dispatch( _userActions.error({ pending, err }) ) );
  }
}