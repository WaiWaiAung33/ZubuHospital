import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";


const { width } = Dimensions.get("window");

export default class PhoneCallModal extends React.Component {
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    return (
      <Modal
        animationType="fade"
        // transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.touchBtn}
            onPress={() => this.close()}
          >
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Image
              source={this.props.photo}
              style={{
                width: width - 10,
                height:width,
                backgroundColor:"white",
                borderRadius: 5,
                marginTop: 15,
              }}
            />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(52, 52, 52, 0.4)",
   },
});
