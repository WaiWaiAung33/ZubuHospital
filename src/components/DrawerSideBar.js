import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  AsyncStorage,
  ImageBackground,
} from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import * as Permissions from "expo-permissions";

//import components
import QRCodeModalView from "@components/QRCodeModalView";
import SuccessModal from "@components/SuccessModal";

//import api
import { ImgUploadApi } from "@api/Url";

const DRAWER_ITEMS = [
  {
    routeName:"HDashboardNavigator",
    label:"Dashboard",
    image:require("@images/dashboard.png"),
  },
  {
    routeName: "Position",
    label: "Designation",
    image: require("@images/change.png"),
  },
  {
    routeName: "Department",
    label: "Department",
    image: require("@images/id-card.png"),
  },
  {
    routeName: "Employee",
    label: "Employee",
    image: require("@images/doctor.png"),
  },
  {
    routeName: "ChangePassword",
    label: "Change Password",
    image: require("@images/password.png"),
  },
  {
    routeName: "QrScan",
    label: "Qr Scan",
    image: require("@images/qrcode.png"),
  },
  {
    routeName: "Logout",
    label: "Logout",
    image: require("@images/logout.png"),
    customWidth: 30,
    customHeight: 30,
  },
];

const EMPLOYEE_DRAWER_ITEMS = [
  {
    routeName: "ChangePassword",
    label: "Change Password",
    image: require("@images/password.png"),
  },
  {
    routeName: "QrScan",
    label: "Qr Scan",
    image: require("@images/qrcode.png"),
  },
  {
    routeName: "Logout",
    label: "Logout",
    image: require("@images/logout.png"),
    customWidth: 30,
    customHeight: 30,
  },
];

export default class DrawerSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenQRCodeModal: false,
      user_id: null,
      isOpenErrorModal: false,
      roleid: "",
      name: "",
      phone: "",
      photo: "",
      name_en: "",
      isOpenDeleteConfirmModal: false,
    };
  }
  async componentDidMount() {
    const roleid = await AsyncStorage.getItem("role_id");
    const user_id = await AsyncStorage.getItem("employeeId");
    const name = await AsyncStorage.getItem("name");
    const photo = await AsyncStorage.getItem("photo");
    const name_en = await AsyncStorage.getItem("name_en");
    // console.log(name);
    const phone = await AsyncStorage.getItem("loginId");
    this.setState({
      user_id: user_id,
      roleid: roleid,
      name: name,
      phone: phone,
      photo: photo,
      name_en,
    });
  }
  // async navigate(routename) {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   if (status === "granted") {
  //     this.props.navigation.navigate(routename, { status: true });
  //   } else {
  //     this.setState({ isOpenErrorModal: true });
  //   }
  // }
  async navigate(routeName) {
    if (routeName == "Logout") {
      await AsyncStorage.clear();
      this.props.navigation.navigate("Login");
      return true;
      // console.log(aa);
    } else {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      {
        status === "granted"
          ? this.props.navigation.navigate(routeName, { status: true })
          : this.setState({ isOpenErrorModal: true });
      }
      // this.props.navigation.navigate(routeName);
    }
  }
  _handleOnCloseWarningModal() {
    this.setState({ isOpenErrorModal: false });
  }

  _renderItem(data, index) {
    return (
      <View key={index}>
        <TouchableOpacity
          style={[styles.linkBtn]}
          onPress={() => this.navigate(data.routeName)}
        >
          <Image
            source={data.image}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
          <Text style={{ marginLeft: 10 }}>{data.label}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log(this.state.name);
    // alert(this.state.role_id);
    return (
      <View style={styles.container}>
        <View
          style={{
            // alignItems: "center",
            height: 250,
            // backgroundColor: "#0470DD",
          }}
        >
          <ImageBackground
            source={require("@images/wallpaper1.jpg")}
            style={{ height: 250 }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() =>
                  this.state.roleid == "1"
                    ? null
                    : this.props.navigation.navigate("Profile")
                }
              >
                {this.state.photo ? (
                  <View>
                    <Image
                      source={{
                        uri:
                          ImgUploadApi +
                          "/" +
                          this.state.name_en +
                          "/" +
                          this.state.photo,
                      }}
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                  </View>
                ) : (
                  <View>
                    <Image
                      source={require("@images/people.jpg")}
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                  </View>
                )}
                {/* <Image
                  source={require("@images/people.jpg")}
                  style={styles.img}
                /> */}
              </TouchableOpacity>
              {this.state.roleid == "1" ? null : (
                <TouchableOpacity
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
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 15, marginTop: 15 }}>
              <Text style={styles.text}>{this.state.name}</Text>
              <Text style={[styles.text, { marginTop: 10 }]}>
                {this.state.phone}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ backgroundColor: "#EFF0F2", flex: 1 }}>
          {this.state.roleid == "1"
            ? DRAWER_ITEMS.map((data, index) => {
                return this._renderItem(data, index);
              })
            : EMPLOYEE_DRAWER_ITEMS.map((data, index) => {
                return this._renderItem(data, index);
              })}
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
  },
  linkBtn: {
    height: 40,
    // backgroundColor: "#DDDDDF",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDF",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageContainer: {
    marginTop: 40,
    flex: 1,
    marginLeft: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  qrcodeBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 40,
    marginRight: 15,
  },
});
