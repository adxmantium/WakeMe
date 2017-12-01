// /components/infoModal.js

import React from 'react'
import { 
	Text, 
	View, 
	Modal,
	TouchableOpacity,
} from 'react-native'

// styles
import { info } from './../styles/entry'

export default ({ title, body, actions }) => (

	<Modal 
		animationType="slide"
		transparent={true}
		onRequestClose={() => {}}
		visible={true}>

			<View style={info.container}>

				<View style={info.innerContainer}>

					<Text style={info.title}>{ title }</Text>

					{ body.map(txt => <Text style={info.body} key={txt}>{ txt }</Text>) }

					<View style={info.actions}>
						{ actions.map(btn => <TouchableOpacity key={btn.name} style={info.action} onPress={btn.onPress}>
												<Text style={[info.actionTxt, info[btn.name]]}>{ btn.title }</Text>
											 </TouchableOpacity>) 
						}
					</View>

				</View>

			</View>

	</Modal>

);