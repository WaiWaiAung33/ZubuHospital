import React from "react";
import { View, Text, StyleSheet ,TouchableOpacity,Image} from "react-native";

import { DrawerActions } from "react-navigation-drawer";

//impoort components
import PositionCard from "@components/PositionCard";
import Header from "@components/Header";

export default class Position extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  _handleOnPressEdit(){
    this.props.navigation.navigate("EditPosition");
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          name="Position"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <View style={styles.secondContainer}>
        <PositionCard
          onPressEdit={() => this._handleOnPressEdit()}
          onPressDelete={() => this._handleOnPressDelete()}
          onPressView={() => this.handleOnPressView()}
        />
        </View>
        
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("CreatePosition")}
          style={styles.newBtn}
        >
          <Image
            source={require("@images/addblue.png")}
            style={styles.btnImg}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnImg:{
      width:50,
      height:50
  },
  newBtn:{
      flex:1,
      justifyContent:"flex-end",
      alignItems:"flex-end",
      marginBottom:20,
      marginRight:20
  },
  secondContainer:{
      marginTop:10
  }
});
