import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import Screens
import DashboardDepartment from "@screens/dashboard/Department";
import Profile from "@screens/account/Profile";
//import React
import React from "react";

export default createAppContainer(
  createStackNavigator(
    {
      DashboardDepartment: {
        screen: DashboardDepartment,
        navigationOptions: () => ({
         headerShown:false
        }),
      },
    },

    {
      initialRouteName: "DashboardDepartment",
     
    }
  )
);

// const styles = StyleSheet.create({
//   img: {
//     width: 30,
//     height: 30
//   }
// });
