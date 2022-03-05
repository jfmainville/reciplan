import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import RecipeMultiStepsForm from "../components/RecipeMultiStepsForm";
import { FontAwesome } from "@expo/vector-icons";

const RecipeCreateScreen = ({ navigation }) => {
	const { createRecipe } = useContext(RecipeContext);

	useEffect(() => {
		navigation.setParams({
			createRecipe
		});
	}, []);

	return (
		<RecipeMultiStepsForm
			navigation={navigation}
		/>
	);
};

RecipeCreateScreen.navigationOptions = ({ navigation }) => {
	const createRecipe = navigation.getParam("createRecipe")
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
					onPress={() => createRecipe(recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeList"))}>
					<FontAwesome style={styles.headerIcons} name="check" size={25}/>
				</TouchableOpacity>
			</View>
		),
		title: "Create Recipe",
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

export default RecipeCreateScreen;