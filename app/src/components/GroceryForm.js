import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const GroceryForm = ({ navigation }) => {
	const [groceryQuantity, setGroceryQuantity] = useState("");
	const [groceryName, setGroceryName] = useState("");

	useEffect(() => {
		navigation.setParams({
			groceryQuantity: groceryQuantity,
			groceryName: groceryName
		});
	}, [groceryQuantity, groceryName]);

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