// /reducers/user.js

import * as _actions from './../constants/alarm'

const init = {
	hour: '9',
	minute: '18',
	ampm: 'am',
	repeat: {},
	repeat_label: 'Never',
	enabled: false,
};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.SAVE:
			return {...state, ...action.payload};

		default: return state;

	}

}