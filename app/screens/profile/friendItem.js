// /screens/profile/friendItem.js

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

export default ({ onPress, ...item }) => {

	const icon = item.added ? 'check-square-o' : 'square-o';

	return (

		<TouchableOpacity style={findf.result} onPress={ () => onPress( item ) }>

			<Text style={findf.resultText}>{ item.friend_name }</Text>
			<Icon name={icon} color={darkTheme.shade3} size={20} />

		</TouchableOpacity>
		
	);	

}