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

	<View style={[head.container, theme.bg]}>
		<TouchableOpacity onPress={() => navigation.navigate('Collection')}>
			<Icon name="list" size={SIZE} color={themeObj.menuIcon} />
		</TouchableOpacity>

		<Text style={[head.name, theme.color]}>WakeMe</Text>

		<TouchableOpacity onPress={() => navigation.navigate('Camera')}>
			<Icon name="camera" size={SIZE} color={themeObj.menuIcon} />
		</TouchableOpacity>
	</View>

)
