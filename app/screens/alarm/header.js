// /screens/alarm/header.js

import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

// styles
import { 
	head, 
	darkTheme, 
	darkThemeObj 
} from './../../styles/alarm'

const SIZE = 20;
const theme = darkTheme;
const themeObj = darkThemeObj;

export default ({ navigation }) => (

	<View style={[head.container]}>
		<TouchableOpacity onPress={() => navigation.navigate('Collection')} style={head.btn}>
			<Icon name="list" size={SIZE} color={themeObj.menuIcon} />
		</TouchableOpacity>

		<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
			<Text style={[head.name, theme.color]}>WakeMe</Text>
		</TouchableOpacity>

		<TouchableOpacity onPress={() => navigation.navigate('Camera')} style={head.btn}>
			<Icon name="camera" size={SIZE} color={themeObj.menuIcon} />
		</TouchableOpacity>
	</View>

)
