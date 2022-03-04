import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";

const RecipeForm = ({
	                    selectedIndex,
	                    setSelectedIndex,
	                    recipeName,
	                    recipeStyle,
	                    recipePreparationTime,
	                    recipeCookTime,
	                    setRecipeName,
	                    setRecipeStyle,
	                    setRecipePreparationTime,
	                    setRecipeCookTime
                    }) => {

	const onNextStep = (recipeName) => {
		if (recipeName)
			setSelectedIndex(selectedIndex + 1);
	};

	return (
		<View>
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
			<Button
				title="Next"
				buttonStyle={styles.save}
				onPress={() => onNextStep(recipeName, recipeStyle, recipePreparationTime, recipeCookTime)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
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