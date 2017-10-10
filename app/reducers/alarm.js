// /reducers/user.js

import * as _actions from './../constants/alarm'

const init = {
	hour: '9',
	minute: '18',
	ampm: 'am'
};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.SAVE:
			const { hour, minute, ampm } = action.payload;
			return {...state, hour, minute, ampm};

		default: return state;

	}

}