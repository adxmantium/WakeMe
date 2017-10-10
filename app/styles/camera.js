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
		// ..._g._border(1, 'green'),			
	},
	capture: {
	    padding: 15,
	    margin: 40,
	    backgroundColor: '#fff',
	    ..._g._borderRadius(100),
	},
	header: {
		..._g._padding(20, 10, 0, 10),
		position: 'absolute',
		top: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	headIcon: {
		// ..._g._border(1, 'blue'),
		backgroundColor: 'transparent',
		height: 35,
	},
	close: {
		..._g._padding(3, 0, 0, 0),
	}
});