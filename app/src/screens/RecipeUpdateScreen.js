import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import RecipeMultiStepsForm from "../components/RecipeMultiStepsForm";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const RecipeUpdateScreen = ({ navigation, route }) => {
	const { headerButtonColor } = useTheme()
	const { state: { recipe }, updateRecipeDetails } = useContext(RecipeContext);
	const recipeId = route.params.id;

	useLayoutEffect(() => {
		const recipeName = route.params.recipeName
		const recipeImage = route.params.recipeImage
		const recipeStyle = route.params.recipeStyle
		const recipePreparationTime = route.params.recipePreparationTime
		const recipeCookTime = route.params.recipeCookTime
		const ingredients = route.params.ingredients

		navigation.setOptions({
			headerRight: () => (
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						onPress={() => updateRecipeDetails(recipeId, recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeDetail", { id: recipeId }))}>
						<FontAwesome name="check" size={25} style={{ color: headerButtonColor }}/>
					</TouchableOpacity>
				</View>
			)
		})
	})

	return (
		<RecipeMultiStepsForm
			navigation={navigation}
			initialValues={{
				_id: recipeId,
				name: recipe.name,
				image: recipe.image,
				style: recipe.style,
				preparationTime: recipe.preparationTime,
				cookTime: recipe.cookTime,
				ingredients: recipe.ingredients
			}}
		/>
	);
};

const styles = StyleSheet.create({
	headerIcons: {
		marginRight: 10,
		color: "#fff"
	}
});

export default RecipeUpdateScreen;