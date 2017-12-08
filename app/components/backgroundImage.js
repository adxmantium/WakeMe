// /components/backgroundImage.js

import React from 'react'
import { Image } from 'react-native'

import { main } from './../styles/alarm'

export default ({ blur, custom }) => 
	<Image 
		style={main.bg} 
		source={ custom || require('./../images/bg_1.jpg')}
		blurRadius={ blur || 0 } />