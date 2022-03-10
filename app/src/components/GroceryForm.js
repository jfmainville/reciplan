import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
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
			<TextInput
				style={styles.textInput}
				mode="outlined"
				label="Quantity"
				value={groceryQuantity}
				onChangeText={(text) => setGroceryQuantity(text)}
			/>
			<TextInput
				style={styles.textInput}
				mode="outlined"
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
	textInput: {
		margin: 5
	},
	save: {
		marginTop: 10,
		backgroundColor: "#F49301",
	},
	card: {
		flex: 1
	}
});

export default GroceryForm;