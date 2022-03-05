import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import RecipeForm from "../components/RecipeForm";
import IngredientForm from "../components/IngredientForm";

const RecipeMultiStepsForm = ({ navigation, initialValues }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [recipeName, setRecipeName] = useState(initialValues.name);
	const [recipeImage, setRecipeImage] = useState(initialValues.image);
	const [recipeStyle, setRecipeStyle] = useState(initialValues.style);
	const [recipePreparationTime, setRecipePreparationTime] = useState((initialValues.preparationTime).toString());
	const [recipeCookTime, setRecipeCookTime] = useState((initialValues.cookTime).toString());
	const [ingredients, setIngredients] = useState(initialValues.ingredients);

	useEffect(() => {
		navigation.setParams({
			recipeName: recipeName,
			recipeImage: recipeImage,
			recipeStyle: recipeStyle,
			recipePreparationTime: recipePreparationTime,
			recipeCookTime: recipeCookTime,
			ingredients: ingredients
		});
	}, [recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients]);

	return (
		<>
			<SegmentedControl
				values={["Recipe", "Ingredients"]}
				selectedIndex={selectedIndex}
				onChange={(event) =>
					setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
				}
			/>
			{selectedIndex === 0 ?
				<RecipeForm
					navigation={navigation}
					selectedIndex={selectedIndex}
					setSelectedIndex={setSelectedIndex}
					recipeName={recipeName}
					recipeImage={recipeImage}
					recipeStyle={recipeStyle}
					recipePreparationTime={recipePreparationTime}
					recipeCookTime={recipeCookTime}
					setRecipeName={setRecipeName}
					setRecipeImage={setRecipeImage}
					setRecipeStyle={setRecipeStyle}
					setRecipePreparationTime={setRecipePreparationTime}
					setRecipeCookTime={setRecipeCookTime}
				/>
				: selectedIndex === 1 ?
					<IngredientForm
						navigation={navigation}
						ingredients={ingredients}
						setIngredients={setIngredients}
					/>
					: null}
		</>
	);
};

RecipeMultiStepsForm.defaultProps = {
	initialValues: {
		name: "",
		style: "",
		image: "",
		preparationTime: 0,
		cookTime: 0,
		ingredients: []
	}
};

const styles = StyleSheet.create({});

export default RecipeMultiStepsForm;