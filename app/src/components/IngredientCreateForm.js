import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";

const IngredientCreateForm = ({
	ingredientName,
	ingredientQuantity,
	ingredientUnit,
	onAddIngredient,
	setIngredientName,
	setIngredientQuantity,
	setIngredientUnit
}) => {

	return (
		<View>
			<Input
				label="Ingredient Name"
				value={ingredientName}
				onChangeText={(text) => setIngredientName(text)}
			/>
			<Input
				label="Qty"
				value={ingredientQuantity}
				onChangeText={(text) => setIngredientQuantity(text)}
			/>
			<Input
				label="Unit"
				value={ingredientUnit}
				onChangeText={(text) => setIngredientUnit(text)}
			/>
			<Button
				title="Add Ingredient"
				onPress={() => onAddIngredient(ingredientQuantity, ingredientUnit, ingredientName)}
			/>
			<Spacer/>
		</View>
	)
		;
};

IngredientCreateForm.defaultProps = {
	initialValues: {
		ingredientQuantity: "",
		ingredientUnit: "",
		ingredientName: "",
		ingredients: []
	}
};

const styles = StyleSheet.create({});

export default IngredientCreateForm;