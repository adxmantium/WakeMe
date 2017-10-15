// /reducers/waker.js

import * as _actions from './../constants/waker'

const init = {};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.ADD_TO_QUEUE:
			return {...state, ...action.payload};

		default: return state;

	}

}