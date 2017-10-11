// /reducers/capture.js

import * as _actions from './../constants/camera'

const init = {};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.SAVED:
		case _actions.CAPTURED:
			return {...state, ...action.payload};

		default: return state;

	}

}