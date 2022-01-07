import React, { useState } from "react";
import { StyleSheet } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import RecipeForm from "../components/RecipeForm";
import IngredientForm from "../components/IngredientForm";
import { Button } from "react-native-elements";
import RecipeReviewForm from "./RecipeReviewForm";

const RecipeMultiStepsForm = ({ initialValues, onSubmit }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [recipeName, setRecipeName] = useState(initialValues.name);
	const [recipeStyle, setRecipeStyle] = useState(initialValues.style);
	const [recipePreparationTime, setRecipePreparationTime] = useState((initialValues.preparationTime).toString());
	const [recipeCookTime, setRecipeCookTime] = useState((initialValues.cookTime).toString());
	const [ingredients, setIngredients] = useState(initialValues.ingredients);

	return (
		<>
			<SegmentedControl
				values={["Recipe", "Ingredients", "Review"]}
				selectedIndex={selectedIndex}
				onChange={(event) =>
					setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
				}
			/>
			{selectedIndex === 0 ?
				<RecipeForm
					selectedIndex={selectedIndex}
					setSelectedIndex={setSelectedIndex}
					recipeName={recipeName}
					recipeStyle={recipeStyle}
					recipePreparationTime={recipePreparationTime}
					recipeCookTime={recipeCookTime}
					setRecipeName={setRecipeName}
					setRecipeStyle={setRecipeStyle}
					setRecipePreparationTime={setRecipePreparationTime}
					setRecipeCookTime={setRecipeCookTime}
				/>
				: selectedIndex === 1 ?
					<IngredientForm
						ingredients={ingredients}
						setIngredients={setIngredients}
					/>
					: selectedIndex === 2 ?
						<>
							<RecipeReviewForm
								selectedIndex={selectedIndex}
								setSelectedIndex={setSelectedIndex}
								recipeName={recipeName}
								recipeStyle={recipeStyle}
								recipePreparationTime={recipePreparationTime}
								recipeCookTime={recipeCookTime}
								ingredients={ingredients}
							/>
							<Button
								title="Save Recipe"
								buttonStyle={styles.save}
								onPress={() => onSubmit(recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients)}
							/>
						</>
						: null}
		</>
	);
};

RecipeMultiStepsForm.defaultProps = {
	initialValues: {
		name: "",
		style: "",
		preparationTime: "",
		cookTime: "",
		ingredients: []
	}
};

const styles = StyleSheet.create({});

export default RecipeMultiStepsForm;