import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

//import screem
import Department from "@screens/department/Department";
import Position from "@screens/position/Position";
import Employee from "@screens/employee/Employee";
import ChangePassword from "@screens/account/ChangePassword";
import QrScan from "@screens/qrcode/QrScan";
import Profile from "@screens/account/Profile";

//import Navigator
import HDashboardNavigator from "./HDashboardNavigator";

//import components
import DrawerSideBar from "@components/DrawerSideBar";


export default createAppContainer(
  createDrawerNavigator(
    {
      HDashboardNavigator:{
        screen:HDashboardNavigator
      },
      Department: {
        screen: Department,
      },
      Position: {
        screen: Position,
      },
      Employee: {
        screen: Employee,
      },
      ChangePassword:{
          screen: ChangePassword
      },
      QrScan:{
        screen: QrScan
    },
    Profile:{
      screen:Profile
    }
    },
    {
      initialRouteName: "HDashboardNavigator",
      contentComponent: DrawerSideBar,
    }
  )
);
