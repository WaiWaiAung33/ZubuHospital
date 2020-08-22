import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

//import components
import ActionPopupmenu from "@components/Actionpopupmenu";

const ACTION_POPUP_DATA = [
  { label: "View", action: "VIEW" },
  { label: "Edit", action: "EDIT" },
  { label: "Delete", action: "DELETE" },
];

export default class EmployeeCard extends React.Component {
  _handleOnSelectActionPopup(arrIndex, action) {
    if (action == "EDIT") {
      this.props.onPressEdit(arrIndex);
    } else if (action == "DELETE") {
      this.props.onPressDelete(arrIndex);
    } else if (action == "VIEW") {
      this.props.onPressView(arrIndex);
    }
  }
  _onPress() {
    if (this.props.Onpress) {
      this.props.Onpress();
    }
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this._onPress()}>
          <View style={styles.container}>
            <Text style={styles.dateText}>{this.props.date}</Text>
            <View style={styles.secondContainer}>
              <View style={{ width: "40%" }}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>အမည်</Text>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  ရာထူး
                </Text>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  ဌာန
                </Text>
                {/* <Text style={[styles.text, { fontWeight: "bold" }]}>Serial No</Text> */}
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  ဖုန်းနံပတ်
                </Text>
                {/* <Text style={[styles.text, { fontWeight: "bold" }]}>Model</Text> */}
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.text}>{this.props.name}</Text>
                <Text style={styles.text}>{this.props.position}</Text>
                <Text style={styles.text}>{this.props.department}</Text>
                {/* <Text style={styles.text}>{this.props.serialno}</Text> */}
                <Text style={styles.text}>{this.props.phone}</Text>
                {/* <Text style={styles.text}>{this.props.model}</Text> */}
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              {/* <ActionPopupmenu
            arrIndex={this.props.arrIndex}
            options={ACTION_POPUP_DATA}
            onSelect={this._handleOnSelectActionPopup.bind(this)}
          /> */}
              {/* <TouchableOpacity style={styles.touchBtn}>
            <Image source={require("@images/setting.png")} style={styles.img}/>
            <Text style={styles.btnText}>Action</Text>
        </TouchableOpacity> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
    padding: 10,
  },
  text: {
    paddingTop: 5,
  },
  secondContainer: {
    // flex:1,
    flexDirection: "row",
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
