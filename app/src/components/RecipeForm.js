import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const RecipeForm = ({
	recipeName,
	recipeStyle,
	recipePreparationTime,
	recipeCookTime,
	setRecipeName,
	setRecipeStyle,
	setRecipePreparationTime,
	setRecipeCookTime
}) => {
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10
	}
});

export default RecipeForm;