/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// libs
import { Provider } from 'react-redux'
import store from './app/reducers/store'
import React, { Component } from 'react'
import OneSignal from 'react-native-onesignal' // onesignal register events ONLY works at root file (aka this file)

// components
import AppNavigation from './app/navigation'

// actions
import { updateUser } from './app/actions/user'

export default class WakeMe extends Component<{}> {
    componentDidMount(){
      // onesignal init events need to be in this file, but onReceived/onOpened events are handled in PushController
      OneSignal.addEventListener('ids', this._onIds);
      OneSignal.addEventListener('registered', this._onRegistered);
    }

    componentWillUnmount(){
      OneSignal.removeEventListener('ids', this._onIds);
      OneSignal.removeEventListener('registered', this._onRegistered);
    }

    _onIds = ({ userId: onesignal_device_token, pushToken: onesignal_push_token }) => {
      // on init, should be getting data from onesignal, save ids to store
      store.dispatch( updateUser({ onesignal_device_token, onesignal_push_token }) );
    }

    _onRegistered = (data) => {
      console.log('register data: ', data);
    }

    _navStateChange = (prevState, currentState) => {
      console.log('=======================');
      console.log('prevState: ', prevState);
      console.log('currentState: ', currentState);
      console.log('=======================');
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigation onNavigationStateChange={ this._navStateChange } />
            </Provider>
        )
    }
}
