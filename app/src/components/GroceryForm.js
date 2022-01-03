import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const GroceryForm = ({ onSubmit }) => {
	const [groceryQuantity, setGroceryQuantity] = useState("");
	const [groceryName, setGroceryName] = useState("");

	const onAddGroceryItem = (groceryQuantity, groceryName) => {
		if (groceryQuantity && groceryName) {
			const groceryWeightUnit = groceryQuantity.split(/([0-9]+)/)[2].trim();
			onSubmit(parseInt(groceryQuantity), groceryWeightUnit, groceryName);
		}
	};

	return (
		<View>
			<Spacer/>
			<Input
				label="Quantity"
				value={groceryQuantity}
				onChangeText={(text) => setGroceryQuantity(text)}
			/>
			<Input
				label="Ingredient Name"
				value={groceryName}
				onChangeText={(text) => setGroceryName(text)}
			/>
			<Spacer/>
			<Button
				title="Save"
				onPress={() => onAddGroceryItem(groceryQuantity, groceryName)}
			/>
		</View>
	);
};

GroceryForm.defaultProps = {
	initialValues: {
		name: "",
		style: "",
		preparationTime: "",
		cookTime: "",
		ingredients: []
	}
};

const styles = StyleSheet.create({
	save: {
		marginTop: 10,
		backgroundColor: "#F49301",
	},
	card: {
		flex: 1
	}
});

export default GroceryForm;