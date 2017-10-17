// /reducers/waker.js

import * as _actions from './../constants/waker'
import * as _userActions from './../constants/user'

const init = {
	queue: []
}

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.ADD_TO_QUEUE:
			return {...state, ...action.payload};

		case _userActions.SIGN_OUT:
			return {...init};

		default: return state;

	}

}