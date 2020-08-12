import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

//import components
import Header from "@components/Header";

export default class CreateDepartment extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnPress() {
    this.props.navigation.navigate("Department");
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          name="Create Department"
          //   img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        {/* <View style={{marginTop:30}}> */}
        <Text style={{ margin: 10, fontSize: 16 }}>Department name</Text>
        <TextInput style={styles.textInput} />
        <View style={styles.touchContainer}>
          <TouchableOpacity style={styles.touchBtn}>
            <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
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
