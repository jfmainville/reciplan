import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

const RecipeCreateForm = ({ onSubmit, initialValues }) => {
	const [recipeName, setRecipeName] = useState(initialValues.recipeName);
	const [recipeStyle, setRecipeStyle] = useState(initialValues.recipeStyle);
	const [recipePreparationTime, setRecipePreparationTime] = useState(initialValues.recipePreparationTime);
	const [recipeCookTime, setRecipeCookTime] = useState(initialValues.recipeCookTime);

	return (
		<View style={styles.container}>
			<Input
				label="Recipe Name"
				value={recipeName}
				onChangeText={(text) => setRecipeName(text)}
			/>
			<Input
				label="Recipe Style"
				value={recipeStyle}
				onChangeText={(text) => setRecipeStyle(text)}
			/>
			<Input
				label="Preparation Time (minutes)"
				value={recipePreparationTime}
				onChangeText={(text) => setRecipePreparationTime(text)}
			/>
			<Input
				label="Cook Time (minutes)"
				value={recipeCookTime}
				onChangeText={(text) => setRecipeCookTime(text)}
			/>
			<Button
				title="Save Recipe"
				buttonStyle={styles.button}
				onPress={() => onSubmit(recipeName, recipeStyle, recipePreparationTime, recipeCookTime)}
			/>
		</View>
	);
};

RecipeCreateForm.defaultProps = {
	initialValues: {
		recipeName: "",
		recipeStyle: "",
		recipePreparationTime: null,
		recipeCookTime: null,
		ingredients: []
	}
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10
	},
	button: {
		backgroundColor: "#F49301"
	}
});

export default RecipeCreateForm;