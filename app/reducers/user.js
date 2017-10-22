// /reducers/user.js

import * as _actions from './../constants/user'

const init = {};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.UPDATE:
		case _actions.SEARCHED_FRIENDS_TYPE:
		case _actions.SEARCHING_FRIENDS_TYPE:
		case _actions.FETCHING_USER_INFO_TYPE:
			return {...state, ...action.payload};

		case _actions.FETCHED_USER_INFO_TYPE:
			var { Item, ...rest } = action.payload;
			return {...state, ...rest};

		case _actions.SIGN_OUT:
			return {...init};	

		default: return state;

	}

}