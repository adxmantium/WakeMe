// /reducers/store.js

// libs
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

// reducers
import _user from './user'
import _alarm from './alarm'
import _waker from './waker'
import _camera from './camera'
import _friends from './friends'

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
	_waker,
	_camera,
	_friends,
});

// create store
const store = createStore(
  reducers,
  composeEnhancers(middleware),
);

export default store;
