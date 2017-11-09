// /reducers/friends.js

import * as _actions from './../constants/user'

const init = {
	sendTo_list: [],
	friends_list: [],
	pending_list: [],
	accepted_list: [],
	outstanding_list: [],
	sendTo_list_count: 0,
};

export default (state = init, action) => {

	switch ( action.type ) {

		case _actions.ADDING_FRIEND_TYPE:
		case _actions.FETCHING_FRIENDS_TYPE:
		case _actions.SEARCHING_FRIENDS_TYPE:
			return {...state, ...action.payload};

		// filter out friends from search results
		case _actions.SEARCHED_FRIENDS_TYPE:
			const { searchResults, ...rest } = action.payload;

			if( searchResults && Array.isArray(searchResults) )
				searchResults = findFriendsInSearchResults({
					friends: state.friends_list, 
					results: searchResults
				});

			return {...state, ...rest, searchResults};

		// filter friend types into separate array - accepted, pending, outstanding
		case _actions.FETCHED_FRIENDS_TYPE:
			const { outstanding_list: ol, friends_list: fl, my_user_id, ...restOf } = action.payload;
			
			if( fl && Array.isArray(fl) ) list = fl;
			else if( ol && Array.isArray(ol) ) list = ol;

			if( list ){
				const friendTypes = filterFriendTypes({ list, my_user_id });

				return {
					...state, 
					...restOf,
					friends_list: [...state.friends_list, ...(fl || ol)],
					pending_list: [...state.pending_list, ...(friendTypes.pending || [])],
					accepted_list: [...state.accepted_list, ...(friendTypes.accepted || [])],
					outstanding_list: [...state.outstanding_list, ...(friendTypes.outstanding || [])],
				};
			}	

			return {...state, ...action.payload};

		// filter out added friend from search results
		case _actions.ADDED_FRIEND_TYPE:
			const { friendData, ...others } = action.payload;
			const friends_list = [...state.friends_list, friendData];

			return {
				...state, 
				...others,
				friends_list,
				searchResults: findFriendsInSearchResults({
					friends: friends_list, 
					results: state.searchResults
				})
			};

		// return state back to original
		case _actions.SIGN_OUT:
			return {...init};	

		default: return state;

	}

}

const filterFriendTypes = ({ list, my_user_id }) => {

	const accepted = [], pending = [], outstanding = [];
	const types = {};
	let i;

	for(i = 0; i < list.length; i++){

		// friend -> friend_request_accepted = true
		if( list[i].friend_request_accepted ) accepted.push( list[i] );
		// pending -> friend_request_accepted = false && fb_user_id == my fb_user_id && friend_fb_user_id != my fb_user_id
		else if( !list[i].friend_request_accepted && list[i].fb_user_id == my_user_id ) pending.push( list[i] );
		// outstanding -> friend_request_accepted = false && fb_user_id != my fb_user_id && friend_fb_user_id == my fb_user_id
		else if( !list[i].friend_request_accepted && list[i].fb_user_id != my_user_id ) outstanding.push( list[i] )

	}

	if( accepted.length > 0 ) types.accepted = accepted;
	if( pending.length > 0 ) types.pending = pending;
	if( outstanding.length > 0 ) types.outstanding = outstanding;

	return types;

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