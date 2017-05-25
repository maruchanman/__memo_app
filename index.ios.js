import React from 'react'
import {
  AppRegistry
} from 'react-native'
import App from './src/App.js'

export default class mandalart extends React.Component {
  render() {
    return <App />
  }
}

AppRegistry.registerComponent('mandalart', () => mandalart);
