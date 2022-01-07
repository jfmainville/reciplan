import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import RecipeMultiStepsForm from "../components/RecipeMultiStepsForm";

const RecipeCreateScreen = ({ navigation }) => {
	const { createRecipe } = useContext(RecipeContext);

	return (
		<RecipeMultiStepsForm
			onSubmit={(recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients) => createRecipe(recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeList"))}
		/>
	);
};

RecipeCreateScreen.navigationOptions = {
	title: "Create Recipe",
	headerStyle: {
		backgroundColor: "#4854C7",
	},
	headerTintColor: "#fff",
	headerTitleStyle: {
		fontWeight: "bold",
	}
};

const styles = StyleSheet.create({});

export default RecipeCreateScreen;