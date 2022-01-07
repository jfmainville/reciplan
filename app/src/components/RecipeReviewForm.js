import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const RecipeReviewForm = ({
	recipeName,
	recipeStyle,
	recipePreparationTime,
	recipeCookTime,
	ingredients
}) => {

	return (
		<FlatList
			ListHeaderComponent={
				<View>
					<Text>{recipeName}</Text>
					<Text>{recipeStyle}</Text>
					<Text>{recipePreparationTime}</Text>
					<Text>{recipeCookTime}</Text>
				</View>
			}
			data={ingredients}
			keyExtractor={item => item._id}
			renderItem={({ item }) => {
				return (
					<View style={styles.card}>
						<Text style={{ fontSize: 20 }}>{item.quantity}{item.weightUnit} {item.name}</Text>
					</View>
				);
			}}
		/>
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

export default RecipeReviewForm;