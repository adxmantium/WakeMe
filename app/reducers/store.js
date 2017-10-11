// /reducers/store.js

// libs
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

// reducers
import _user from './user'
import _alarm from './alarm'
import _camera from './camera'

// create and combine middleware

// dev
const middleware = applyMiddleware(thunk, promise(), logger);

// prod
// const middleware = applyMiddleware(thunk, promise());

//
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//combine all reducers
const reducers = combineReducers({
	_user,
	_alarm,
	_camera,
});

// create store
const store = createStore(
  reducers,
  composeEnhancers(middleware),
);

export default store;
