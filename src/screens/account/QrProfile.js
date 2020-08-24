import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";


//import api
import { ImgUploadApi } from "@api/Url";

//import components
import Header from "@components/Header";

export default class QrProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleOnPress() {
    this.props.navigation.navigate(this.props.navigation.getParam("backRoute"));
  }
  render() {
   const data = this.props.navigation.getParam("data");
//    console.log("Data",data);
    return (
      <View style={styles.container}>
        <Header
          name="Profile"
          Onpress={() => this._handleOnPress()}
        />
        <View style={{ marginTop: 40, alignItems: "center", flex: 1 }}>
          <ScrollView>
            <View style={styles.secondContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                  {data.photo ? (
                <View>
                  <Image
                    source={{
                      uri: ImgUploadApi + "/" + data.name_en + "/" + data.photo,
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

              <Text style={styles.text}>{data.name_mm}</Text>
              <Text style={styles.text}>{data.designation}</Text>
              <Text style={styles.text}>{data.department}</Text>
              <Text style={styles.text}>{data.ph_no}</Text>
              <Text style={styles.text}>
                {data.nrc_code_en +
                  "/" +
                  data.nrc_en +
                  "(" +
                  data.nrc_status_en +
                  ")" +
                  data.nrc_en_no}
              </Text>
              <Text
                style={[styles.text, { height: 80, textAlignVertical: "top" }]}
              >
               {data.address}
              </Text>
            </View>
          </ScrollView>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  secondContainer: {
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
});
