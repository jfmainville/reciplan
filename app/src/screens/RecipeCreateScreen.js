import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import RecipeMultiStepsForm from "../components/RecipeMultiStepsForm";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const RecipeCreateScreen = ({ navigation, route }) => {
	const { headerButtonColor, headerButtonColorDisabled } = useTheme()
	const { createRecipe } = useContext(RecipeContext);

	useLayoutEffect(() => {
		const recipeName = route.params ? route.params.recipeName : ""
		const recipeImage = route.params ? route.params.recipeImage : ""
		const recipeStyle = route.params ? route.params.recipeStyle : ""
		const recipePreparationTime = route.params ? route.params.recipePreparationTime : 0
		const recipeCookTime = route.params ? route.params.recipeCookTime : 0
		const ingredients = route.params ? route.params.ingredients : []

		navigation.setOptions({
			headerRight: () => (
				<View style={{ flexDirection: "row" }}>
					{recipeName && ingredients.length ?
						<TouchableOpacity
							onPress={() => createRecipe(recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeList"))}
						>
							<FontAwesome name="check" size={25} style={{ color: headerButtonColor }}/>
						</TouchableOpacity>
						:
						<TouchableOpacity
							disabled={true}
						>
							<FontAwesome name="check" size={25} style={{ color: headerButtonColorDisabled }}/>
						</TouchableOpacity>
					}
				</View>
			)
		})
	}, [navigation, route])

	return (
		<RecipeMultiStepsForm
			navigation={navigation}
		/>
	);
};

const styles = StyleSheet.create({});

export default RecipeCreateScreen;