import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

//import components
import Header from "@components/Header";
import DropDown from "@components/DropDown";
//import components
import PhotoModal from "@components/PhotoModal";
import PhotoModalNRCFront from "@components/PhotoModal";
import PhotoModalNRCBack from "@components/PhotoModal";

//import api
import { ImgUploadApi } from "@api/Url";

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
      isOpenPhotoModal: false,
      isOpenPhotoModalBack:false,
      isOpenPhotoModalFront:false
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
  _onPress() {
    this.setState({ isOpenPhotoModal: true });
  }
  _onPressFront() {
    this.setState({ isOpenPhotoModalFront: true });
  }
  _onPressBack() {
    this.setState({ isOpenPhotoModalBack: true });
  }

  render() {
    let data = this.props.navigation.getParam("data");
    // console.log(data);
    let nrc =
      data.nrc_code_en +
      "/" +
      data.nrc_status_en +
      "/" +
      "(N)" +
      "/" +
      data.nrc_en_no;
    return (
      <View style={styles.container}>
        <Header
          name="Employee Detail"
          //   img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <PhotoModal
          isOpen={this.state.isOpenPhotoModal}
          photo={{ uri: ImgUploadApi + "/" + data.name_en + "/" + data.photo }}
          onClose={() => this.setState({ isOpenPhotoModal: false })}
        />
         <PhotoModalNRCFront
          isOpen={this.state.isOpenPhotoModalFront}
          photo={{ uri: ImgUploadApi + "/" + data.name_en + "/" + data.nrc_front }}
          onClose={() => this.setState({ isOpenPhotoModalFront: false })}
        />
         <PhotoModalNRCBack
          isOpen={this.state.isOpenPhotoModalBack}
          photo={{ uri: ImgUploadApi + "/" + data.name_en + "/" + data.nrc_back }}
          onClose={() => this.setState({ isOpenPhotoModalBack: false })}
        />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>အမည်</Text>
              </View>
              <View style={styles.textInput}>
                <Text>{data.name_mm}</Text>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>အဖအမည်</Text>
              </View>
              <View style={styles.textInput}>
                <Text>{data.father_mm}</Text>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>မွေးသက္ကရာဇ် </Text>
              </View>
              <View style={styles.textInput}>
                <Text>{data.birth}</Text>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>အီးမေးလ် </Text>
              </View>
              <View style={styles.textInput}>
                <Text>{data.email}</Text>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>ရာထူး</Text>
              </View>
              <View style={styles.textInput}>
                <Text>{data.designation.designation}</Text>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>ဌာန</Text>
              </View>
              <View style={styles.textInput}>
                <Text>{data.department.department}</Text>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>ပညာအရည်အချင်း</Text>
              </View>
              <View style={styles.textInput}>
                <Text>{data.education}</Text>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>ဖုန်းနံပတ်</Text>
              </View>
              <View style={styles.textInput}>
                <Text>{data.ph_no}</Text>
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
                <Text>မှတ်ပုံတင်နံပတ်</Text>
              </View>
              <View style={styles.textInput}>
                <Text>{nrc}</Text>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>နေရပ်လိပ်စာ</Text>
              </View>
              <View style={styles.textArea}>
                <TextInput editable={false}>{data.address}</TextInput>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>ဓာတ်ပုံ</Text>
              </View>
              {data.photo ? (
                <View style={{ width: "60%" }}>
                  <TouchableOpacity onPress={() => this._onPress()}>
                    <Image
                      source={{
                        uri:
                          ImgUploadApi + "/" + data.name_en + "/" + data.photo,
                      }}
                      style={{ width: 200, height: 200 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
                
            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>မှတ်ပုံတင်အရှေ့</Text>
              </View>
              {data.photo ? (
                <View style={{ width: "60%" }}>
                  <TouchableOpacity onPress={() => this._onPressFront()}>
                    <Image
                      source={{
                        uri:
                          ImgUploadApi +
                          "/" +
                          data.name_en +
                          "/" +
                          data.nrc_front,
                      }}
                      style={{ width: 200, height: 200, flex: 1 }}
                    />
                  </TouchableOpacity>
                </View>
              ) :null}
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>မှတ်ပုံတင်အနောက်</Text>
              </View>
              {data.photo ? (
                <View style={{ width: "60%" }}>
                  <TouchableOpacity onPress={() => this._onPressBack()}>
                    <Image
                      source={{
                        uri:
                          ImgUploadApi +
                          "/" +
                          data.name_en +
                          "/" +
                          data.nrc_back,
                      }}
                      style={{ width: 200, height: 200 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
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
  textArea: {
    borderWidth: 1,
    width: "60%",
    minHeight: 80,
    // padding: 5,
    borderRadius: 5,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
});
