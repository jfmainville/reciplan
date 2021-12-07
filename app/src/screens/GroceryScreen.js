import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const GroceryScreen = () => {
	return (
		<SafeAreaView forceInset={{ top: "always " }}>
			<Text>Grocery Screen</Text>
		</SafeAreaView>
	);
};

GroceryScreen.navigationOptions = {
	headerTitle: "Grocery",
	title: "Grocery List",
	tabBarIcon: <FontAwesome name="shopping-cart" size={20}/>
};

export default GroceryScreen;