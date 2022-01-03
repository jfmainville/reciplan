import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import GroceryForm from "../components/GroceryForm";
import { Context as GroceryContext } from "../context/GroceryContext";

const GroceryCreateScreen = ({ navigation }) => {
	const { createGrocery } = useContext(GroceryContext);

	return (
		<GroceryForm
			onSubmit={(groceryQuantity, groceryWeightUnit, groceryName) => createGrocery(groceryQuantity, groceryWeightUnit, groceryName, () => navigation.navigate("GroceryList"))}
		/>
	);
};

GroceryCreateScreen.navigationOptions = {
	title: "Add Grocery Item",
	headerStyle: {
		backgroundColor: "#4854C7",
	},
	headerTintColor: "#fff",
	headerTitleStyle: {
		fontWeight: "bold",
	}
};

const styles = StyleSheet.create({});

export default GroceryCreateScreen;