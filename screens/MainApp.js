import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Provider } from "react-redux";
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

import { MonoText } from "../components/StyledText";
import MainComponent from "../components/first-component";
import store from "../store/yelp";

export default () => {
	return (
		<Provider store={store}>
			<MainComponent />
		</Provider>
	);
};
