import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";

//import components
import Header from "@components/Header";
import SuccessModal from "@components/SuccessModal";

//import api
const axios = require("axios");
import { CreateDesignationApi } from "@api/Url";

export default class CreatePoisition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      name: "",
      isOpenSuccessModel:false
    };
  }
  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
  }
  _handleOnPress() {
    this.props.navigation.navigate("Position");
  }

  _handleCreate() {
    const self = this;
    let bodyParam = {
      designation: self.state.name,
    };
    axios
      .post(CreateDesignationApi, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({isOpenSuccessModel:true})
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
    this.props.navigation.navigate('Position');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          name="Create Position"
          //   img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        {/* <View style={{marginTop:30}}> */}
        <Text style={{ margin: 10, fontSize: 16 }}>Position name</Text>
        <TextInput
          value={this.state.name}
          style={styles.textInput}
          onChangeText={(value) => this.setState({ name: value })}
        />
        <View style={styles.touchContainer}>
          <TouchableOpacity
            style={styles.touchBtn}
            onPress={() => this._handleCreate()}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Designation create Successfully"
          onClose={() => this._handleOnClose()}
        />
        {/* </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    // backgroundColor:"#F2EAEA"
  },
  touchContainer: {
    alignItems: "flex-end",
    flex: 1,
    margin: 10,
  },
  touchBtn: {
    width: 100,
    height: 40,
    backgroundColor: "#039BE7",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#039BE7",
  },
  // secondContainer:{
  //   backgroundColor:"#F2EAEA",
  //   height:250,
  //   borderWidth:1,
  //   margin:20,
  //   borderColor:"#F2EAEA",
  //   borderRadius:5,
  //   justifyContent:"center",
  // }
});
