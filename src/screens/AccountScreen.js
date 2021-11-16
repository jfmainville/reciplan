import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const AccountScreen = () => {
	return (
		<SafeAreaView forceInset={{ top: "always " }}>
			<Text style={{ fontSize: 48 }}>Account Screen</Text>
		</SafeAreaView>
	);
};

AccountScreen.navigationOptions = {
	title: "Account",
	tabBarIcon: <FontAwesome name="gear" size={20}/>
};

export default AccountScreen;