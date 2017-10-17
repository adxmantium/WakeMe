// /components/navHeader.js

import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native'

// styles
import { head } from './../styles/alarm'
import { darkTheme } from './../styles/_global'

const SIZE = 20;

export default ({ title, navigation, leftIcon, leftPress, rightIcon, rightPress, middlePress }) => (

	<View style={head.container}>

		<TouchableOpacity style={head.btn} onPress={ leftPress && leftPress }>
			<Icon 
				name={leftIcon ? leftIcon : "chevron-left"} 
				color={leftIcon ? darkTheme.shade3 : "transparent"} 
				size={SIZE} />
		</TouchableOpacity>

		<TouchableOpacity onPress={ middlePress && middlePress }>
			<Text style={head.title}>{ title || '' }</Text>
		</TouchableOpacity>

		<TouchableOpacity style={head.btn} onPress={ rightPress && rightPress }>
			<Icon 
				name={rightIcon ? rightIcon : "cogs"}
				color={rightIcon ? darkTheme.shade3 : "transparent"} 
				size={SIZE} />
		</TouchableOpacity>

	</View>

)