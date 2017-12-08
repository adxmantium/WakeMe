// /components/infoModal.js

import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { 
	Text, 
	View, 
	Modal,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native'

// styles
import { info } from './../styles/entry'

export default ({ title, body, actions, close }) => (

	<Modal 
		animationType="slide"
		transparent={true}
		onRequestClose={() => {}}
		visible={true}>

			<View style={info.container}>	

				<TouchableHighlight style={info.innerContainer} onPress={ close }>
					<View>

						{ close && <View style={info.close}><Icon name="times" color="#fff" size={20} /></View> }

						<Text style={info.title}>{ title }</Text>

						{ body.map(txt => <Text style={info.body} key={txt}>{ txt }</Text>) }

						<View style={info.actions}>
							{ !!actions && actions.map(btn => <TouchableOpacity key={btn.name} style={info.action} onPress={btn.onPress}>
																<Text style={[info.actionTxt, info[btn.name]]}>{ btn.title }</Text>
															 </TouchableOpacity>) 
							}
						</View>
						
					</View>
				</TouchableHighlight>

			</View>

	</Modal>

);