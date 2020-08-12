import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
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
              style={[styles.textInput, { marginTop: 20 }]}
              placeholder="Enter phone no:"
              placeholderTextColor="black"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter password"
              placeholderTextColor="black"
              secureTextEntry={true}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("HDashboardNavigator")
              }
              style={styles.touchBtn}
            >
              <Text style={styles.text}>Password</Text>
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
