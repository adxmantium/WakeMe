// /api/axios.js

// lib
import axios from 'axios'

export default {
	dev: axios.create({
		baseURL: 'https://mfpjrgr3gh.execute-api.us-west-1.amazonaws.com/dev',
		headers: {},
	}),

	prod: axios.create({
		baseURL: '',
		headers: {}
	})
}
