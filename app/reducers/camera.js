// /reducers/capture.js

import * as _actions from './../constants/camera'
import * as _userActions from './../constants/user'

const init = {};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.SAVED:
		case _actions.CAPTURED:
			return {...state, ...action.payload};

		case _userActions.SIGN_OUT:
			return {...init};

		default: return state;

	}

}