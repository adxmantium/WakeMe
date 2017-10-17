// /screens/profile/index.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native'

// styles
import { pro } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

class Profile extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const { name, picture } = this.props._user;

		return (
			<View style={pro.container}>

				<View style={pro.header}>
					<TouchableOpacity style={pro.headBtn}>
						<Icon name="user-plus" color={darkTheme.shade3} size={20} />
					</TouchableOpacity>

					<Text style={pro.headTitle}>Profile</Text>

					<TouchableOpacity style={pro.headBtn}>
						<Icon name="cogs" color={darkTheme.shade3} size={20} />
					</TouchableOpacity>
				</View>

				<View style={pro.main}>
					<View style={pro.profilePic}>
						<Image source={{uri: picture.data.url}} style={pro.pic} />
					</View>
					<Text style={pro.name}>{ name }</Text>
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