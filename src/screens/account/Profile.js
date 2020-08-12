import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { DrawerActions } from "react-navigation-drawer";

//import components
import Header from "@components/Header";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnPress() {
    this.props.navigation.navigate("HDashboardNavigator");
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          name="Profile"
          //   img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <View style={styles.secondContainer}>
          <Image
            source={require("@images/people.jpg")}
            style={{ width: 100, height: 100, borderRadius: 5 }}
          />
          <Text style={styles.text}>Dr. Maung Maung</Text>
          <Text style={styles.text}>Doctor</Text>
          <Text style={styles.text}>Department 1</Text>
          <Text style={styles.text}>09 458518277</Text>
          <Text style={styles.text}>7/khtthaka(N)111111</Text>
          <Text style={[styles.text, { height: 80, textAlignVertical: "top" }]}>
            Naypyitaw
          </Text>
        </View>
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
    elevation: 2,
  },
});
