import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class DashboardDepartment extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <View>
            <Text style={styles.headerText}>Department 1</Text>
            <View
              style={[
                styles.thirdContainer,
                {
                  backgroundColor: "#039BE7",
                  borderColor: "#039BE7",
                  elevation: 2,
                },
              ]}
            >
              <Text style={styles.text}>Employee</Text>
              <Text style={styles.text}>20</Text>
            </View>
          </View>
          <View>
            <Text style={styles.headerText}>Department 2</Text>
            <View style={styles.thirdContainer}>
              <Text style={styles.text}>Employee</Text>
              <Text style={styles.text}>20</Text>
            </View>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <View>
            <Text style={styles.headerText}>Department 3</Text>
            <View
              style={[
                styles.thirdContainer,
                {
                  backgroundColor: "#039BE7",
                  borderColor: "#039BE7",
                  elevation: 2,
                },
              ]}
            >
              <Text style={styles.text}>Employee</Text>
              <Text style={styles.text}>20</Text>
            </View>
          </View>
          <View>
            <Text style={styles.headerText}>Department 4</Text>
            <View style={styles.thirdContainer}>
              <Text style={styles.text}>Employee</Text>
              <Text style={styles.text}>20</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    // marginLeft: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  text:{
      color:"white",
      fontSize:15
  },
  headerText:{
      fontSize:18
  }
});
