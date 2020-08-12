import React from "react";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//import screen
import CreatePosition from "@screens/position/CreatePosition";
import EditPosition from "@screens/position/EditPosition";

import CreateDepartment from "@screens/department/CreateDepartment";
import EditDepartment from "@screens/department/EditDepartment";

import CreateEmployee from "@screens/employee/CreateEmployee";
import EditEmployee from "@screens/employee/EditEmployee";
import ViewEmployee from "@screens/employee/ViewEmployee";

import Profile from "@screens/account/Profile";

//import Navigators
import DrawerNavigator from "./DrawerNavigator";

export default createAppContainer(
  createStackNavigator(
    {
      DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      CreatePosition: {
        screen: CreatePosition,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      EditPosition: {
        screen: EditPosition,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      CreateDepartment: {
        screen: CreateDepartment,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      EditDepartment: {
        screen: EditDepartment,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      CreateEmployee: {
        screen: CreateEmployee,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      EditEmployee: {
        screen: EditEmployee,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      ViewEmployee: {
        screen: ViewEmployee,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
    },
    {
      initialRouteName: "DrawerNavigator",
    }
  )
);
