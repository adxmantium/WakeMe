// /components/navHeader.js

import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
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

export default ({ 
	bg,
	title, 
	navigation, 
	notification,
	leftIcon, 
	leftPress, 
	rightIcon, 
	rightPress, 
	middlePress,
	rightIconComponent,
}) => (

	<View style={[head.container, bg && bg]}>

		<TouchableOpacity style={head.btn} onPress={ leftPress && leftPress }>
			<Icon 
				name={leftIcon ? leftIcon : "chevron-left"} 
				color={leftIcon ? darkTheme.shade3 : "transparent"} 
				size={SIZE} />
		</TouchableOpacity>

		<TouchableOpacity style={head.title} onPress={ middlePress && middlePress }>
			<Text style={head.titleText}>{ title || '' }</Text>
			{ !!notification && 
				<Animatable.View style={head.notification} animation="zoomIn" iterationCount={1} easing="ease-out">
					<Text style={head.notificationTxt}>{ notification }</Text>
				</Animatable.View>
			}
		</TouchableOpacity>

		<TouchableOpacity style={head.btn} onPress={ rightPress && rightPress }>
			{
				rightIconComponent ?
					rightIconComponent
					:
					<Icon 
						name={rightIcon ? rightIcon : "cogs"}
						color={rightIcon ? darkTheme.shade3 : "transparent"} 
						size={SIZE} />
			}
		</TouchableOpacity>

	</View>

)