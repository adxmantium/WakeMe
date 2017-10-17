// /styles/entry.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const pro = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: _g.darkTheme.shade5,
		// ..._g._border(1, 'red'),
	},
	header: {
		height: _g.header_height,
		alignItems: 'flex-end',
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'space-between',
		..._g._padding(0, 15, 0, 15),
		height: _g.header_height,
		// ..._g._border(1, 'red'),
		width: '100%',
		position: 'absolute',
		top: 0,
	},
	headTitle: {
		color: _g.darkTheme.shade3,
		fontSize: 20,
		fontWeight: '500',
	},
	main: {
		// ..._g._border(1,'red'),
		alignItems: 'center',
	},
	profilePic: {
		width: 60,
		height: 60,
		overflow: 'hidden',
		..._g._borderRadius(5),
	},
	pic: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	name: {
		color: _g.darkTheme.shade3,
		fontSize: 20,
		marginTop: 10,
	}
});