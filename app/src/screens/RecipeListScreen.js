import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, FlatList, Image, View } from "react-native";
import { Text } from "react-native-elements";
import { Context as RecipeContext } from "../context/RecipeContext";
import { Context as GroceryContext } from "../context/GroceryContext";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import SwipeableRow from "../components/SwipeableRow";
import { RectButton } from "react-native-gesture-handler";

const RecipeListScreen = ({ navigation }) => {
	const { state: { recipes }, fetchRecipes, deleteRecipe } = useContext(RecipeContext);
	const { addRecipeIngredients } = useContext(GroceryContext);

	useEffect(() => {
		fetchRecipes();

		const listener = navigation.addListener("didFocus", () => {
			fetchRecipes();
		});

		return () => {
			listener.remove();
		};
	}, []);

	return (
		<SafeAreaView
			style={styles.container}
		>
			<FlatList
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				data={recipes}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<SwipeableRow
							leftButtonColor={"#497afc"}
							leftButtonIcon={"calendar"}
							leftButtonAction={() => addRecipeIngredients(item)}
							rightButtonColor={"#ee3d3d"}
							rightButtonIcon={"trash"}
							rightButtonAction={() => deleteRecipe(item._id)}
						>
							<RectButton
								style={styles.card}
								onPress={() => navigation.navigate("RecipeDetail", { id: item._id })}
							>
								<View style={{ height: 100, flexDirection: "row" }}>
									{item.image ?
										<View style={{ flex: 1 }}>
											<Image
												style={{ flex: 1 }}
												source={{ uri: item.image }}
											/>
										</View> :
										<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
											<FontAwesome style={styles.missingImage} name="image" size={60}/>
										</View>
									}
									<View style={{ flex: 3, marginLeft: 10, justifyContent: "center" }}>
										<Text h4>{item.name}</Text>
										<Text>{item.preparationTime} min.</Text>
										<Text>{item.cookTime} min.</Text>
									</View>
								</View>
							</RectButton>
						</SwipeableRow>
					);
				}}
			/>
		</SafeAreaView>
	);
};

RecipeListScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity onPress={() => navigation.navigate("RecipeCreate")}>
				<FontAwesome style={styles.icon} name="plus" size={25}/>
			</TouchableOpacity>
		),
		title: "Recipes",
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
		flex: 1
	},
	card: {
		flex: 1,
		height: 100,
		backgroundColor: "white",
	},
	missingImage: {
		color: "lightgrey"
	},
	icon: {
		color: "white",
		fontSize: 24,
		marginRight: 10
	}
});

export default RecipeListScreen;