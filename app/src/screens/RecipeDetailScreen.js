import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";

const RecipeDetailScreen = ({ navigation }) => {
	const { state: recipes, fetchRecipes } = useContext(RecipeContext);
	const id = navigation.getParam("id");
	const recipe = recipes.filter(recipe => recipe._id === id)[0];

	return (
		<View>
			<NavigationEvents onWillFocus={fetchRecipes}/>
			<Text>Recipe Detail Screen -> {recipe._id} -> {recipe.style}</Text>
		</View>
	);
};

RecipeDetailScreen.navigationOptions = ({ id, navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity onPress={() => navigation.navigate("RecipeUpdate", { id: navigation.getParam("id") })}>
				<FontAwesome style={styles.icon} name="pencil" size={25}/>
			</TouchableOpacity>
		),
		title: "Recipe",
		headerStyle: {
			backgroundColor: "#4854C7",
		},
		headerTintColor: "#fff",
		headerTitleStyle: {
			fontWeight: "bold",
		},
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	card: {
		flex: 1,
		height: 80,
	},
	icon: {
		color: "white",
		fontSize: 24,
		marginRight: 10
	}
});

export default RecipeDetailScreen;