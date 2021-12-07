import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import RecipeListScreen from "./RecipeListScreen";

const RecipeDetailScreen = ({ navigation }) => {
	const { state } = useContext(RecipeContext);
	const id = navigation.getParam("id");

	return (
		<View>
			<Text>Recipe Detail Screen -> {id}</Text>
		</View>
	);
};

RecipeDetailScreen.navigationOptions = {
	title: "Recipe Details",
	headerStyle: {
		backgroundColor: "#4854C7",
	},
	headerTintColor: "#fff",
	headerTitleStyle: {
		fontWeight: "bold",
	}
};

export default RecipeDetailScreen;