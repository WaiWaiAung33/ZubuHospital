import React from "react";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import components
import HeaderLeft from "@components/HeaderLeft";

//import navigator
import DashboardNavigator from "./DashboardNavigator";

export default createAppContainer(
  createStackNavigator(
    {
      DashboardNavigator: {
        screen: DashboardNavigator,
        navigationOptions: ({ navigation }) => ({
          headerTitle: "Zubuthiri Hospital",
          headerStyle: {
            backgroundColor: "#039BE7",
            height:70,
          },
          headerTitleStyle: {
            color: "#ffffff",
            fontSize:18
          },
          headerTitleAlign: {
            alignItems: "center",
            // justifyContent: "center",
          },

          headerLeft: () => <HeaderLeft navigation={navigation} />,
        }),
      },
    },
    {
      initialRouteName: "DashboardNavigator",
    }
  )
);
