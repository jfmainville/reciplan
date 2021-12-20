import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import RecipeCreateForm from "../components/RecipeCreateForm";
import { Context as RecipeContext } from "../context/RecipeContext";
import IngredientCreateForm from "../components/IngredientCreateForm";
import { Text, Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const RecipeCreateScreen = ({ navigation }) => {
	const { createRecipe } = useContext(RecipeContext);
	const [recipeName, setRecipeName] = useState("");
	const [recipeStyle, setRecipeStyle] = useState("");
	const [recipePreparationTime, setRecipePreparationTime] = useState("");
	const [recipeCookTime, setRecipeCookTime] = useState("");
	const [ingredientName, setIngredientName] = useState("");
	const [ingredientQuantity, setIngredientQuantity] = useState("");
	const [ingredientUnit, setIngredientUnit] = useState("");

	const [ingredients, setIngredients] = useState([]);

	const onAddIngredient = (ingredientQuantity, ingredientUnit, ingredientName) => {
		setIngredients(ingredients => [...ingredients, {
			id: ingredients.length + 1,
			ingredientQuantity,
			ingredientUnit,
			ingredientName
		}]);
		setIngredientQuantity("");
		setIngredientUnit("");
		setIngredientName("");
	};

	const onDeleteIngredient = (id) => {
		setIngredients(ingredients.filter(item => item.id !== id));
	};

	return (
		<FlatList
			ListHeaderComponent={
				<View>
					<Text h2>Recipe</Text>
					<Spacer/>
					<RecipeCreateForm
						recipeName={recipeName}
						recipeStyle={recipeStyle}
						recipePreparationTime={recipePreparationTime}
						recipeCookTime={recipeCookTime}
						setRecipeName={setRecipeName}
						setRecipeStyle={setRecipeStyle}
						setRecipePreparationTime={setRecipePreparationTime}
						setRecipeCookTime={setRecipeCookTime}
					/>
					<Text h2>Ingredients</Text>
					<Spacer/>
					<IngredientCreateForm
						ingredients={ingredients}
						ingredientName={ingredientName}
						ingredientQuantity={ingredientQuantity}
						ingredientUnit={ingredientUnit}
						setIngredientQuantity={setIngredientQuantity}
						setIngredientUnit={setIngredientUnit}
						setIngredientName={setIngredientName}
						onAddIngredient={onAddIngredient}
					/>
				</View>
			}
			ListFooterComponent={
				<Button
					title="Save Recipe"
					buttonStyle={styles.save}
					onPress={(recipeName, recipeStyle, recipePreparationTime, recipeCookTime) => createRecipe(recipeName, recipeStyle, recipePreparationTime, recipeCookTime, () => navigation.navigate("RecipeList"))}
				/>
			}
			data={ingredients}
			renderItem={({ item }) => {
				return (
					<View style={styles.card}>
						<Text>{item.ingredientName}</Text>
						<Button
							title="X"
							onPress={() => onDeleteIngredient(item.id)}/>
					</View>
				);
			}}
		/>
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

const styles = StyleSheet.create({
	save: {
		marginTop: 10,
		backgroundColor: "#F49301",
	},
	card: {
		flexDirection: "row",
		margin: 5,
		alignItems: "center"
	}
});

export default RecipeCreateScreen;