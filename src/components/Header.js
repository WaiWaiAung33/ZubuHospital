import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  _OnPress() {
    if (this.props.Onpress) {
      this.props.Onpress();
    }
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor:"#039BE7",
          },
        ]}
      >
        <TouchableOpacity onPress={() => this._OnPress()} style={{ width: 50 }}>
          <Image
            source={
              this.props.img
                ? this.props.img
                : require("@images/back_arrow.png")
            }
            style={{
              width: this.props.widthheader ? this.props.widthheader : 25,
              height: this.props.heightheader ? this.props.heightheader : 25,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>

        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // height:50,
    // backgroundColor: "#FE7F0A",
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    // flex:1
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    // paddingTop: 30,
  },
  img: {
    width: 25,
    height: 25,
    marginLeft: 10,
    // marginTop: 40,
  },
});
