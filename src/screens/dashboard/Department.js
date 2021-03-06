import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Image,
  BackHandler,
  Dimensions
} from "react-native";
const { width } = Dimensions.get("window");
//import api
import { ImgUploadApi, DashboardApi } from "@api/Url";
const axios = require("axios");

export default class DashboardDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleid: "",
      nrccode: "",
      nrc_state: "",
      nrc_status: "",
      nrc_number: "",
      name: "",
      phone: "",
      address: "",
      photo: "",
      name_en: "",
      department: "",
      designation: "",
      access_token: null,
      data: [],
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    this.setBackHandler();
    const access_token = await AsyncStorage.getItem("access_token");
    const roleid = await AsyncStorage.getItem("role_id");
    const nrccode = await AsyncStorage.getItem("nrccode");
    const nrc_state = await AsyncStorage.getItem("nrc_state");
    const nrc_status = await AsyncStorage.getItem("nrc_status");
    const nrc_number = await AsyncStorage.getItem("nrc_number");
    const name = await AsyncStorage.getItem("name");
    const phone = await AsyncStorage.getItem("phone");
    const address = await AsyncStorage.getItem("address");
    const photo = await AsyncStorage.getItem("photo");
    const name_en = await AsyncStorage.getItem("name_en");
    const department = await AsyncStorage.getItem("department");
    const designation = await AsyncStorage.getItem("designation");
    this.setState({
      roleid,
      nrccode,
      nrc_state,
      nrc_status,
      nrc_number,
      name,
      phone,
      address,
      photo: photo,
      name_en,
      department,
      designation,
      access_token,
    });
    await this.getDashboard();
  }
  async getDashboard() {
    const self = this;
    axios
      .get(DashboardApi, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log("Dashboard",response.data.department);
        self.setState({
          data: response.data.department,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };
  render() {
    // console.log(AsyncStorage.getItem("role_id"));
    return (
      <View>
        {this.state.roleid == "1" ? (
          <View style={styles.container}>
            <View style={styles.btnContainer}>
              {this.state.data.map((data, index) => {
               
                return (
                  <View key={index}>
                    <Text style={{textAlign:"center"}}>{data.department}</Text>
                    <View
                      style={{
                        // width: 150,
                        // height: 100,
                        backgroundColor: "#039BE7",
                        marginTop: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        width: width / 2 - 50,
                        height: width / 2 - 50,
                        margin: 5,

                      }}
                    >
                      <Text style={styles.textdep}>Employee</Text>
                      <Text style={styles.textdep}>{data.employee.length}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            {/* <Header
              name="Profile"
              //   img={require("@images/threeline.png")}
              Onpress={() => this._handleOnPress()}
            /> */}
            {/* <View style={{ marginTop: 40, alignItems: "center", flex: 1 }}> */}
            <ScrollView>
              <View style={styles.fourthContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {this.state.photo ? (
                    <View>
                      <Image
                        source={{
                          uri:
                            ImgUploadApi +
                            "/" +
                            this.state.name_en +
                            "/" +
                            this.state.photo,
                        }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                      />
                    </View>
                  ) : (
                    <View>
                      <Image
                        source={require("@images/people.jpg")}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                      />
                    </View>
                  )}
                </View>

                <Text style={styles.text}>{this.state.name}</Text>
                <Text style={styles.text}>{this.state.designation}</Text>
                <Text style={styles.text}>{this.state.department}</Text>
                <Text style={styles.text}>{this.state.phone}</Text>
                <Text style={styles.text}>
                  {" "}
                  {this.state.nrccode +
                    "/" +
                    this.state.nrc_state +
                    "(" +
                    this.state.nrc_status +
                    ")" +
                    this.state.nrc_number}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { height: 80, textAlignVertical: "top" },
                  ]}
                >
                  {this.state.address}
                </Text>
              </View>
            </ScrollView>
            {/* </View> */}
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },
   btnContainer: {
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10
  },
  secondContainer: {
    // marginLeft: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  thirdContainer: {
    borderWidth: 1,
    width: 150,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    height: 100,
    backgroundColor: "#039BE7",
    borderColor: "#039BE7",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  headerText: {
    fontSize: 18,
  },
  fourthContainer: {
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
  textdep: {
    color: "#ffffff",
    fontSize: 18,
  },
});
