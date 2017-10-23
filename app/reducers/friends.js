// /reducers/friends.js

import * as _actions from './../constants/user'

const init = {
	friends_list: [],
};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.ADDING_FRIEND_TYPE:
		case _actions.FETCHING_FRIENDS_TYPE:
		case _actions.SEARCHING_FRIENDS_TYPE:
			return {...state, ...action.payload};

		case _actions.FETCHED_USER_INFO_TYPE:
			let { Item } = action.payload;

			if( Item && Array.isArray(Item.friends) ) return {...state, friends_list: Item.friends};
			return {...state};

		case _actions.SEARCHED_FRIENDS_TYPE:
			let { searchResults, ...rest } = action.payload;

			if( searchResults && Array.isArray(searchResults) )
				searchResults = findFriendsInSearchResults({
					friends: state.friends_list, 
					results: searchResults
				});

			return {...state, ...rest, searchResults};

		case _actions.FETCHED_FRIENDS_TYPE:
			return {...state, ...action.payload};

		case _actions.ADDED_FRIEND_TYPE:
			let { friendData, ...others } = action.payload;
			let friends_list = [...state.friends_list, friendData];

			return {
				...state, 
				...others,
				friends_list,
				searchResults: findFriendsInSearchResults({
					friends: friends_list, 
					results: state.searchResults
				})
			};

		case _actions.SIGN_OUT:
			return {...init};	

		default: return state;

	}

}

const findFriendsInSearchResults = ({ friends, results }) => {

	let friendFound = null;

	return results.map(result => {
		friendFound = friends.find(friend => friend.friend_fb_user_id == result.fb_user_id);

		// if friend already exists in friends_list, then mark as already_friends
		if( friendFound ) return {...result, already_friends: true};

		return {...result};
	})	

}