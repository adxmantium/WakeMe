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
		justifyContent: 'space-between',
		padding: 20,
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
	msg: {
		backgroundColor: _g.darkTheme.shade1,
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
	},
	msgInputContainer: {
		flex: 1,
	},
	msgInput: {
		padding: 10,
		borderRadius: 3,
		color: _g.darkTheme.shade2,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	msgSet: {
		position: 'absolute',
		top: '10%',
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		padding: 20,
		zIndex: 1,
	},
	msgVal: {
		color: _g.darkTheme.shade2,
		fontSize: 30,
		backgroundColor: 'transparent',
	},
	fabBtn: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
});





