// /action/user.js

import _axios from './../api/axios'
import { sendNotification } from './user'
import * as route from './../api/routes/user'
import * as _actions from './../constants/alarm'
import * as _userActions from './../constants/user'

export const saveAlarmData = ({ alarmData, alarmNotifications }) => {
  const pendingName = _actions.SAVING_ALARM_DATA.toLowerCase();
  const done = _actions.SAVED_ALARM_DATA.toLowerCase();

  return (dispatch, getState) => {

    // if alarmData arg is undefined, use current state of _alarm from store - only used on init
    const { _user, _alarm: _a } = getState();
    const _alarm = alarmData || _a;

    // build data based on how it will be saved to db
    const postData = _userActions.modelUsersTable({ _user, _alarm });

    // dispatch pending
    const pendingAction = {
      pendingName, 
      type: _actions.SAVING_ALARM_DATA_TYPE
    };

    // if alarmData is set, pass alarmData as pending data so view updates reflecting alarm changes while saving
    if( alarmData ) pendingAction.data = alarmData;

    dispatch( _userActions.pending(pendingAction) );

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