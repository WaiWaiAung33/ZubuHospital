import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
  BackHandler
} from "react-native";

import { DrawerActions } from "react-navigation-drawer";

//impoort components
import DepartmentCard from "@components/DepartmentCard";
import Header from "@components/Header";
import SuccessModal from "@components/SuccessModal";

//import api
import { DepartmentApi } from "@api/Url";
const axios = require("axios");

export default class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      data: [],
      arrIndex: null,
      isOpenSuccessModel: false,
    };
    this.BackHandler=null;
  }
  async componentDidMount() {
    this.setBackHandler();
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getAllDepartment();
    });
    await this._getAllDepartment();
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
  _getAllDepartment() {
    const self = this;
    axios
      .get(DepartmentApi, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.department);
        self.setState({ data: response.data.department });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  _handleOnPressEdit(arrIndex, data) {
    if (arrIndex == 1) {
      this.props.navigation.navigate("EditDepartment", { data: data });
    }
  }
  _handleOnPressDelete(data) {
    const self = this;
    const url = DepartmentApi + "/" + data.id;
    axios
      .delete(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        self.setState({ isOpenSuccessModel: true });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          name="Department"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <View style={styles.secondContainer}>
          <View style={styles.thirdContainer}>
            <Text>No</Text>
            <Text>Department Name</Text>
            {/* <Text>Action</Text> */}
          </View>
          {this.state.data.map((data, index) => {
            // var index=1;
            return (
              <View key={index}>
                <DepartmentCard
                  No={index}
                  name={data.department}
                  onPressEdit={() => this._handleOnPressEdit(1, data)}
                  onPressDelete={() => this._handleOnPressDelete(data)}
                  onPressView={() => this.handleOnPressView()}
                />
              </View>
            );
          })}
        </View>

        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("CreateDepartment")}
          style={styles.newBtn}
        >
          <Image
            source={require("@images/addblue.png")}
            style={styles.btnImg}
          />
        </TouchableOpacity> */}

        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Department update Successfully"
          onClose={() => this._handleOnClose()}
        />
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
  thirdContainer: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    margin: 10,
  },
});
