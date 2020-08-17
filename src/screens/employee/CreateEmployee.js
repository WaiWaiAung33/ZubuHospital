import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import FormData from "form-data";

//import components
import Header from "@components/Header";
import DropDown from "@components/DropDown";
// import ImgUploadBtn from "@components/ImgUploadBtn";  

//import Datepicker
import DatePicker from "react-native-datepicker";
import Moment from "moment";
//import styles
import Style from "@styles/Styles";

//import api
const axios = require("axios");
import { DesignationApi, DepartmentApi,CreateEmployeeApi } from "@api/Url";

const NRCCODE = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
];
const NRCSTATE = [
  { value: 1, label: "7/khathkha" },
  { value: 2, label: "8/zthapha" },
];
const NRCSTATUS = [
  { value: 1, label: "N" },
  { value: 2, label: "P" },
];

export default class CreateEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: { value: null, label: null },
      departments: [],
      position: { value: null, label: null },
      designations: [],
      nrccode: { value: null, label: null },
      nrcstate: { value: null, label: null },
      nrcstatus: { value: null, label: null },
      access_token: null,
      name:"",
      fathername:"",
      date:null,
      mail:"",
      education:"",
      phone:"",
      nrcstate:"",
      nrcnumber:"",
      address:"",
      imagePath: null,

    };
  }
  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    await this._getAllDesignation();
    await this._getAllDepartment();
  }
  async _getAllDesignation() {
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
        // self.setState({
        //   data: response.data.designation,
        // });
        // console.log("NRC State",response.data);
        let data = response.data.designation;
        let arr = [];
        data.map((data, index) => {
          // console.log("Data Branch",data.id);

          var obj = { value: data.id, label: data.designation };

          arr.push(obj);
        });
        self.setState({ designations: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  async _getAllDepartment() {
    const self = this;
    axios
      .get(DepartmentApi, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.designation);
        // self.setState({
        //   data: response.data.designation,
        // });
        // console.log("NRC State",response.data);
        let data = response.data.department;
        let arr = [];
        data.map((data, index) => {
          // console.log("Data Branch",data.id);

          var obj = { value: data.id, label: data.department };

          arr.push(obj);
        });
        self.setState({ departments: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
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
  _handlecreate(){
    const self =this;
    const fromData = new FormData();
    const { imagePath } = this.state;
    let bodyParam={
      name_mm: self.state.name,
        name_en:self.state.name,
        nrc_mm:self.state.nrcstate,
        nrc_en:self.state.nrcstate,
        nrc_mm_no:self.state.nrcnumber,
        nrc_en_no:self.state.nrcnumber,
        nrc_code_mm:self.state.nrccode.value,
        nrc_code_en:self.state.nrccode.value,
        nrc_status_mm: "1",
        nrc_status_en: "1",
        father_mm:self.state.fathername,
        father_en:self.state.fathername,
        nativ: "sds",
        religion: "sdd",
        education:self.state.education,
        gender: "dsd",
        birth:self.state.date,
        address:self.state.address,
        ph_no:self.state.phone,
        password: "123456789",
        photo: "",
        nrc_front: "",
        nrc_back: "",
        email: self.state.email,
        status: "1",
        department_id:self.state.departments.value,
        designation_id:self.state.designations.value,
    }
    // formData.append("name_mm",self.state.name);
    // formData.append( "name_en",self.state.name);
    // formData.append("nrc_mm",self.state.nrcstate);
    // formData.append("nrc_en",self.state.nrcstate);
    // formData.append("nrc_code_mm",self.state.nrccode.value);
    // formData.append("nrc_code_en",self.state.nrccode.value);
    // fromData.append("nrc_status_mm",);

    // if (imagePath) {
    //   const uriPart = imagePath.split(".");
    //   const fileExtension = uriPart[uriPart.length - 1];
    //   const fileName = imagePath.substr(imagePath.lastIndexOf("/") + 1);

    //   formData.append("feature_photo", {
    //     uri: imagePath,
    //     name: fileName,
    //     type: `image/${fileExtension}`
    //   });
    // }
    axios
    .post(CreateEmployeeApi,bodyParam,{
      headers:{
        Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
      }
    })
    .then(function(response){
      console.log(response.data);
    })
    .catch(function(err){
      console.log(err);
    })
    
  }

  _handleOnChooseImage(image) {
    this.setState({ imagePath: image.uri });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          name="Create Employee"
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
                <TextInput 
                value={this.state.name}
                onChangeText={(value)=>this.setState({name:value})}
                />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Father Name</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput 
                value={this.state.fathername}
                onChangeText={(value)=>this.setState({fathername:value})}
                />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>DOB</Text>
              </View>
              <View style={{ width: "60%" }}>
                <DatePicker
                  date={this.state.date}
                  mode="date"
                  format="DD-MM-YYYY"
                  maxDate={Moment().endOf("day").toDate()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconSource={require("@images/calendar.png")}
                  style={Style.datePickerContainer}
                  customStyles={{
                    dateIcon: Style.datePickerDateIcon,
                    dateInput: Style.datePickerDateInput,
                    dateText: Style.datePickerDateText,
                  }}
                  onDateChange={(date) => this.setState({ data: date })}
                />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Mail</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput
                value={this.state.mail}
                onChangeText={(value)=>this.setState({mail:value})}
                 />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Position</Text>
              </View>
              <View style={{ flex: 1 }}>
                <DropDown
                  value={this.state.position}
                  options={this.state.designations}
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
                  options={this.state.departments}
                  widthContainer="100%"
                  onSelect={(value, label) =>
                    this._handleOnSelectDepartment(value, label)
                  }
                />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Education</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput 
                value={this.state.education}
                onChangeText={(value)=>this.setState({education:value})}
                keyboardType="phone-pad" />
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Phone No</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput 
                value={this.state.phone}
                onChangeText={(value)=>this.setState({phone:value})}
                keyboardType="phone-pad" />
              </View>
            </View>

            <View style={styles.secondConatiner}>
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
                  <TextInput
                    style={{
                      borderWidth: 1,
                      padding: 5,
                      borderRadius: 5,
                      borderColor: "#ffffff",
                      backgroundColor: "#ffffff",
                    }}
                    value={this.state.nrcstate}
                    onChangeText={(value)=>this.setState({nrcstate:value})}
                  />
                  {/* <DropDown
                    value={this.state.nrcstate}
                    options={NRCSTATE}
                    widthContainer="95%"
                    onSelect={(value, label) =>
                      this._handleOnSelectNRCState(value, label)
                    }
                  /> */}
                </View>
              </View>
            </View>

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
                  <TextInput 
                  value={this.state.nrcnumber}
                  onChangeText={(value)=>this.setState({nrcnumber:value})}
                  style={styles.nrcTextInput} keyboardType="phone-pad"/>
                </View>
              </View>
            </View>

            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Address</Text>
              </View>
              <View style={styles.textArea}>
                <TextInput />
              </View>
            </View>
{/* 
            <View style={styles.secondConatiner}>
              <View style={styles.text}>
                <Text>Photo</Text>
              </View>
                <ImgUploadBtn
                  imagePath={this.state.imagePath}
                  onChooseImage={this._handleOnChooseImage.bind(this)}
                />
              </View> */}

            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity 
              onPress={()=>this._handlecreate()}
              style={styles.touchBtn}>
                <Text style={{ color: "#ffffff", fontSize: 18 }}>Save</Text>
              </TouchableOpacity>
            </View>
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
  textArea: {
    borderWidth: 1,
    width: "60%",
    padding: 5,
    borderRadius: 5,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    minHeight: 80,
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
    backgroundColor: "#039BE7",
    borderColor: "#039BE7",
    borderRadius: 5,
  },
});
