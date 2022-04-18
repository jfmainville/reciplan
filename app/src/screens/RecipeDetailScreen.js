import React, { useContext, useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import { FontAwesome, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useTheme, Text } from "react-native-paper";

const RecipeDetailScreen = ({ navigation, route }) => {
	const { headerButtonColor, colors } = useTheme()
	const { state: { recipes }, fetchRecipes, cleanRecipeImages } = useContext(RecipeContext);
	const id = route.params.id;
	const recipe = recipes.find(recipe => recipe._id === id);

	useEffect(() => {
		fetchRecipes();
		cleanRecipeImages();
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => navigation.navigate("RecipeUpdate", { id: route.params.id })}>
					<MaterialCommunityIcons
						name="pencil"
						size={25}
						style={{ color: headerButtonColor }}
					/>
				</TouchableOpacity>
			)
		})
	}, [navigation])

	return (
		<FlatList
			ListHeaderComponent={
				<View style={styles.container}>
					<View style={{ height: 200, flexDirection: "row" }}>
						{recipe.image ?
							<View style={{ flex: 1 }}>
								<Image
									style={{ flex: 1 }}
									source={{ uri: recipe.image }}
								/>
							</View> :
							<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
								<FontAwesome style={styles.missingImage} name="image" size={200}/>
							</View>
						}
					</View>
					<View style={styles.recipeContainer}>
						<View>
							<Text style={styles.recipeTitle}>{recipe.name}</Text>
							<Text style={styles.recipeStyle}>{recipe.style}</Text>
						</View>
						<View style={styles.recipeTimeContainer}>
							<View style={styles.recipeTime}>
								<FontAwesome style={styles.recipeIcon} name="spoon" size={25}/>
								<Text>{recipe.preparationTime} min.</Text>
							</View>
							<View style={styles.recipeTime}>
								<FontAwesome style={styles.recipeIcon} name="clock-o" size={25}/>
								<Text>{recipe.cookTime} min.</Text>
							</View>
							<View style={styles.recipeTime}>
								<Entypo style={styles.recipeIcon} name="calculator" size={25}/>
								<Text>{recipe.ingredients.length}</Text>
							</View>
						</View>
					</View>
				</View>
			}
			data={recipe.ingredients}
			keyExtractor={item => item._id}
			renderItem={({ item }) => {
				return (
					<View style={styles.itemsCard}>
						<Text
							style={styles.ingredientsList}>{`\u2022 ${item.quantity} ${item.weightUnit} ${item.name}`}</Text>
					</View>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	recipeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20
	},
	recipeTitle: {
		fontSize: 28,
		color: "#F49301"
	},
	recipeStyle: {
		fontSize: 24,
		color: "gray"
	},
	recipeTimeContainer: {
		flexDirection: "column",
		justifyContent: "center",
		margin: 5
	},
	recipeTime: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		color: "#4854C7"
	},
	recipeButtonGroupContainer: {
		marginBottom: 10,
	},
	itemsCard: {
		flexDirection: "row",
		alignItems: "center",
		margin: 5
	},
	recipeIcon: {
		marginRight: 10,
		color: "#4854C7"
	},
	ingredientsList: {
		fontSize: 20
	},
	directionsListIcon: {
		fontSize: 20,
		marginRight: 10
	},
	directionsListItem: {
		fontSize: 20
	},
	missingImage: {
		color: "lightgrey"
	},
	headerIcons: {
		marginRight: 10,
		color: "#fff"
	}
});

export default RecipeDetailScreen;