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

// actions
import { signOut } from './../../actions/user'

// styles
import { pro } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

// constants
import { resetStackAndNavTo } from './../../constants/user'

class Profile extends Component{
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(np, ns){
		const { _user: _nu } = np;
		return !!_nu.id;
	}

	_signOut = () => {
		const { navigation, dispatch } = this.props;
		// logout from fb
		LoginManager.logOut();
		// dispatch reset state
		dispatch( signOut() );
		// reset stack
		navigation.dispatch( resetStackAndNavTo(['Entry']) );
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
					
					<TouchableOpacity style={pro.link} onPress={() => navigation.navigate('FindFriends')}>
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