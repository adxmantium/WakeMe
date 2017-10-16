// /screens/entry/splash.js

import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'

// components
import BackgroundImage from './../../components/backgroundImage'

// styles
import { entry } from './../../styles/entry'

export default class Splash extends Component{
	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		return (
			<View style={entry.container}>
				<BackgroundImage />
			</View>
		);
	}
}