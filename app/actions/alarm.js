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
  const pendingName = _actions.SAVING_ALARM_DATA.toLowerCase();
  const done = _actions.SAVED_ALARM_DATA.toLowerCase();

  return (dispatch, getState) => {

    // if alarmData arg is undefined, use current state of _alarm from store - only used on init
    const { _user, _alarm: _a } = getState();
    const _alarm = alarmData || _a;

    // build data based on how it will be saved to db
    const postData = _actions.buildAlarmData({ _user, _alarm });

    // dispatch pending
    dispatch( _userActions.pending({pendingName, type: _actions.SAVING_ALARM_DATA_TYPE}) );

    // promise
    const response = _axios.user.post(route.USER, postData);

    // promise then
    response.then(res => {
      const action = {
        type: _actions.SAVED_ALARM_DATA_TYPE,
        payload: {
          [done]: true,
          [pendingName]: false,
        }
      }

      dispatch( action );
    });

    // promise catch
    response.catch(err => dispatch( _userActions.error({ pendingName, err }) ) );
  }
}