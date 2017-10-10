// /styles/collection.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const coll = StyleSheet.create({
	container: {
		flex: 1,
		// ..._g._border(1, 'red'),
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		..._g._padding(25, 10, 0, 10),
	},
	title: {
		fontSize: 20,
	},
	separator: {
		borderTopWidth: 1,
		borderTopColor: _g.darkTheme.shade3,
	},
	list: {},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		..._g._padding(15, 10, 15, 10),
	},
	name: {
		marginLeft: 20,
	}
});