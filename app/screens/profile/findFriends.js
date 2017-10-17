// /screens/profile/findFriends.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { LoginManager } from 'react-native-fbsdk'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native'

// components
import NavHeader from './../../components/navHeader'

// styles
import { pro } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

class FindFriends extends Component{
	constructor(props){
		super(props);
	}

	_signOut = () => {
		LoginManager.logOut();
		// dispatch reset state
		// reset stack
	}

	render(){
		const { navigation, _user } = this.props;
		const { name, picture } = _user;

		return (
			<View style={pro.container}>

				<NavHeader
					title="Find Friends"
					leftIcon="chevron-left"
					leftPress={() => navigation.goBack(null)} />

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
	}
}

export default connect(mapStateToProps)(FindFriends);