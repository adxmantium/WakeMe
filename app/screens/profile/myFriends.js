// /screens/profile/myFriends.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
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

	shouldComponentUpdate(np, ns){
		const { sendTo_list_count: this_count } = this.props._friends;
		const { sendTo_list_count: next_count } = np._friends;

		// only update when a sendTo_list_count has changed
		return this_count !== next_count;
	}

	_addToSendList = friend => {
		const { dispatch, _friends: _f } = this.props;

		// update this friends sendTo prop in sendTo_list
		const sendTo_list = _f.sendTo_list.map(item => 
			item.friend_fb_user_id == friend.friend_fb_user_id ? {...item, sendTo: !item.sendTo} : item);

		// get count of !!sendTo friends in list
		const sendTo_list_count = sendTo_list.filter(item => item.sendTo).length;

		dispatch( addToSendList({ sendTo_list, sendTo_list_count }) );
	}

	render(){
		const { navigation, _friends: _f } = this.props;
		const title = navigation.state.params.title || 'My Friends';

		return (
			<View style={myf.container}>

				<NavHeader
					title={ title }
					leftIcon="chevron-left"
					rightIconComponent={
						_f.sendTo_list_count && <View style={myf.send}>
							<Icon name="paper-plane" size={18} color={darkTheme.shade2} />
							<Text style={myf.count}>({ _f.sendTo_list_count || 0 })</Text>
						</View>
					}
					leftPress={ () => navigation.goBack(null) } />

				<FlatList
		            data={ _f.sendTo_list || [] }
		            style={ myf.list }
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