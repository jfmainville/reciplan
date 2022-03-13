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

		navigation.setOptions({
			headerRight: () => (
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						onPress={() => createRecipe(recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeList"))}>
						<FontAwesome name="check" size={25} style={{ color: headerButtonColor }}/>
					</TouchableOpacity>
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

const styles = StyleSheet.create({
	headerIcons: {
		marginRight: 10,
		color: "#fff"
	}
});

export default RecipeCreateScreen;