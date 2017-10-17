// /screens/profile/index.js

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

class Profile extends Component{
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
					title="Profile"
					leftIcon="chevron-left"
					leftPress={() => navigation.goBack(null)} />

				<View style={pro.main}>
					<View style={pro.profilePic}>
						<Image source={{uri: picture.data.url}} style={pro.pic} />
					</View>
					<Animatable.Text animation="fadeInRight" style={pro.name}>
						{ name }
					</Animatable.Text>
				</View>

				<View style={pro.links}>
					<Text style={pro.label}>It looks like you have no friends :(</Text>
					<Text style={pro.label}>Find friends to help wake you up!</Text>
					
					<TouchableOpacity style={pro.link}>
						<Text style={pro.linkText}>Find Friends</Text>
					</TouchableOpacity>	
				</View>

				<View style={pro.signoutWrapper}>
					<TouchableOpacity style={pro.signout} onPress={ this._signOut }>
						<Text style={pro.signoutText}>Sign Out</Text>
					</TouchableOpacity>
				</View>

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
	}
}

export default connect(mapStateToProps)(Profile);