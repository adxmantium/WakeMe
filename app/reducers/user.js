// /reducers/user.js

import * as _actions from './../constants/user'

const init = {
	friend_request_notifications: [],
};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.UPDATE:
		case _actions.SENT_NOTIFICATION_TYPE:
		case _actions.FETCHING_USER_INFO_TYPE:
		case _actions.SENDING_NOTIFICATION_TYPE:
			return {...state, ...action.payload};

		case _actions.SENT_NOTIFICATION_TYPE:
			const { friend_request_notification: fr } = action.payload;

			if( fr )
				return {...state, friend_request_notifications: [...state.friend_request_notifications, fr]};

			return {...state};

		case _actions.FETCHED_USER_INFO_TYPE:
			var { Item, ...rest } = action.payload;
			return {...state, ...rest};

		case _actions.SIGN_OUT:
			return {...init};	

		default: return state;

	}

}