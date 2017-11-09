// /screens/profile/outstandingFriends.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
	Text,
	View,
	FlatList,
} from 'react-native'

// actions
import { acceptFriendship } from './../../actions/friends'

// styles
import { allf } from './../../styles/profile'

// components
import AllFriendsItem from './allFriendsItem'

class OutstandingFriends extends Component {
	constructor(props){
		super(props);
	}

	_accept = friend => {
		this.props.dispatch( acceptFriendship({...friend, friend_request_accepted: true}) );
	}

	render(){
		const { _friends } = this.props;

		return (
			<View style={allf.container}>

				<Text style={allf.title}>
					{ !_friends.outstanding_list.length ?
						'Outstanding requests list is empty.' : 'These people are waiting on you to respond to their friend request...' }
				</Text>

				{ !!_friends.outstanding_list.length &&
					<FlatList
				        data={ _friends.outstanding_list || [] }
				        style={ allf.list }
				        initialNumToRender={ 10 }
				        removeClippedSubviews={ false }
				        keyExtractor={ (item, index) => item.id }
				        ItemSeparatorComponent={ () => <View style={allf.separator} /> }
				        renderItem={ ({ item }) => <AllFriendsItem {...item} display_name={item.name} onPress={ this._accept } /> }
				    />
				}

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_friends: state._friends,
	}
}

export default connect(mapStateToProps)(OutstandingFriends);