import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import RecipeCreateForm from "../components/RecipeCreateForm";
import { Context as RecipeContext } from "../context/RecipeContext";

const RecipeCreateScreen = ({ navigation }) => {
	const { createRecipe } = useContext(RecipeContext);

	return (
		<View>
			<RecipeCreateForm
				onSubmit={(recipeName, recipeStyle, recipePreparationTime, recipeCookTime) => {
					createRecipe(recipeName, recipeStyle, recipePreparationTime, recipeCookTime, () => navigation.navigate("RecipeList"));
				}}
			/>
		</View>
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