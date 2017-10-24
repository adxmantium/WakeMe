// /screens/profile/myFriends.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
} from 'react-native'

// actions
import { addToSendList } from './../../actions/friends'

// components
import FriendItem from './friendItem'
import NavHeader from './../../components/navHeader'

// styles
import { myf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

class MyFriends extends Component{
	constructor(props){
		super(props);
		this.state = {}
	}

	_addToSendList = friend => {
		console.log('friend: ', friend);
		const { dispatch, _friends: _f } = this.props;

		const sendTo_list = _f.sendTo_list.map(item => 
			item.friend_fb_user_id == friend.friend_fb_user_id ? {...item, sendTo: !item.sendTo} : item);

		dispatch( addToSendList({ sendTo_list }) );
	}

	render(){
		const { navigation, _friends: _f } = this.props;

		return (
			<View style={myf.container}>

				<NavHeader
					title="My Friends"
					leftIcon="chevron-left"
					leftPress={() => navigation.goBack(null)} />

				<FlatList
		            data={ _f.sendTo_list || [] }
		            style={myf.list}
		            initialNumToRender={ 10 }
		            removeClippedSubviews={false}
		            keyExtractor={ (item, index) => item.fb_user_id }
		            ItemSeparatorComponent={ () => <View style={myf.separator} /> }
		            renderItem={ ({ item }) => <FriendItem {...item} onPress={ this._addToSendList } /> }
		        />

			</View>
		);
	}
}

const mapStateToProps = (state, props) => ({
	_user: state._user,
	_friends: state._friends,
})

export default connect(mapStateToProps)(MyFriends);