import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import { QRCode } from "react-native-custom-qr-codes";

const { width } = Dimensions.get("window");
export default class QRCodeModalView extends React.Component {
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
        onRequestClose={() => {
          this.close();
        }}
      >
        {/* {this.props.userID ? ( */}
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: "rgba(52, 52, 52, 0.4)" },
          ]}
        >
          <View style={[styles.modalBody, { backgroundColor: "#fff" }]}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                {/* <Image
                  source={
                    this.props.headerIcon
                      ? this.props.headerIcon
                      : require("@images/qrcode-msg.png")
                  }
                  style={styles.headerIcon}
                /> */}
              </View>

              <TouchableOpacity
                onPress={() => this.close()}
                style={[styles.closeImg]}
              >
                <Image
                  source={require("@images/cancel.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.qrCodeWrapper}>
              {this.props.userID ? (
              <QRCode
                content={this.props.userID}
                codeStyle="square"
                size={200}
                // logo={require("@icons/logos/Logo.png")}
                // linearGradient={["#00807E", "#3BC6C3"]}
              />
             ) : null} 
            </View>
          </View>
        </View>
        {/* ) : (
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: "rgba(52, 52, 52,1)" }
            ]}
          >
            <View style={styles.modalBody}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    alignItems: "center",
                    flex: 1
                  }}
                ></View>
              </View>
              <View style={styles.qrCodeWrapper}>
                <TouchableOpacity onPress={() => this.close()} activeOpacity={0.7}>
                  <Image
                    style={styles.image}
                    source={{ uri: this.props.img }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )} */}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBody: {
    width: "100%",
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  headerIcon: {
    width: 42,
    height: 42,
    marginTop: 10,
  },
  image: {
    width: width - 40,
    height: width,
    resizeMode: "stretch",
  },
  qrCodeWrapper: {
    padding: 20,
    justifyContent: "center",
    height: null,
  },
  qrCodeImg: {
    width: width / 2,
    height: width / 2,
  },
  closeImg: {
    position: "absolute",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
  },
  closeImage: {
    position: "absolute",
    padding: 10,
    right: 0,
    top: 0,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
});
