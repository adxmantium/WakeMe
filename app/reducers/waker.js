// /reducers/waker.js

import * as _actions from './../constants/waker'
import * as _userActions from './../constants/user'

const init = {
	queue: [],
}

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.UPDATE_WAKER:
		case _actions.ADD_TO_QUEUE:
		case _actions.SENT_WAKER_TYPE:
		case _actions.SENDING_WAKER_TYPE:
		case _actions.FETCHED_WAKERS_TYPE:
		case _actions.FETCHING_WAKERS_TYPE:
		case _actions.DELETED_WAKERS_TYPE:
		case _actions.DELETING_WAKERS_TYPE:
			return {...state, ...action.payload};

		case _userActions.SIGN_OUT:
			return {...init};

		default: return state;

	}

}