import React from 'react'
import { StackNavigator } from 'react-navigation'
import MandaList from './Screens/List.js'
import Mandalart from './Screens/Memo.js'
import Constants from './Constants.js'

const App = StackNavigator({
  list: {
    screen: MandaList,
    navigationOptions: {
      header: null
    }
  },
  memo: {
    screen: Mandalart,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Constants.imageColor
      }
    }
  }
})

export default App
