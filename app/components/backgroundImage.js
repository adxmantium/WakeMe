// /components/backgroundImage.js

import React from 'react'
import { Image } from 'react-native'

import { main } from './../styles/alarm'

export default () => <Image style={main.bg} source={require('./../images/bg_1.jpg')} />