// /styles/camera.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const cap = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	preview: {
		flex: 1,
	    justifyContent: 'flex-end',
	    alignItems: 'center',
	},
	capture: {
	    padding: 15,
	    margin: 40,
	    backgroundColor: '#fff',
	    ..._g._borderRadius(100),
	},
	headIcon: {
		backgroundColor: 'transparent',
		height: 30,
		width: 29,
		..._g._padding(0, 0, 0, 1),
	},
	close: {
		..._g._padding(3, 0, 0, 0),
	},
	captureBtn: {
		width: 70,
		height: 70,
		marginBottom: 20,
		..._g._borderRadius(100),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	upload: {
		..._g._border(1, '#fff'),
		borderRadius: 100,
		padding: 13,
		position: 'absolute',
		bottom: 20,
		left: 20,
	},
	uploadIcon: {
		backgroundColor: 'transparent'
	}
});

export const capt = StyleSheet.create({
	container: {
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
	actions: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'space-between',
		..._g._padding(0, 20, 0, 20),
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
	},
	action: {
		alignItems: 'center',
	},
	btn: {
		width: 70,
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
		..._g._borderRadius(100),
		backgroundColor: _g.darkTheme.shade3,
	},
	send: {
		backgroundColor: _g.darkTheme.shade2,
	},
	label: {
		color: '#fff',
		fontWeight: '600',
		marginBottom: 5,
	},
	player: {
		flex: 1,
	},
	mute: {
		backgroundColor: 'transparent',
	},
	muteIcon: {
		backgroundColor: 'transparent',
	}
});





