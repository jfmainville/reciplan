import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import RecipeForm from "../components/RecipeForm";
import { Context as RecipeContext } from "../context/RecipeContext";

const RecipeUpdateScreen = ({ navigation }) => {
	const { state: recipes, updateRecipe } = useContext(RecipeContext);
	const recipeId = navigation.getParam("id");
	const recipe = recipes.find(recipe => recipe._id === recipeId);

	return (
		<RecipeForm
			initialValues={{
				_id: recipeId,
				name: recipe.name,
				style: recipe.style,
				preparationTime: recipe.preparationTime,
				cookTime: recipe.cookTime,
				ingredients: recipe.ingredients
			}}
			onSubmit={(recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients) => updateRecipe(recipeId, recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeDetail", { id: recipeId }))}
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