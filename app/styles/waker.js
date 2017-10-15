// /styles/collection.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const wake = StyleSheet.create({
	container: {
		flex: 1,
		// ..._g._border(1, 'red'),
	},
	header: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		height: _g.header_height,
		position: 'absolute',
		width: '100%',
		..._g._padding(0, 15, 0, 15),
		zIndex: 1,
		backgroundColor: 'transparent',
	},
	pagination: {
		color: _g.white,
		backgroundColor: 'transparent',
	},
	player: {
		flex: 1,
	},
	file: {
		flex: 1,
		width: undefined,
		height: undefined,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
	},
});