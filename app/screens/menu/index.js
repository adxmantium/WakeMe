// /screens/menu/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
	View,
	TouchableOpacity,
} from 'react-native'

// styles
import { darkThemeObj } from './../../styles/alarm'

// constants
const themeObj = darkThemeObj;
const SIZE = 20
const COLOR = themeObj.menuColor;
const BG_COLOR_ACTIVE = themeObj.menuActive;
const BG_COLOR = themeObj.menuInactive;

export default class Menu extends Component{
	constructor(props){
		super(props);
		this.state = {
			active: false,
		}
	}

	render(){
		return (
			<Fab 
				buttonColor={BG_COLOR_ACTIVE}
				position="left"
				offsetX={10}
				offsetY={10}
				style={{borderWidth: 1, borderColor: 'red', flexDirection: 'row'}}
				icon={ <Icon name="clock-o" size={SIZE} color={COLOR} /> }>

					<Fab.Item 
						buttonColor={BG_COLOR}
						onPress={() => console.log("notes tapped!")}>
							<Icon name="camera" size={SIZE} color={COLOR} style={{}} />
					</Fab.Item>

					<Fab.Item 
						buttonColor={BG_COLOR}
						onPress={() => {}}>
							<Icon name="list" size={SIZE} color={COLOR} style={{}} />
					</Fab.Item>

			</Fab>
		);
	}
}