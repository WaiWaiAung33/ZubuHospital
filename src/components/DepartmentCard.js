import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Actionpopupmenu from "@components/Actionpopupmenu";

const ACTION_POPUP_DATA = [
  { label: "Edit", action: "EDIT" },
  { label: "Delete", action: "DELETE" },
];

export default class DepartmentCard extends React.Component {
  _handleOnSelectActionPopup(arrIndex, action) {
    if (action == "EDIT") {
      this.props.onPressEdit(arrIndex);
    } else if (action == "DELETE") {
      this.props.onPressDelete(arrIndex);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.secondContainer}>
          <Text>No</Text>
          <Text>Department Name</Text>
          <Text>Action</Text>
        </View> */}
        <View style={[styles.secondContainer, { marginTop: 15 }]}>
      <Text style={[styles.text, { fontWeight: "bold" }]}>{this.props.No}</Text>
      <Text style={styles.text}>{this.props.name}</Text>
          <Actionpopupmenu
            arrIndex={this.props.arrIndex}
            options={ACTION_POPUP_DATA}
            onSelect={this._handleOnSelectActionPopup.bind(this)}
          />
        </View>
        {/* <View style={[styles.secondContainer, { marginTop: 15 }]}>
          <Text style={[styles.text, { fontWeight: "bold" }]}>2</Text>
          <Text style={styles.text}>Doctor</Text>
          <Actionpopupmenu
            arrIndex={this.props.arrIndex}
            options={ACTION_POPUP_DATA}
            onSelect={this._handleOnSelectActionPopup.bind(this)}
          />
        </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    // borderWidth: 1,
    // borderRadius: 5,
    // borderColor: "#707070",
    // padding: 10,
    // backgroundColor: "red",
  },
  text: {
    paddingTop: 5,
  },
  secondContainer: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth:1,
    paddingBottom:10,
  },
  dateText: {
    fontWeight: "bold",
    textAlign: "right",
  },
  touchBtn: {
    flexDirection: "row",
    width: 90,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#1FD449",
    backgroundColor: "#1FD449",
    alignItems: "center",
    padding: 5,
  },
  img: {
    width: 20,
    height: 20,
  },
  btnText: {
    color: "#ffffff",
    paddingLeft: 5,
  },
});
