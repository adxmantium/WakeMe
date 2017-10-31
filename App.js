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
      OneSignal.addEventListener('ids', this._onIds);
      OneSignal.addEventListener('registered', this._onRegistered);
    }

    componentWillUnmount(){
      OneSignal.removeEventListener('ids', this._onIds);
      OneSignal.removeEventListener('registered', this._onRegistered);
    }

    _onIds = ({ userId: onesignal_device_id, pushToken: onesignal_push_token }) => {
      // on init, should be getting data from onesignal
      store.dispatch( updateUser({ onesignal_device_id, onesignal_push_token }) );
    }

    _onRegistered = (data) => {
      console.log('register data: ', data);
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigation onNavigationStateChange={ null } />
            </Provider>
        )
    }
}
