// /action/waker.js

import _axios from './../api/axios'
import * as route from './../api/routes/user'
import * as _actions from './../constants/waker'

export const add_to_queue = data => ({
	type: _actions.ADD_TO_QUEUE,
	payload: data,
})
