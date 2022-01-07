import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Input, ListItem, Text } from "react-native-elements";
import Spacer from "./Spacer";
import ObjectID from "bson-objectid";
import { Context as IngredientContext } from "../context/IngredientContext";
import SwipeableRow from "./SwipeableRow";

const RecipeForm = ({ initialValues, onSubmit }) => {
	const { state: { foundIngredient }, searchIngredient, resetIngredient } = useContext(IngredientContext);
	const [recipeName, setRecipeName] = useState(initialValues.name);
	const [recipeStyle, setRecipeStyle] = useState(initialValues.style);
	const [recipePreparationTime, setRecipePreparationTime] = useState((initialValues.preparationTime).toString());
	const [recipeCookTime, setRecipeCookTime] = useState((initialValues.cookTime).toString());
	const [ingredientName, setIngredientName] = useState("");
	const [ingredientQuantity, setIngredientQuantity] = useState("");
	const [ingredients, setIngredients] = useState(initialValues.ingredients);

	useEffect(() => {
		searchIngredient(ingredientName);
	}, [ingredientName]);

	const onAddIngredient = (ingredientQuantity, ingredientName) => {
		if (ingredientQuantity && ingredientName) {
			const ingredientUnit = ingredientQuantity.split(/([0-9]+)/)[2].trim();

			if (foundIngredient.length > 0) {
				setIngredients(ingredients => [...ingredients, {
					_id: ObjectID(),
					name: foundIngredient[0].name,
					quantity: parseInt(ingredientQuantity),
					weightUnit: ingredientUnit
				}]);
				setIngredientQuantity("");
				setIngredientName("");
				resetIngredient();
			}
		}
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
					<View style={styles.container}>
						<Input
							label="Recipe Name"
							value={recipeName}
							onChangeText={(text) => setRecipeName(text)}
						/>
						<Input
							label="Recipe Style"
							value={recipeStyle}
							onChangeText={(text) => setRecipeStyle(text)}
						/>
						<Input
							label="Preparation Time (minutes)"
							value={recipePreparationTime}
							onChangeText={(text) => setRecipePreparationTime(text)}
						/>
						<Input
							label="Cook Time (minutes)"
							value={recipeCookTime}
							onChangeText={(text) => setRecipeCookTime(text)}
						/>
					</View>
					<Text h2>Ingredients</Text>
					<Spacer/>
					<View>
						<Input
							label="Quantity"
							value={ingredientQuantity}
							onChangeText={(text) => setIngredientQuantity(text)}
						/>
						<Input
							label="Ingredient Name"
							value={ingredientName}
							onChangeText={(text) => setIngredientName(text)}
						/>
						<Button
							title="Add Ingredient"
							onPress={() => onAddIngredient(ingredientQuantity, ingredientName)}
						/>
						<Spacer/>
					</View>
				</View>
			}
			ListFooterComponent={
				<Button
					title="Save Recipe"
					buttonStyle={styles.save}
					onPress={() => onSubmit(recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients)}
				/>
			}
			data={ingredients}
			keyExtractor={item => item._id}
			renderItem={({ item }) => {
				return (
					<SwipeableRow
						rightButtonColor={"#ee3d3d"}
						rightButtonIcon={"trash"}
						rightButtonAction={() => onDeleteIngredient(item._id)}
					>
						<View style={styles.card}>

							<Text style={{ fontSize: 20 }}>{item.quantity}{item.weightUnit} {item.name}</Text>
						</View>
					</SwipeableRow>

				);
			}}
		/>
	);
};

RecipeForm.defaultProps = {
	initialValues: {
		name: "",
		style: "",
		preparationTime: "",
		cookTime: "",
		ingredients: []
	}
};

const styles = StyleSheet.create({
	save: {
		marginTop: 10,
		backgroundColor: "#F49301",
	},
	card: {
		flex: 1,
		height: 80,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: "center",
		backgroundColor: "white",
	},
});

export default RecipeForm;