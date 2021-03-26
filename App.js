import React, { Component } from 'react';

import { StyleSheet, Platform, View, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import Toast from 'react-native-simple-toast';

var Realm = require('realm');

let realm;



export default class App extends Component {

  constructor() {

    super();

    this.state = {

      Contact_Name: '',

      Contact_Number: '',

      Contact_Email: '',

      myJson:''

    }

    realm = new Realm({
      schema: [{
        name: 'Contact_Info',
        properties:
        {
          contact_id: { type: 'int', default: 0 },
          contact_name: 'string',
          contact_number: 'string',
          contact_email: 'string'
        }
      }]
    });

  }
  
  showToast=(msg)=>{
    Toast.show(msg, Toast.SHORT, ['UIAlertController']);
  }

  add_Contact = () => {

    if (this.state.Contact_Name == "") {
this.showToast('Please Enter Contact Name')
return
    }
    if (this.state.Contact_Number == "") {

      this.showToast('Please Enter Contact Number')
      return
    }
    if (this.state.Contact_Email == "") {

      this.showToast('Please Enter Contact Email ID')
      return
    }
    else {

      
      realm.write(() => {

        var ID = realm.objects('Contact_Info').length + 1;

        realm.create('Contact_Info', {
          contact_id: ID,
          contact_name: this.state.Contact_Name,
          contact_number: this.state.Contact_Number,
          contact_email: this.state.Contact_Email
        });

      });

      Alert.alert("Contact Details Added Successfully.")
      var A = realm.objects('Contact_Info');

      var myJSON = JSON.stringify(A);
      this.setState({ myJson: myJSON })
      
    }
  }
  handleInputChange = (text) => {
    if (/^\d+$/.test(text)) {
      this.setState({ Contact_Number: text })
    }
  }

  render() {

    var A = realm.objects('Contact_Info');

    var myJSON = JSON.stringify(A);

    return (

      <View style={styles.MainContainer}>
        <TextInput
          placeholder="Enter Name"
          style={styles.TextInputStyle}
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ Contact_Name: text }) }}
        />

        <TextInput
        keyboardType='numeric'
          placeholder="Enter Number"
          style={styles.TextInputStyle}
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ Contact_Number: text }) }}
        />

        <TextInput
          placeholder="Enter Email ID"
          style={styles.TextInputStyle}
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ Contact_Email: text }) }}
        />


        <TouchableOpacity onPress={this.add_Contact} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.TextStyle}>+</Text>

        </TouchableOpacity>


        <Text style={{ marginTop: 10 }}>{myJSON}</Text>


      </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    margin: 10

  },

  TextInputStyle:
  {
    borderWidth: 1,
    borderColor: '#009688',
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

  button: {
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 100,
    marginTop: 12
  },

  TextStyle: {
    alignContent:'center',
    // alignSelf:'center',
    color: '#fff',
    // textAlign: 'center',
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    height:'100%',
    fontSize: 30,
  }

});