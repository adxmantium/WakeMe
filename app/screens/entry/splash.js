// /screens/entry/splash.js

import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import React, { Component } from 'react'
import { 
	View, 
	Text,
	Image, 
	StatusBar,
} from 'react-native'

// components
import BackgroundImage from './../../components/backgroundImage'

// constants
import { resetStackAndNavTo } from './../../constants/user'

// styles
import { entry } from './../../styles/entry'
import { darkTheme } from './../../styles/_global'

class Splash extends Component{
	constructor(props){
		super(props);
	}

	componentWillReceiveProps(np){
		const { _user: _u } = this.props;
		const { _user: _nu, navigation } = np;

		if( _u.userID !== _nu.userID ){
			let route = 'Entry';

			// if userID is not set, nav to Entry screen to login
			// if userID is set, user is still logged in w/ fb, so we fetch user info w/ graph api
			if( _nu.userID ){
				route = 'Alarm';
			}

			navigation.dispatch( resetStackAndNavTo([route]) );
		}
	}

	render(){
		return (
			<View style={entry.container}>

				<StatusBar barStyle="light-content" />

				<BackgroundImage />

				<Text style={entry.title}>WakeMe</Text>

				<Spinner color={darkTheme.shade3} />

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
	}
}

export default connect(mapStateToProps)(Splash);