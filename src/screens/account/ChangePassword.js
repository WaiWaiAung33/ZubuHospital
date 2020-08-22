import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler
} from "react-native";

import { DrawerActions } from "react-navigation-drawer";

//import components
import Header from "@components/Header";

export default class Chage extends React.Component {
  constructor(props) {
    super(props);
    this.BackHandler=null;
  }
  async componentDidMount(){
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

  render() {
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
            style={styles.textInput}
            placeholderTextColor="black"
          />
        </View>
        <View style={styles.secondConatiner}>
          <Image
            source={require("@images/password.png")}
            style={{ width: 25, height: 25 }}
          />
          <TextInput
            placeholder="New Password"
            style={styles.textInput}
            placeholderTextColor="black"
          />
        </View>
        <View style={styles.secondConatiner}>
          <Image
            source={require("@images/password.png")}
            style={{ width: 25, height: 25 }}
          />
          <TextInput
            placeholder="Retype New Password"
            style={styles.textInput}
            placeholderTextColor="black"
          />
        </View>
        <TouchableOpacity style={styles.touchBtn}>
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
