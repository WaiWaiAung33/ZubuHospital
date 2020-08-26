import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
  AsyncStorage
} from "react-native";

import { DrawerActions } from "react-navigation-drawer";
import * as Crypto from "expo-crypto";

//import api
const axios = require("axios");
import {ChangePasswordApi} from "@api/Url";

//import components
import Header from "@components/Header";

export default class Chage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      password:"",
      user_id:"",
      oldpassword:"",
      newpassword:"",
      confirmpassword:"",
      access_token:null
    }
    this.BackHandler=null;
  }
  async componentDidMount(){
    const pass = await AsyncStorage.getItem("password");
    const user_id = await AsyncStorage.getItem("user_id");
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      password:pass,
      user_id:user_id,
      access_token:access_token
    })
    this.setBackHandler();
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    this.props.navigation.navigate("DashboardDepartment");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
_handleChangePassword= async () =>{
    var self=this;
    const newPasswordSHA1 = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA1,
      self.state.newpassword
    );
    let bodyParam={
      password:newPasswordSHA1,
      user_id:self.state.user_id
    }
    axios
    .post(ChangePasswordApi,bodyParam,{
      headers:{
        Accept:"application/json",
        Authorization:"Bearer " + self.state.access_token
      }
    })
    .then(function(response){
      console.log(response.data)
    })
    .catch(function(err){
      console.log(err);
    })
  }
   _handleOnChangePassword= async () =>{
    var self=this;
    const sha1password = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA1,
      self.state.oldpassword
    );
    console.log(sha1password)
    if (self.state.password == sha1password) {
      self._handleChangePassword();
    } else {
      self.setState({newpassword: "" });
      // alert("error")
    }

  }

  render() {
    console.log(this.state.password);
    return (
      <View style={styles.container}>
        <Header
          name="Change your password"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <View style={{justifyContent:"center",flex:1}}> 
        <View style={[styles.secondConatiner,{marginTop:20}]}>
          <Image
            source={require("@images/password.png")}
            style={{ width: 25, height: 25 }}
          />
          <TextInput
            placeholder="Old Password"
            secureTextEntry={true}
            value={this.state.oldpassword}
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={(value)=>this.setState({oldpassword:value})}
          />
        </View>
        <View style={styles.secondConatiner}>
          <Image
            source={require("@images/password.png")}
            style={{ width: 25, height: 25 }}
          />
          <TextInput
            placeholder="New Password"
            value={this.state.newpassword}
            secureTextEntry={true}
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={(value)=>this.setState({newpassword:value})}
          />
        </View>
        {/* <View style={styles.secondConatiner}>
          <Image
            source={require("@images/password.png")}
            style={{ width: 25, height: 25 }}
          />
          <TextInput
            placeholder="Retype New Password"
            value={this.state.confirmpassword}
            secureTextEntry={true}
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={(value)=>this.setState({confirmpassword:value})}
          />
        </View> */}
        <TouchableOpacity
         style={styles.touchBtn}
         onPress={() => this._handleOnChangePassword()}
         >
            <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#F2EAEA"
  },
  secondConatiner: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    elevation:2
  },
  textInput: {
    paddingHorizontal: 10,
  },
  touchBtn:{
      margin:10,
      borderWidth:1,
      padding:10,
      borderRadius:5,
      justifyContent:"center",
      alignItems:"center",
      borderColor:"#039BE7",
      backgroundColor:"#039BE7",
      elevation:2
  },
  text:{
      color:"#ffffff",
      fontSize:18
  }
});
