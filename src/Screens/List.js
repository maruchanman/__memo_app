import React from 'react'
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native'
import Storage from 'react-native-storage'
import Mandalart from './Memo.js'
import Constants from '../Constants.js'

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null
})

const CreateButton = props => (
  <TouchableWithoutFeedback onPress={() => props.create(props.navigator)}>
    <View style={[styles.row, styles.create]}>
      <Text style={[styles.title, styles.createText]}>CREATE</Text>
    </View>
  </TouchableWithoutFeedback>
)
const Row = props => (
  <TouchableWithoutFeedback onPress={() => props.navigator.push({
    component: Mandalart, title: props.data.center,
    rightButtonSystemIcon: "trash",
    onRightButtonPress: () => props.removeStorage(props.id, props.navigator),
    passProps: {id: props.id, data: props.data, update: props.updateStorage, isOpen: false}})}>
    <View style={styles.row}>
      <Text style={styles.title}>{props.data.center}</Text>
    </View>
  </TouchableWithoutFeedback>
)

export default class MandaList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  loadData() {
    console.log("load Data")
    storage.getAllDataForKey("test")
      .then(res => this.setState({data: res}))
      .catch(err => console.log("error"))
  }

  create(navigator) {
    const id = new Date().getTime()
    const newData = {
      id: id, center: "", upper: "", left: "", bottom: "", right: "",
      upperRight: "", upperLeft: "", bottomRight: "", bottomLeft: ""
    }
    storage.save({key: "test", id: id, data: newData})
    navigator.push({
      component: Mandalart, title: "",
      rightButtonSystemIcon: "trash",
      onRightButtonPress: () => this.removeStorage(id, navigator),
      passProps: {data: newData, id: id, update: this.updateStorage, isOpen: true}})
  }

  updateStorage(data) {
    storage.save({key: "test", id: data.id, data: data})
  }

  removeStorage(id, navigator) {
    storage.remove({key: "test", id: id})
    navigator.pop()
  }

  componentDidMount() {
    this.loadData()
  }

  componentWillReceiveProps(newProps) {
    this.loadData()
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.wrapper}>
        <CreateButton
          create={this.create.bind(this)}
          navigator={this.props.navigator} />
        {this.state.data.sort((a, b) => a.id < b.id).map(data => (
          <Row
            key={data.id} id={data.id} data={data} navigator={this.props.navigator}
            updateStorage={this.updateStorage} removeStorage={this.removeStorage}/>
        ))}
      </ScrollView>
    )
  }
}

const styles = {
  wrapper: {
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    width: Constants.width / 2 - 2,
    height: Constants.width / 2 - 2,
    borderRadius: 100,
    margin: 1,
    backgroundColor: 'whitesmoke',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    color: Constants.fontColor,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  create: {
    backgroundColor: Constants.imageColor
  },
  createText: {
    color: 'white',
    fontSize: 24
  }
}
