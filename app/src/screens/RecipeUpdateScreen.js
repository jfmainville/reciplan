import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import RecipeForm from "../components/RecipeForm";
import { Context as RecipeContext } from "../context/RecipeContext";
import IngredientForm from "../components/IngredientForm";
import { Text, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import ObjectID from "bson-objectid";

const RecipeUpdateScreen = ({ navigation }) => {
	const { state: recipes, updateRecipe } = useContext(RecipeContext);
	const recipeId = navigation.getParam("id");
	const recipe = recipes.filter(recipe => recipe._id === recipeId)[0];

	const [recipeName, setRecipeName] = useState(recipe.name);
	const [recipeStyle, setRecipeStyle] = useState(recipe.style);
	const [recipePreparationTime, setRecipePreparationTime] = useState((recipe.preparationTime).toString());
	const [recipeCookTime, setRecipeCookTime] = useState((recipe.cookTime).toString());
	const [ingredientName, setIngredientName] = useState("");
	const [ingredientQuantity, setIngredientQuantity] = useState("");
	const [ingredientUnit, setIngredientUnit] = useState("");
	const [ingredients, setIngredients] = useState(recipe.ingredients);

	const onAddIngredient = (ingredientQuantity, ingredientUnit, ingredientName) => {
		setIngredients(ingredients => [...ingredients, {
			_id: ObjectID(),
			name: ingredientName,
			quantity: parseInt(ingredientQuantity),
			weightUnit: ingredientUnit,
		}]);
		setIngredientQuantity("");
		setIngredientUnit("");
		setIngredientName("");
	};

	const onDeleteIngredient = (id) => {
		setIngredients(ingredients.filter(item => item._id !== id));
	};

	return (
		<FlatList
			ListHeaderComponent={
				<View>
					<Text h2>Recipe</Text>
					<Spacer/>
					<RecipeForm
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
					<IngredientForm
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
					onPress={() => {
						updateRecipe(recipeId, recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, () => navigation.navigate("RecipeDetail", { id: recipeId }));
					}}
				/>
			}
			data={ingredients}
			keyExtractor={(item) => item._id}
			renderItem={({ item }) => {
				return (
					<View style={styles.card}>
						<Text>{item.name}</Text>
						<Button
							title="X"
							onPress={() => onDeleteIngredient(item._id)}/>
					</View>
				);
			}}
		/>
	);
};

RecipeUpdateScreen.navigationOptions = {
	title: "Update Recipe",
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

export default RecipeUpdateScreen;