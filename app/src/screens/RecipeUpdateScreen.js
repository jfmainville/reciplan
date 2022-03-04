import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import RecipeMultiStepsForm from "../components/RecipeMultiStepsForm";

const RecipeUpdateScreen = ({ navigation }) => {
	const { state: recipes, updateRecipe } = useContext(RecipeContext);
	const recipeId = navigation.getParam("id");
	const recipe = recipes.find(recipe => recipe._id === recipeId);

	return (
		<RecipeMultiStepsForm
			initialValues={{
				_id: recipeId,
				name: recipe.name,
				style: recipe.style,
				preparationTime: recipe.preparationTime,
				cookTime: recipe.cookTime,
				ingredients: recipe.ingredients
			}}
		/>
	);
};

RecipeUpdateScreen.navigationOptions = {
	title: "Update Recipe",
	headerStyle: {
		backgroundColor: "#4854C7",
	},
	headerTintColor: "#fff",
	headerTitleStyle: {
		fontWeight: "bold",
	}
};

const styles = StyleSheet.create({});

export default RecipeUpdateScreen;