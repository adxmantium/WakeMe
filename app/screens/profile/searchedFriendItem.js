// /screens/profile/searchedFriendItem.js

// libs
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { 
	View, 
	Text, 
	TouchableOpacity 
} from 'react-native'

// styles
import { findf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

export default ({ onPress, ...item }) => (

	<View style={findf.result}>

		<Text style={findf.resultText}>{ item.name }</Text>

		<TouchableOpacity style={findf.resultAdd} onPress={ () => onPress( item ) }>
			<Icon name="user-plus" color={darkTheme.shade3} size={20} />
		</TouchableOpacity>

	</View>

)