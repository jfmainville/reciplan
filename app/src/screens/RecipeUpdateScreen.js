import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import RecipeMultiStepsForm from "../components/RecipeMultiStepsForm";
import { FontAwesome } from "@expo/vector-icons";

const RecipeUpdateScreen = ({ navigation }) => {
	const { state: { recipes }, updateRecipe } = useContext(RecipeContext);
	const recipeId = navigation.getParam("id");
	const recipe = recipes.find(recipe => recipe._id === recipeId);

	useEffect(() => {
		navigation.setParams({
			updateRecipe
		});
	}, []);

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

RecipeUpdateScreen.navigationOptions = ({ navigation }) => {
	const updateRecipe = navigation.getParam("updateRecipe")
	const recipeId = navigation.getParam("id")
	const recipeName = navigation.getParam("recipeName")
	const recipeImage = navigation.getParam("recipeImage")
	const recipeStyle = navigation.getParam("recipeStyle")
	const recipePreparationTime = navigation.getParam("recipePreparationTime")
	const recipeCookTime = navigation.getParam("recipeCookTime")
	const ingredients = navigation.getParam("ingredients")
	return {
		headerRight: () => (
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					onPress={() => updateRecipe(recipeId, recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeDetail", { id: recipeId }))}>
					<FontAwesome style={styles.headerIcons} name="check" size={25}/>
				</TouchableOpacity>
			</View>
		),
		title: "Update Recipe",
		headerStyle: {
			backgroundColor: "#4854C7",
		},
		headerTintColor: "#fff",
		headerTitleStyle: {
			fontWeight: "bold",
		}
	}
};

const styles = StyleSheet.create({
	headerIcons: {
		marginRight: 10,
		color: "#fff"
	}
});

export default RecipeUpdateScreen;