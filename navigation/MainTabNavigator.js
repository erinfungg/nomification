import React from "react";
import { Platform } from "react-native";
import {
	createStackNavigator,
	createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MainApp from "../screens/MainApp";

const config = Platform.select({
	web: { headerMode: "screen" },
	default: {}
});

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: "Home",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === "ios"
					? `ios-information-circle${focused ? "" : "-outline"}`
					: "md-information-circle"
			}
		/>
	)
};

HomeStack.path = "";

const LinksStack = createStackNavigator(
	{
		Links: LinksScreen
	},
	config
);

LinksStack.navigationOptions = {
	tabBarLabel: "Links",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === "ios" ? "ios-link" : "md-link"}
		/>
	)
};

LinksStack.path = "";

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen
	},
	config
);

SettingsStack.navigationOptions = {
	tabBarLabel: "Settings",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === "ios" ? "ios-options" : "md-options"}
		/>
	)
};

SettingsStack.path = "";

const MainStack = createStackNavigator(
	{
		Main: MainApp
	},
	config
);

MainStack.navigationOptions = {
	tabBarLabel: "Main",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === "ios" ? "ios-options" : "md-options"}
		/>
	)
};

MainStack.path = "";

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	MainStack,
	LinksStack,
	SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
