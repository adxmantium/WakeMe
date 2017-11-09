// /screens/profile/pendingFriends.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
	Text,
	View,
	FlatList,
} from 'react-native'

// styles
import { allf } from './../../styles/profile'

// components
import AllFriendsItem from './allFriendsItem'

class PendingFriends extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const { _friends } = this.props;

		return (
			<View style={allf.container}>

				<Text style={allf.title}>These people are still deciding if they want to be your friend...</Text>

				<FlatList
			        data={ _friends.pending_friends_list || [] }
			        style={ allf.list }
			        initialNumToRender={ 10 }
			        removeClippedSubviews={ false }
			        keyExtractor={ (item, index) => item.friend_fb_user_id }
			        ItemSeparatorComponent={ () => <View style={allf.separator} /> }
			        renderItem={ ({ item }) => <AllFriendsItem {...item} name={item.friend_name} /> }
			    />

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_friends: state._friends,
	}
}

export default connect(mapStateToProps)(PendingFriends);