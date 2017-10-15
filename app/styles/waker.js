// /styles/collection.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const waker = StyleSheet.create({
	container: {
		flex: 1,
		..._g._border(1, 'red'),
	},
});