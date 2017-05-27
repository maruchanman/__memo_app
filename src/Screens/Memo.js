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
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from '../Constants.js'

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null
})

class Block extends React.Component {
  render() {
    if (this.props.depth == 0) {
      const text = this.props.name == "center"
        ? this.props.data[this.props.name] : this.props.data[this.props.name]["center"]
      return (
        <View style={this.props.name == "center" ? styles.center : styles.block}>
          <TouchableWithoutFeedback onPress={() => this.props.openModal(this.props.name)}>
            <View style={styles.textBox}>
              <Text style={this.props.name == "center" ? styles.centerText : styles.text}>
                {text}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {(this.props.name != "center" & text != "") ? (
            <TouchableWithoutFeedback onPress={() => this.props.pushDeep(this.props.name)}>
              <Icon style={styles.addButton} name="plus" size={18} />
            </TouchableWithoutFeedback>) : null}
        </View>
      )
    } else {
      return (
        <View style={this.props.name == "center" ? styles.center : styles.block}>
          <TouchableWithoutFeedback
            onPress={
              this.props.name != "center"
              ? () => this.props.openModal(this.props.name) : null}>
            <View style={styles.textBox}>
              <Text style={this.props.name == "center" ? styles.centerText : styles.text}>
                {this.props.data[this.props.base][this.props.name]}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }
}

export default class Mandalart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      isOpen: props.isOpen,
      target: "center",
      textValue: ""
    }
  } 

  changeText(target, text) {
    var newData = Object.assign({}, this.state.data)
    if (target == "center") {
      newData[target] = text
    } else if (this.props.depth == 0) {
      newData[target]["center"] = text
    } else{
      newData[this.props.base][target] = text
    }
    this.setState({data: newData, textValue: text})
  }

  openModal(target) {
    if (target == "center") {
      var textValue = this.state.data[target]
    } else if (this.props.depth == 0) {
      var textValue = this.state.data[target]["center"]
    } else{
      var textValue = this.state.data[this.props.base][target]
    }
    this.setState({
      target: target, isOpen: true, textValue: textValue},
      () => this.refs["textInput"].focus())
  }

  endEdit() {
    this.setState({isOpen: false, textValue: ""})
    this.props.update(this.state.data)
  }

  pushDeep(target) {
    this.props.navigator.push({
      component: Mandalart, title: this.state.data[target]["center"],
      passProps: {
        data: this.state.data, depth: 1, id: this.state.data.id,
        update: this.props.update, isOpen: false, base: target
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.wrapper}>
          <View style={styles.row}>
            {["upperLeft", "upper", "upperRight"].map(name => (
              <Block
                name={name} key={name} depth={this.props.depth} base={this.props.base}
                pushDeep={this.pushDeep.bind(this)}
                openModal={this.openModal.bind(this)} data={this.state.data}/>
            ))}
          </View>
          <View style={styles.row}>
            {["left", "center", "right"].map(name => (
              <Block
                name={name} key={name} depth={this.props.depth} base={this.props.base}
                pushDeep={this.pushDeep.bind(this)}
                openModal={this.openModal.bind(this)} data={this.state.data}/>
            ))}
          </View>
          <View style={styles.row}>
            {["bottomLeft", "bottom", "bottomRight"].map(name => (
              <Block
                name={name} key={name} depth={this.props.depth}
                pushDeep={this.pushDeep.bind(this)} base={this.props.base}
                openModal={this.openModal.bind(this)} data={this.state.data}/>
            ))}
          </View>
        </ScrollView>
        <View style={this.state.isOpen ? styles.modal : styles.hidden}>
          <TextInput
            ref="textInput"
            value={this.state.textValue}
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
  },
  addButton: {
    position: 'absolute',
    color: Constants.imageColor,
    top: 0,
    right: 0,
    padding: 3
  },
  textBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
