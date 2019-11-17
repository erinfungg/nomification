import React, { Component } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	SafeAreaView,
	AsyncStorage
} from "react-native";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import Constants from "expo-constants";

import { getBusinesses } from "../store/yelp";

const styles = StyleSheet.create({
	bigBlack: {
		color: "black",
		fontWeight: "bold",
		fontSize: 40
	},
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight
	},
	scrollView: {
		marginHorizontal: 20
	},
	contentContainer: {
		justifyContent: "flex-start",
		alignItems: "center"
	}
});

class MainComponent extends Component {
	state = {
		search: "",
		bookmarks: []
	};

	updateSearch = search => {
		this.setState({ search });
	};

	_storeData = async business => {
		try {
			await AsyncStorage.setItem("businessKey", JSON.stringify(business));
		} catch (error) {
			console.log("error storing data");
		}
	};

	_retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem("businessKey");
			if (value !== null) {
				// We have data!!
				return value;
			}
		} catch (error) {
			// Error retrieving data
		}
	};

	_clearData = async () => {
		try {
			await AsyncStorage.clear();
		} catch (error) {
			console.log("error clearing data", error);
		}
	};

	render() {
		const { search } = this.state;
		//this._clearData();
		//console.log(this._retrieveData().length);
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainer}
				>
					<Text style={styles.bigBlack}>Nomification</Text>
					<SearchBar
						placeholder="Enter location..."
						onChangeText={this.updateSearch}
						value={search}
						platform="ios"
						onSubmitEditing={() => this.props.getBusinesses(this.state.search)}
					/>
					<View>
						{this.props.businesses.map(business => (
							<View
								key={business.name}
								style={{
									flexDirection: "row",
									alignItems: "center"
								}}
								onPress={this._storeData(business)}
							>
								<View style={{ marginLeft: "20%", paddingBottom: 10 }}>
									<Image
										style={{ width: 75, height: 75 }}
										source={{ uri: business.imageUrl }}
									/>
								</View>
								<View
									style={{
										marginRight: "20%",
										flexDirection: "column",
										paddingLeft: 5
									}}
								>
									<Text>{business.name}</Text>
									<Text>{business.location.display_address[0]}</Text>
									<Text>{business.location.display_address[1]}</Text>
								</View>
							</View>
						))}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapState = state => ({
	businesses: state.businesses
});

const mapDispatch = dispatch => ({
	getBusinesses: location => dispatch(getBusinesses(location))
});

export default connect(mapState, mapDispatch)(MainComponent);
