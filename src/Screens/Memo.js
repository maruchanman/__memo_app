import React from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native'
import Storage from 'react-native-storage'
import Constants from '../Constants.js'

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null
})

export default class Mandalart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      isOpen: props.isOpen,
      target: props.isOpen ? "center" : ""
    }
  } 

  changeText(target, text) {
    var newData = Object.assign({}, this.state.data)
    newData[target] = text
    this.setState({data: newData})
  }

  openModal(target) {
    this.setState({target: target, isOpen: true}, () => this.refs["textInput"].focus())
  }

  endEdit() {
    this.setState({isOpen: false})
    this.props.update(this.state.data)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.wrapper}>
          <View style={styles.row}>
            {["upperLeft", "upper", "upperRight"].map(name => (
              <TouchableWithoutFeedback key={name} onPress={() => this.openModal(name)}>
                <View style={styles.block}>
                  <Text style={styles.text}>{this.state.data[name]}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View style={styles.row}>
            {["left", "center", "right"].map(name => (
              <TouchableWithoutFeedback key={name} onPress={() => this.openModal(name)}>
                <View style={name == "center" ? styles.center : styles.block}>
                  <Text style={name == "center" ? styles.centerText : styles.text}>
                    {this.state.data[name]}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View style={styles.row}>
            {["bottomLeft", "bottom", "bottomRight"].map(name => (
              <TouchableWithoutFeedback key={name} onPress={() => this.openModal(name)}>
                <View style={styles.block}>
                  <Text style={styles.text}>{this.state.data[name]}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
        <View style={this.state.isOpen ? styles.modal : styles.hidden}>
          <TextInput
            ref="textInput"
            value={this.state.data[this.state.target]}
            placeholder="30文字まで"
            placeholderTextColor="white"
            blurOnSubmit={true}
            autoFocus={this.props.isOpen}
            selectionColor={Constants.imageColor}
            onChangeText={(text) => this.changeText(this.state.target, text)}
            onEndEditing={this.endEdit.bind(this)}
            maxLength={30}
            style={styles.textInput}/>
        </View>
      </View>
    )
  }
}

const styles = {
  wrapper: {
    paddingVertical: 70,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  center: {
    backgroundColor: Constants.imageColor,
    width: Constants.width / 3 - 2,
    height: Constants.width / 3 - 2,
    margin: 2,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  block: {
    backgroundColor: 'white',
    width: Constants.width / 3 - 2,
    height: Constants.width / 3 - 2,
    margin: 2,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    color: Constants.fontColor,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Constants.width,
    height: Constants.height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  hidden: {
    height: 0
  },
  textInput: {
    flex: 1,
    color: 'white',
    paddingVertical: 20,
    paddingHorizontal: 40
  }
}
