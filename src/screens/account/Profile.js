import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { QRCode } from "react-native-custom-qr-codes";

//import components
import QRCodeModalView from "@components/QRCodeModalView";

//import components
import Header from "@components/Header";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenQRCodeModal: false,
    };
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
                <Image
                  source={require("@images/people.jpg")}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.qrcodeBox}
                  onPress={() => this.setState({ isOpenQRCodeModal: true })}
                >
                  {/* {this.state.user_id ? ( */}
                  <QRCode
                    // content={this.state.user_id.toString()}
                    codeStyle="square"
                    size={100}
                  />
                  {/* ) : null} */}
                </TouchableOpacity>
              </View>

              <Text style={styles.text}>Dr. Maung Maung</Text>
              <Text style={styles.text}>Doctor</Text>
              <Text style={styles.text}>Department 1</Text>
              <Text style={styles.text}>09 458518277</Text>
              <Text style={styles.text}>7/khtthaka(N)111111</Text>
              <Text
                style={[styles.text, { height: 80, textAlignVertical: "top" }]}
              >
                Naypyitaw
              </Text>
            </View>
          </ScrollView>
        </View>

        <QRCodeModalView
          // userID={this.state.user_id}
          isOpen={this.state.isOpenQRCodeModal}
          onClose={() => this.setState({ isOpenQRCodeModal: false })}
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
