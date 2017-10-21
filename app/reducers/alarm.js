// /reducers/user.js

import * as _actions from './../constants/alarm'
import * as _userActions from './../constants/user'

const init = {
	hour: '1',
	minute: '23',
	ampm: 'am',
	repeat: {},
	repeat_label: _actions.EMPTY_REPEAT_LABEL,
	enabled: false,
	next_alarm_day: _actions.EMPTY_NEXT_ALARM_DAY_LABEL,
};

export default (state = init, action) => {

	switch ( action.type ) {

		// cases that don't require additional logic
		case _actions.SAVE:
		case _actions.SAVED_ALARM_DATA_TYPE:
		case _actions.SAVING_ALARM_DATA_TYPE:
			return {...state, ...action.payload};

		// on user info fetch, spread returned alarm info into state
		case _userActions.FETCHED_USER_INFO_TYPE:
			var { Item } = action.payload;

			if( Item ) return {...state, ...Item.alarm};

			return {...state};

		case _userActions.SIGN_OUT:
			return {...init};

		default: return state;

	}

}