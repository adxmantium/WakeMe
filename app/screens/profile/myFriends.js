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
		            data={ _f.friends_list || [] }
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