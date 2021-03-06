import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
  BackHandler
} from "react-native";

import { DrawerActions } from "react-navigation-drawer";

//impoort components
import EmployeeCard from "@components/EmployeeCard";
import Header from "@components/Header";
import DropDown from "@components/DropDown";

import Moment from "moment";

//import api
const axios = require("axios");
import { EmployeeApi } from "@api/Url";

const POSITION = [
  { value: 1, label: "Doctor" },
  { value: 1, label: "Nurse" },
];
const DEPARTMENT = [
  { value: 1, label: "Department1" },
  { value: 2, label: "Department2" },
];

export default class Position extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      position: { value: null, label: null },
      department: { value: null, label: null },
      access_token: null,
      data: [],
      arrIndex:null,
    };
    this.BackHandler=null;
  }
  async componentDidMount() {
    this.setBackHandler();
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    const { navigation } = this.props;
     this._getAllEmployee();
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getAllEmployee();
    });
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    this.props.navigation.navigate("DashboardDepartment");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  _getAllEmployee(){
    const self = this;
    let bodyParam = {

    };
    axios
    .post(EmployeeApi,bodyParam,{
      headers:{
        Accept:"application/json",
        Authorization:"Bearer " + self.state.access_token,
      }
    })
    .then(function(response){
      self.setState({ data: response.data.employee });
      // console.log(response.data);
    })
    .catch(function(err){
      console.log("Employee Error",err);
    })
  }
//  async _getAllEmployee() {
//     const self = this;
//     const headers =  {
//       Accept:"application/json",
//       Authorization:"Bearer " + self.state.access_token,
//     }
//     console.log(headers);
//     axios
//     .post("http://128.199.79.79/zabuthirish/public/api/employee",{
//       headers,
//     })
//     .then(function (response) {
//         self.setState({ data: response.data.employee });
//         console.log(response.data.employee);
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   }
  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  _handleOnPressEdit() {
    this.props.navigation.navigate("EditEmployee");
  }
  _handleOnPressView(arrIndex,data) {
      if(arrIndex == 2){
        this.props.navigation.navigate("ViewEmployee",{data:data});
      }
  
  }
  _handleOnSelectPosition(value, label) {
    this.setState({ position: { value: value, label: label } });
  }
  _handleOnSelectDepartment(value, label) {
    this.setState({ department: { value: value, label: label } });
  }

  render() {
    // console.log("Employee",this.state.access_token);
    return (
      <View style={styles.container}>
        <Header
          name="Employee"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        {/* <View style={{ marginTop: 10 }}>
          <View style={styles.searchContainer}>
            <View style={styles.searchTextInput}>
              <TextInput
                style={{ flex: 1, height: 40, paddingHorizontal: 10 }}
                placeholder="Search ..."
              ></TextInput>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#039BE7",
                width: "15%",
                height: 40,
                marginLeft: 10,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("@images/search.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ isShow: !this.state.isShow })}
            >
              <Image
                source={require("@images/more1.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View> */}

          {/* {this.state.isShow == true ? (
            <View style={[styles.searchContainer, { marginTop: "2%" }]}>
              <View style={{ flex: 1 }}>
                <DropDown
                  value={this.state.position}
                  options={POSITION}
                  widthContainer="100%"
                  placeholder="Select Position..."
                  onSelect={(value, label) =>
                    this._handleOnSelectPosition(value, label)
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <DropDown
                  value={this.state.department}
                  options={DEPARTMENT}
                  widthContainer="100%"
                  marginLeftContainer={5}
                  placeholder="Select Department..."
                  onSelect={(value, label) =>
                    this._handleOnSelectDepartment(value, label)
                  }
                />
              </View>
            </View>
          ) : null} */}
        {/* </View> */}
        <View style={styles.secondContainer}>
          {this.state.data.map((data, index) => {
            return (
              <View key={index}>
                <EmployeeCard
                 date={Moment(data.created_at).format("DD.MM.YYYY")}
                  name={data.name_mm}
                  position={data.designation.designation}
                  department={data.department.department}
                  phone={data.ph_no}
                  onPressEdit={() => this._handleOnPressEdit()}
                  onPressDelete={() => this._handleOnPressDelete()}
                  onPressView={() => this._handleOnPressView(2,data)}
                  arrIndex={1}
                  Onpress={()=>this._handleOnPressView(2,data)}
                />
              </View>
            );
          })}
        </View>

        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("CreateEmployee")}
          style={styles.newBtn}
        >
          <Image
            source={require("@images/addblue.png")}
            style={styles.btnImg}
          />
        </TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnImg: {
    width: 50,
    height: 50,
  },
  newBtn: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 20,
    marginRight: 20,
  },
  secondContainer: {
    marginTop: 10,
  },

  searchContainer: {
    // flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
    // backgroundColor: "green",
    alignItems: "center",
  },
  searchTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#707070",
    height: 40,
    // marginRight: 10,
    borderRadius: 5,
    // paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
