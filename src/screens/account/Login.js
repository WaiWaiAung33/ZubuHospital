import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";

//import api
const axios = require("axios");
import { LoginApi } from "@api/Url";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isOnline: false,
    };
  }
  componentDidMount = async () => {
    NetInfo.addEventListener((state) => {
      this.setState({ isOnline: state.isConnected });
    });
    const user = await AsyncStorage.getItem("email");
    const routeName = user != null ? "HDashboardNavigator" : "Login";
    this.props.navigation.navigate(routeName);
  };
  _handleLogin() {
    if (this.state.email == "" || this.state.password == "") {
      ToastAndroid.show("Email or Password is required!", ToastAndroid.SHORT);
    } else {
      const self = this;
      if (self.state.isOnline) {
        let bodyParam = {
          // email:self.state.email,
          loginId: self.state.email,
          password: self.state.password,
        };
        axios
          .post(LoginApi, bodyParam, {
            headers: {
              Accept: "application/json",
            },
          })
          .then(function (response) {
            // console.log("Role",response.data.data.employee[0].photo);
            if (response.data.status == 1) {
             
              var role_id = response.data.data.role_id.toString();
              // console.log(role_id);
              var employee_Id ='';
              var nrccode='';
              var nrc_state='';
              var nrc_status='';
              var nrc_number='';
              var phone='';
              var address='';
              var name_en='';
              var photo='';
              var department='';
              var designation='';
              if(role_id== "1"){
                employee_Id = response.data.data.loginId.toString();
              }else{
                employee_Id = response.data.data.employee[0].userId.toString();
                nrccode =  response.data.data.employee[0].nrc_code_en;
                nrc_state=response.data.data.employee[0].nrc_en;
                nrc_status=response.data.data.employee[0].nrc_status_en;
                nrc_number=response.data.data.employee[0].nrc_en_no;
                phone=response.data.data.employee[0].ph_no;
                address=response.data.data.employee[0].address;
                name_en=response.data.data.employee[0].name_en;
                photo=response.data.data.employee[0].photo;  
                department= response.data.data.employee[0].department;
                designation= response.data.data.employee[0].designation;

              }
              // var employee='';
              // if(role_id== "1"){
              //   employee = response.data.data.loginId.toString();
              // }
              // else{
              //   employee =  response.data.data.employee[0];
              // }
              // console.log(employee.address);
              AsyncStorage.multiSet(
                [
                  ["role_id", role_id],
                  ["access_token", response.data.access_token],
                  ["email", response.data.data.loginId],
                  ["employeeId", employee_Id],
                  ["name", response.data.data.name_en],
                  ["loginId", response.data.data.loginId],
                  ["nrccode",nrccode],
                  ["nrc_state",nrc_state],
                  ["nrc_status",nrc_status],
                  ["nrc_number",nrc_number],
                  ["phone",phone],
                  ["address",address],
                  ["name_en",name_en],
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
            } else {
              // alert("Invalid Username or Password");
              ToastAndroid.show(response.data.message,
                ToastAndroid.SHORT
              );
            }
          })
          .catch(function (err) {
            console.log(err);
            ToastAndroid.show(
              "server error",
              ToastAndroid.SHORT
            );
          });
      }
    }
  }
  clearState() {
    this.setState({
      email: null,
      password: null,
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
