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

const DRAWER_ITEMS = [
  {
    routeName: "Position",
    label: "Position",
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

export default class DrawerSideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  async navigate(routeName) {
    if (routeName == "Logout") {
      this.props.navigation.navigate("Login");
      return true;
      // console.log(aa);
    } else {
      this.props.navigation.navigate(routeName);
    }
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
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <Image
                source={require("@images/people.jpg")}
                style={styles.img}
              />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 15, marginTop: 15 }}>
              <Text style={styles.text}>Mr. Mg Mg</Text>
              <Text style={[styles.text, { marginTop: 10 }]}>09 458590876</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ backgroundColor: "#EFF0F2", flex: 1 }}>
          {DRAWER_ITEMS.map((data, index) => {
            return this._renderItem(data, index);
          })}
        </View>
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
    width: 80,
    height: 80,
    borderRadius: 40,
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
});
