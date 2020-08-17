import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

//import Components
import CustomModalPhoto from "@components/CustomModalPhoto";
import SuccessModal from "@components/SuccessModal";
import QRCodeModalView from "@components/QRCodeModalView";


export default class ImgUploadBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenPhotoModal: false,
      isOpenSuccessModal: false,
      locale: null,
      isOpenImage: false
    };
  }

  getPermissions = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);

    const { status } = await Permissions.getAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (status !== "granted") {
      // alert("Permission Not Granted");
      this.setState({ isOpenSuccessModal: true });
    } else {
      this.setState({ isOpenPhotoModal: true });
    }
  };

  onPressUploadBtn() {
    this.getPermissions();
  }

  _handleOnCloseSuccessModal() {
    this.setState({ isOpenSuccessModal: false });
  }

  pickPhoto = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    this.setState({ isOpenPhotoModal: false });
    if (pickerResult.cancelled == false) {
      //callPropsFunction
      if (this.props.onChooseImage) {
        this.props.onChooseImage(pickerResult);
      }
    }
  };

  takePhoto = async () => {
    let imagResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });
    this.setState({ isOpenPhotoModal: false });
    if (imagResult.cancelled == false) {
      //callPropsFunction
      if (this.props.onChooseImage) {
        this.props.onChooseImage(imagResult);
      }
    }
  };

  _handleOnChoose(action) {
    if (action == "PICK_PHOTO") {
      this.pickPhoto();
    }
    if (action == "TAKE_PHOTO") {
      this.takePhoto();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={() => {
            this.onPressUploadBtn();
          }}
        >
          <Image style={styles.btnIcon} source={require("@images/photo.png")} />
          <Text style={styles.btnText}>
            {this.props.btnText ? this.props.btnText : "Add your photo . . ."}
          </Text>
        </TouchableOpacity>
        {this.props.imagePath ? (
          <TouchableOpacity
            onPress={() => this.setState({ isOpenImage: true })}
            activeOpacity={0.7}
          >
            <Image
              style={styles.selectedImage}
              source={{ uri: this.props.imagePath }}
            />
          </TouchableOpacity>
        ) : null}

        <CustomModalPhoto
          isOpen={this.state.isOpenPhotoModal}
          onClose={() => this.setState({ isOpenPhotoModal: false })}
          onChoose={this._handleOnChoose.bind(this)}
        />
        <SuccessModal
          isOpen={this.state.isOpenSuccessModal}
          text={
            "ဓာတ်ပုံရယူရန်အတွက် Camera and Photo Library Access လိုအပ်ပါသည်။"
          }
          headerIcon={require("@images/issue.png")}
          onClose={this._handleOnCloseSuccessModal.bind(this)}
        />
        <QRCodeModalView
          isOpen={this.state.isOpenImage}
          onClose={() => this.setState({ isOpenImage: false })}
          img={this.props.imagePath}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 40
  },
  btn: {
    flexDirection: "row",
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: Colors.borderColor
  },
  btnIcon: {
    width: 20,
    height: 20
  },
  btnText: {
    fontSize: 14,
    fontFamily: Fonts.secondary,
    marginLeft: 10
  },
  selectedImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 5
  }
});
