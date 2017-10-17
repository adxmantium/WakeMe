// /reducers/user.js

import * as _actions from './../constants/user'

const init = {};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.UPDATE:
			return {...state, ...action.payload};

		case _actions.SIGN_OUT:
			return {...init};

		default: return state;

	}

}