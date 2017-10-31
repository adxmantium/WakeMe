// /screens/entry/index.js

import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { 
	AccessToken, 
	LoginManager, 
	GraphRequest, 
	GraphRequestManager 
} from 'react-native-fbsdk'
import { 
	View, 
	Text,
	Image, 
	Modal,
	StatusBar,
	TouchableOpacity,
} from 'react-native'

// components
import BackgroundImage from './../../components/backgroundImage'

// constants
import { resetStackAndNavTo } from './../../constants/user'

// actions
import { updateUser, getUserInfo } from './../../actions/user'

// styles
import { entry } from './../../styles/entry'
import { darkTheme } from './../../styles/_global'

class Entry extends Component{
	constructor(props){
		super(props);

		this.state = {
			fb_login_pending: false,
			fb_data: {},
		};
	}	

	shouldComponentUpdate(np, ns){
		const { fb_login_pending: thisPending } = this.state;
		const { fb_login_pending: nextPending } = ns;

		// only re-render when pending states are different
		return thisPending !== nextPending;
	}

	_loginWithFacebook = () => {
		// Attempt a login using the Facebook login dialog asking for default permissions.

		// if currently signing in, don't do anything
		if( this.state.fb_login_pending ) return;

		this.setState({fb_login_pending: true});

		LoginManager.logInWithReadPermissions(['public_profile email user_friends'])
		            .then( this._onLoginFinished )
		            .catch( this._onLoginError )
	}

	_onLoginFinished = result => {
		const { dispatch } = this.props;

		if ( result.isCancelled ) this.setState({fb_login_pending: false});
		else this._getFBAccessTokenData();
	}

	_onLoginError = error => {}

	_getFBAccessTokenData = () => {
		const { dispatch } = this.props;

		AccessToken.getCurrentAccessToken()
	           	   .then(data => {
	           	   		this.setState({fb_data: data}); // cache accessToken data
	           	   		new GraphRequestManager()
	           	   			.addRequest(this._getGraphRequest({...data}))
	           	   			.start();
	           	   });
	}

	_getGraphRequest = ({ accessToken }) => {
		const _this = this;

		return new GraphRequest('/me', {
				accessToken,
				parameters: {
					fields: {
						string: 'email,name,first_name,last_name,picture',
					}
				}
			}, 
			_this._graphRequestCallback
		);
	}

	_graphRequestCallback = (error, result) => {
		if( error ){
			// console.log('graph error: ', error);
		}else{
			const { navigation, dispatch } = this.props;
			const userData = {...this.state.fb_data, ...result};

			this.setState({fb_login_pending: false}); // disable spinner

			dispatch( updateUser(userData) ); // save userData to store
			dispatch( getUserInfo(userData) );

			navigation.dispatch( resetStackAndNavTo(['Alarm']) ); // reset stack and nav to Alarm screen
		}
	}

	render(){
		const { fb_login_pending } = this.state;

		return (
			<View style={entry.container}>

				<StatusBar barStyle="light-content" />

				{/*<BackgroundImage blur={100} />*/}

				<Text style={entry.title}>WakeMe</Text>

				<Text style={entry.directions}>Don't worry, nothing will be posted to your Facebook account. We just use Facebook to handle logins so you don't have to create yet ANOTHER username and password.</Text>

				<TouchableOpacity style={entry.login} onPress={ this._loginWithFacebook }>
					<Icon name="facebook-official" color="#fff" size={30} />
					<Text style={entry.loginText}>Login with Facebook</Text>
					{ fb_login_pending && <Spinner color={darkTheme.shade3} style={entry.loader} /> }
				</TouchableOpacity>

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
	}
}

export default connect(mapStateToProps)(Entry);