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
import { sendWakeUpCall } from './../../actions/waker'

// components
import FriendItem from './friendItem'
import NavHeader from './../../components/navHeader'

// styles
import { myf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

class MyFriends extends Component{
	constructor(props){
		super(props);
		this.state = {
			sendTo_list: [...props._friends.accepted_friends_list],
			sendTo_list_count: 0,
		}
	}

	shouldComponentUpdate(np, ns){
		const { sendTo_list_count: this_count } = this.state;
		const { sendTo_list_count: next_count } = ns;

		// only update when a sendTo_list_count has changed
		return this_count !== next_count;
	}

	_addToSendList = friend => {
		const { sendTo_list: oldList } = this.state;

		// update this friends sendTo prop in sendTo_list
		const sendTo_list = oldList.map(item => 
			item.friend_fb_user_id == friend.friend_fb_user_id ? {...item, sendTo: !item.sendTo} : item);

		// get count of !!sendTo friends in list
		const sendTo_list_count = sendTo_list.filter(item => item.sendTo).length;

		this.setState({ sendTo_list, sendTo_list_count });
	}

	_send = () => {
		const { sendTo_list } = this.state;
		const { dispatch, _friends, _camera } = this.props;
		const { capturedFile: file } = _camera;

		// get only the friends that have been selected to sendTo
		const friends = sendTo_list.filter(item => !!item.sendTo);

		dispatch( sendWakeUpCall({ friends, file }) );
	}

	render(){
		const { navigation } = this.props;
		const { sendTo_list, sendTo_list_count } = this.state;
		const title = navigation.state.params.title || 'My Friends';

		return (
			<View style={myf.container}>

				<NavHeader
					title={ title }
					leftIcon="chevron-left"
					rightIconComponent={
						sendTo_list_count && <View style={myf.send}>
							<Icon name="paper-plane" size={18} color={darkTheme.shade2} />
							<Text style={myf.count}>({ sendTo_list_count || 0 })</Text>
						</View>
					}
					rightPress={ this._send }
					leftPress={ () => navigation.goBack(null) } />

				<FlatList
		            data={ sendTo_list || [] }
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