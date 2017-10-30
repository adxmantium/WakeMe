// /styles/collection.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const coll = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: _g.darkTheme.shade5,
		// ..._g._border(1, 'red'),
		..._g._padding(_g.header_height+5, 0, 0, 0),
	},
	separator: {
		borderTopWidth: 1,
		borderTopColor: _g.darkTheme.shade3,
	},
	list: {
		// ..._g._border(1, 'white'),
		..._g._padding(20, 0, 20, 0),
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		..._g._padding(15, 20, 15, 20),
	},
	name: {
		marginLeft: 20,
	}
});