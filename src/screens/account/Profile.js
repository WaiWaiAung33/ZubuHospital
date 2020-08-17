import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import { QRCode } from "react-native-custom-qr-codes";
import * as Permissions from "expo-permissions";

//import api
import { ImgUploadApi } from "@api/Url";

//import components
import QRCodeModalView from "@components/QRCodeModalView";
import SuccessModal from "@components/SuccessModal";

//import components
import Header from "@components/Header";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenQRCodeModal: false,
      user_id: null,
      isOpenErrorModal: false,
      nrccode: "",
      nrc_state: "",
      nrc_status: "",
      nrc_number: "",
      name:"",
      phone:"",
      address:"",
      photo:"",
      name_en:"",
    };
  }
  async componentDidMount() {
    const user_id = await AsyncStorage.getItem("employeeId");
    const nrccode = await AsyncStorage.getItem("nrccode");
    const nrc_state = await AsyncStorage.getItem("nrc_state");
    const nrc_status = await AsyncStorage.getItem("nrc_status");
    const nrc_number = await AsyncStorage.getItem("nrc_number");
    const name = await AsyncStorage.getItem("name");
    const phone = await AsyncStorage.getItem("phone");
    const address = await AsyncStorage.getItem("address");
    const photo = await AsyncStorage.getItem("photo");
    const name_en =await AsyncStorage.getItem("name_en");
    this.setState({
      user_id: user_id,
      nrccode,
      nrc_state,
      nrc_status,
      nrc_number,
      name,
      phone,
      address,
      photo:photo,
      name_en
    });
  }
  async navigate(routename) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.props.navigation.navigate(routename, { status: true });
    } else {
      this.setState({ isOpenErrorModal: true });
    }
  }
  _handleOnPress() {
    this.props.navigation.navigate("HDashboardNavigator");
  }
  _handleOnCloseWarningModal() {
    this.setState({ isOpenErrorModal: false });
  }
  render() {
    console.log("Photo",
    this.state.photo
    );
    return (
      <View style={styles.container}>
        <Header
          name="Profile"
          //   img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <View style={{ marginTop: 40, alignItems: "center", flex: 1 }}>
          <ScrollView>
            <View style={styles.secondContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                  {/* {data.photo ? (
                <View style={{ width: "60%" }}>
                  <Image
                    source={{
                      uri: ImgUploadApi + "/" + data.name_en + "/" + data.photo,
                    }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                </View>
              ) : (
                <View style={{ width: "60%" }}>
                  <Image
                    source={{ uri: ImgUploadApi + "/" + data.photo }}
                    style={{ width: 100, height: 100, backgroundColor: "red" }}
                  />
                </View>
              )} */}
                <Image
                  source={require("@images/people.jpg")}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                {/* <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.qrcodeBox}
                  onPress={() => this.setState({ isOpenQRCodeModal: true })}
                >
                  {this.state.user_id ? (
                  <QRCode
                    content={this.state.user_id.toString()}
                    codeStyle="square"
                    size={100}
                  />
                   ) : null} 
                </TouchableOpacity> */}
              </View>

              <Text style={styles.text}>{this.state.name}</Text>
              <Text style={styles.text}>Doctor</Text>
              <Text style={styles.text}>Department 1</Text>
              <Text style={styles.text}>{this.state.phone}</Text>
              <Text style={styles.text}>
                {this.state.nrccode +
                  "/" +
                  this.state.nrc_state +
                  "(" +
                  this.state.nrc_status +
                  ")" +
                  this.state.nrc_number}
              </Text>
              <Text
                style={[styles.text, { height: 80, textAlignVertical: "top" }]}
              >
               {this.state.address}
              </Text>
            </View>
          </ScrollView>
        </View>

        <QRCodeModalView
          userID={this.state.user_id}
          isOpen={this.state.isOpenQRCodeModal}
          onClose={() => this.setState({ isOpenQRCodeModal: false })}
        />
        <SuccessModal
          isOpen={this.state.isOpenErrorModal}
          text="QR Scan ဖတ်ရန်အတွက် Camera Access လိုအပ်ပါသည်။"
          onClose={this._handleOnCloseWarningModal.bind(this)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  secondContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#039BE7",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#039BE7",
    elevation: 5,
    paddingBottom: 35,
    paddingTop: 20,
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  text: {
    borderWidth: 1,
    width: 300,
    height: 40,
    marginTop: 10,
    textAlignVertical: "center",
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    elevation: 5,
  },
  qrcodeBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 10,
    marginRight: 15,
  },
});
