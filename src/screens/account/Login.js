import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

//import api
const axios = require("axios");
import { LoginApi } from "@api/Url";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  _handleLogin() {
    const self = this;

    let bodyParam = {
      email:"admin@gmail.com",
      loginId:"09123456789",
      password:"admin123",
    };
    axios
      .post(LoginApi, bodyParam, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        // console.log(response.data);
        AsyncStorage.multiSet(
          [
            ["access_token", response.data.access_token],
          ],
          (err) => {
            if (err) {
              alert("Asynstorage Error");
              // console.log(err);
            } else {
              self.props.navigation.navigate("HDashboardNavigator");
            }
          }
        );
        self.props.navigation.navigate("HDashboardNavigator");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  render() {
    // alert("Access_token","this.state.access_token");
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <View style={styles.thirdContainer}>
            <Image
              source={require("@images/hospital.png")}
              style={styles.img}
            />
            <TextInput
              value={this.state.email}
              style={[styles.textInput, { marginTop: 20 }]}
              placeholder="Enter Email or phone no:"
              placeholderTextColor="black"
              onChangeText={(value) => this.setState({ email: value })}
            />
            <TextInput
              value={this.state.password}
              style={styles.textInput}
              placeholder="Enter password"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeText={(value) => this.setState({ password: value })}
            />
            <TouchableOpacity
              onPress={() => this._handleLogin()}
              style={styles.touchBtn}
            >
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#C0ECE9",
  },

  thirdContainer: {
    backgroundColor: "#039BE7",
    alignItems: "center",
    borderWidth: 1,
    margin: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: "#039BE7",
    // height: 200,
    elevation: 2,
    paddingBottom: 30,
    // marginTop:100
    // marginTop:200
    // flex:1
  },
  textInput: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ffffff",
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  img: {
    width: 50,
    height: 50,
  },
  touchBtn: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#296ADB",
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#296ADB",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
  },
});
