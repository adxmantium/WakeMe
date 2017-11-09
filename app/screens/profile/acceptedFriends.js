// /screens/profile/acceptedFriends.js

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

class AcceptedFriends extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const { _user, _friends } = this.props;

		return (
			<View style={allf.container}>

				<Text style={allf.title}>These people are your friends!</Text>

				<FlatList
			        data={ _friends.accepted_list || [] }
			        style={ allf.list }
			        initialNumToRender={ 10 }
			        removeClippedSubviews={ false }
			        keyExtractor={ (item, index) => item.friend_fb_user_id }
			        ItemSeparatorComponent={ () => <View style={allf.separator} /> }
			        renderItem={ ({ item }) => <AllFriendsItem {...item} name={ _user.userID === item.fb_user_id ? item.friend_name : item.name } /> }
			    />

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_friends: state._friends,
	}
}

export default connect(mapStateToProps)(AcceptedFriends);