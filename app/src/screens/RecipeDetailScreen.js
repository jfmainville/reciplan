import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { ButtonGroup, Text } from "react-native-elements";
import { Context as RecipeContext } from "../context/RecipeContext";
import { FontAwesome, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const RecipeDetailScreen = ({ navigation }) => {
	const { state: { recipes }, fetchRecipes, cleanRecipeImages } = useContext(RecipeContext);
	const [menuSection, setMenuSection] = useState(0);
	const id = navigation.getParam("id");
	const recipe = recipes.find(recipe => recipe._id === id);

	useEffect(() => {
		fetchRecipes();

		const listener = navigation.addListener("didFocus", () => {
			fetchRecipes();
			cleanRecipeImages();
		});

		return () => {
			listener.remove();
		};
	}, []);

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
					<View style={styles.recipeButtonGroupContainer}>
						<ButtonGroup
							onPress={setMenuSection}
							selectedIndex={menuSection}
							// Temporarily disable the directions section
							disabled={[1]}
							selectedButtonStyle={{ backgroundColor: "#FAF7F7" }}
							buttons={[{ element: () => <Text>Ingredients</Text> }, {
								element: () => <Text>Directions</Text>
							}]}
							containerStyle={{ height: 40 }}/>
					</View>
				</View>
			}
			data={menuSection === 0 ? recipe.ingredients : [
				{
					_id: 1,
					order: 1,
					text: "Step 1"
				},
				{
					_id: 2,
					order: 2,
					text: "Step 2"
				}
			]}
			keyExtractor={item => item._id}
			renderItem={({ item }) => {
				if (menuSection === 0) {
					return (
						<View style={styles.itemsCard}>
							<Text
								style={styles.ingredientsList}>{`\u2022 ${item.quantity} ${item.weightUnit} ${item.name}`}</Text>
						</View>
					);
				} else {
					return (
						<View style={styles.itemsCard}>
							<Text style={styles.directionsListIcon}>{item.order}.</Text>
							<Text style={styles.directionsListItem}>{item.text}</Text>
						</View>
					);
				}
			}}
		/>
	);
};

RecipeDetailScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					onPress={() => navigation.navigate("RecipeUpdate", { id: navigation.getParam("id") })}>
					<MaterialCommunityIcons style={styles.headerIcons} name="pencil" size={25}/>
				</TouchableOpacity>
			</View>
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