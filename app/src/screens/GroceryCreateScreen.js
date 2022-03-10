import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import GroceryForm from "../components/GroceryForm";
import { Context as GroceryContext } from "../context/GroceryContext";
import { FontAwesome } from "@expo/vector-icons";

const GroceryCreateScreen = ({ navigation }) => {
	const { createGrocery } = useContext(GroceryContext);

	useEffect(() => {
		navigation.setParams({
			createGrocery
		});
	}, []);

	return (
		<GroceryForm
			navigation={navigation}
		/>
	);
};

GroceryCreateScreen.navigationOptions = ({ navigation }) => {
	const createGrocery = navigation.getParam("createGrocery")
	const groceryQuantity = navigation.getParam("groceryQuantity")
	const groceryName = navigation.getParam("groceryName")

	return {
		headerRight: () => (
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					onPress={() => createGrocery(groceryQuantity, groceryName, () => navigation.navigate("GroceryList"))}>
					<FontAwesome style={styles.headerIcons} name="check" size={25}/>
				</TouchableOpacity>
			</View>
		),
		title: "Add Grocery Item",
		headerStyle: {
			backgroundColor: "#4854C7",
		},
		headerTintColor: "#fff",
		headerTitleStyle: {
			fontWeight: "bold",
		}
	}
};

const styles = StyleSheet.create({
	headerIcons: {
		marginRight: 10,
		color: "#fff"
	}
});

export default GroceryCreateScreen;