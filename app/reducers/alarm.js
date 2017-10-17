// /reducers/user.js

import * as _actions from './../constants/alarm'
import * as _userActions from './../constants/user'

const init = {
	hour: '9',
	minute: '18',
	ampm: 'am',
	repeat: {},
	repeat_label: _actions.EMPTY_REPEAT_LABEL,
	enabled: false,
	next_alarm_day: _actions.EMPTY_NEXT_ALARM_DAY_LABEL,
};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.SAVE:
			return {...state, ...action.payload};

		case _userActions.SIGN_OUT:
			return {...init};

		default: return state;

	}

}