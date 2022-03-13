import React, { useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, FlatList, Image, View } from "react-native";
import { Text } from "react-native-elements";
import { Context as RecipeContext } from "../context/RecipeContext";
import { Context as GroceryContext } from "../context/GroceryContext";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from 'react-native-paper';
import SwipeableRow from "../components/SwipeableRow";
import { RectButton } from "react-native-gesture-handler";

const RecipeListScreen = ({ navigation }) => {
	const { headerButtonColor } = useTheme()
	const { state: { recipes }, fetchRecipes, deleteRecipe } = useContext(RecipeContext);
	const { addRecipeIngredients } = useContext(GroceryContext);

	useEffect(() => {
		fetchRecipes();
	}, [recipes]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => navigation.navigate("RecipeCreate")}>
					<FontAwesome name="plus" size={25} style={{ color: headerButtonColor }}/>
				</TouchableOpacity>
			),
		})
	}, [navigation])

	return (
		<View
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
								<View style={{ flexDirection: "row" }}>
									{item.image ?
										<View style={{ flex: 1 }}>
											<Image
												style={{ height: 100, width: 100 }}
												source={{ uri: item.image }}
											/>
										</View> :
										<View style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											height: 100
										}}>
											<FontAwesome style={styles.missingImage} name="image" size={80}/>
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	card: {
		flex: 1,
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