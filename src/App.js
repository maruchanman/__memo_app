import React from 'react'
import {
  NavigatorIOS
} from 'react-native'
import MandaList from './Screens/List.js'
import Constants from './Constants.js'

export default class App extends React.Component {

  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        itemWrapperStyle={{backgroundColor: Constants.imageColor}}
        tintColor="white"
        titleTextColor="white"
        barTintColor={Constants.imageColor}
        shadowHidden={true}
        initialRoute={{
          component: MandaList,
          navigationBarHidden: true,
          title: ""
        }}
      />
    )
  }

}
