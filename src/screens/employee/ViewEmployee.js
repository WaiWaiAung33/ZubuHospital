import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//import components
import Header from "@components/Header";
import DropDown from "@components/DropDown";

const DEPARTMENT = [
  { value: 1, label: "Department1" },
  { value: 2, label: "Department2" },
];
const POSITION = [
  { value: 1, label: "Doctor" },
  { value: 2, label: "Nurse" },
];
const NRCCODE = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "10" },
];
const NRCSTATE = [
  { value: 1, label: "7/khathkha" },
  { value: 2, label: "8/zthapha" },
];
const NRCSTATUS = [
  { value: 1, label: "N" },
  { value: 2, label: "P" },
];

export default class ViewEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: { value: null, label: null },
      position: { value: null, label: null },
      nrccode: { value: null, label: null },
      nrcstate: { value: null, label: null },
      nrcstatus: { value: null, label: null },
    };
  }
  _handleOnPress() {
    this.props.navigation.navigate("Employee");
  }
  _handleOnSlectPosition(value, label) {
    this.setState({
      position: { value: value, label: label },
    });
  }
  _handleOnSelectDepartment(value, label) {
    this.setState({
      department: { value: value, label: label },
    });
  }
  _handlOnSelectNRCCode(value, label) {
    this.setState({
      nrccode: { value: value, label: label },
    });
  }
  _handleOnSelectNRCState(value, label) {
    this.setState({
      nrcstate: { value: value, label: label },
    });
  }
  _handleOnSelectNRCStatus(value, label) {
    this.setState({
      nrcstatus: { value: value, label: label },
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          name="View Employee"
          //   img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Name</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Position</Text>
              </View>
              <View style={{ flex: 1 }}>
                <DropDown
                  value={this.state.position}
                  options={POSITION}
                  widthContainer="100%"
                  onSelect={(value, label) =>
                    this._handleOnSlectPosition(value, label)
                  }
                />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Department</Text>
              </View>
              <View style={{ flex: 1 }}>
                <DropDown
                  value={this.state.department}
                  options={DEPARTMENT}
                  widthContainer="100%"
                  onSelect={(value, label) =>
                    this._handleOnSelectDepartment(value, label)
                  }
                />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Phone No</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput keyboardType="phone-pad" />
              </View>
            </View>

            {/* <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>NRC</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.nrccode}
                    options={NRCCODE}
                    widthContainer="95%"
                    onSelect={(value, label) =>
                      this._handlOnSelectNRCCode(value, label)
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.nrcstate}
                    options={NRCSTATE}
                    widthContainer="95%"
                    onSelect={(value, label) =>
                      this._handleOnSelectNRCState(value, label)
                    }
                  />
                </View>
              </View>
            </View> */}

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>NRC</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput/>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Address</Text>
              </View>
              <View style={styles.textArea}>
                <TextInput editable={false}/>
              </View>
            </View>
{/* 
            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text></Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.nrcstatus}
                    options={NRCSTATUS}
                    widthContainer="95%"
                    onSelect={(value, label) =>
                      this._handleOnSelectNRCStatus(value, label)
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput style={styles.nrcTextInput} />
                </View>
              </View>
            </View> */}

          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondConatiner: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    width: "60%",
    padding: 5,
    borderRadius: 5,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
  },
  text: {
    width: "40%",
  },
  nrcTextInput: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
  },
  touchBtn: {
    width: 100,
    height: 40,
    borderWidth: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2EAEA",
    borderColor: "#F2EAEA",
    borderRadius: 5,
  },
  textArea:{
    borderWidth: 1,
    width: "60%",
    minHeight:80,
    // padding: 5,
    borderRadius: 5,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    paddingHorizontal:10
  }
});
