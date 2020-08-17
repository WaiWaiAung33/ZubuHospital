import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ScrollView
} from "react-native";

import { DrawerActions } from "react-navigation-drawer";

//impoort components
import PositionCard from "@components/PositionCard";
import Header from "@components/Header";
import SuccessModal from "@components/SuccessModal";

//import api
const axios = require("axios");

import { DesignationApi } from "@api/Url";

export default class Position extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      data: [],
      arrIndex: null,
      isOpenSuccessModel: false,
    };
  }
  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getAllPosition();
    });
    await this._getAllPosition();
  }
  _getAllPosition() {
    const self = this;
    axios
      .get(DesignationApi, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.designation);
        self.setState({
          data: response.data.designation,
        });
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
      this.props.navigation.navigate("EditPosition", { data: data });
    }
  }
  _handleOnPressDelete(data) {
    const self = this;
    const url = DesignationApi + "/" + data.id;
    axios
      .delete(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({
          isOpenSuccessModel: true,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
  }

  render() {
    // console.log(this.state.access_token);
    return (
      <View style={styles.container}>
        <Header
          name="Position"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <View style={styles.secondContainer}>
          <View style={styles.thirdContainer}>
            <Text>No</Text>
            <Text>Position Name</Text>
            {/* <Text>Action</Text> */}
          </View>
          <ScrollView>
          {this.state.data.map((data, index) => {
            var index=1;
            return (
              <View key={index}>
                <PositionCard
                  No={index++}
                  name={data.designation}
                  onPressEdit={() => this._handleOnPressEdit(1, data)}
                  onPressDelete={() => this._handleOnPressDelete(data)}
                  onPressView={() => this.handleOnPressView()}
                />
              </View>
            );
          })}
          </ScrollView>
        </View>
{/* 
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("CreatePosition")}
          style={styles.newBtn}
        >
          <Image
            source={require("@images/addblue.png")}
            style={styles.btnImg}
          />
        </TouchableOpacity> */}
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Designation delete Successfully"
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
