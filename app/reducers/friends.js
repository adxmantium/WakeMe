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

		case _actions.UPDATE_FRIENDS:
		case _actions.ADDING_FRIEND_TYPE:
		case _actions.FETCHING_FRIENDS_TYPE:
		case _actions.SEARCHING_FRIENDS_TYPE:
		case _actions.ACCEPTING_FRIENDSHIP_TYPE:
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
			const friendsList = [...ol, ...fl];

			const friendTypes = filterFriendTypes({ list: friendsList, my_user_id });

			return {
				...state, 
				...restOf,
				friends_list: friendsList,
				pending_list: friendTypes.pending,
				accepted_list: friendTypes.accepted,
				outstanding_list: friendTypes.outstanding,
			};

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

		case _actions.ACCEPTED_FRIENDSHIP_TYPE:
			const { friendData: fd, ...restOfProps } = action.payload;

			return {
				...state,
				...restOfProps,
				outstanding_list: state.outstanding_list.filter(friend => friend.id != fd.id), // we don't want this friend in outstanding list anymore
				accepted_list: [...state.accepted_list, fd], // add this friend to accepted list
				friends_list: [...state.friends_list, fd], // add this friend to accepted list
			}

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
		else if( !list[i].friend_request_accepted && list[i].fb_user_id != my_user_id && list[i].friend_fb_user_id == my_user_id ) outstanding.push( list[i] );

	}

	return { accepted, pending, outstanding };

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