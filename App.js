/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// libs
import { Provider } from 'react-redux'
import store from './app/reducers/store'
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

// components
import AppNavigation from './app/navigation'

export default class WakeMe extends Component<{}> {
    render() {
        return (
            <Provider store={store}>
                <AppNavigation onNavigationStateChange={ null } />
            </Provider>
        )
    }
}
