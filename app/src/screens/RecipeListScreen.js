import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Button, ListItem, Text } from "react-native-elements";
import { Context as RecipeContext } from "../context/RecipeContext";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";

const RecipeListScreen = ({ navigation }) => {
	const { state, fetchRecipes } = useContext(RecipeContext);

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
				data={state}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<ListItem.Swipeable
							leftContent={
								<Button
									title="Add"
									icon={{ name: "add", color: "white" }}
									buttonStyle={{ minHeight: "100%" }}
								/>
							}
							rightContent={
								<Button
									title="Delete"
									icon={{ name: "delete", color: "white" }}
									buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
								/>
							}
						>
							<TouchableOpacity
								style={styles.card}
								onPress={() => navigation.navigate("RecipeDetail", { id: item._id })}
							>
								<Text h4>{item.name}</Text>
								<Text>{item.preparationTime} min.</Text>
								<Text>{item.cookTime} min.</Text>
							</TouchableOpacity>
						</ListItem.Swipeable>
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
		height: 80,
	},
	icon: {
		color: "white",
		fontSize: 24,
		marginRight: 10
	}
});

export default RecipeListScreen;