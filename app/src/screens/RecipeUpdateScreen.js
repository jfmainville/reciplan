import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import RecipeMultiStepsForm from "../components/RecipeMultiStepsForm";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const RecipeUpdateScreen = ({ navigation, route }) => {
	const { headerButtonColor } = useTheme()
	const { state: { recipes }, updateRecipe } = useContext(RecipeContext);
	const recipeId = route.params.id;
	const recipe = recipes.find(recipe => recipe._id === recipeId);

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
						onPress={() => updateRecipe(recipeId, recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeDetail", { id: recipeId }))}>
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