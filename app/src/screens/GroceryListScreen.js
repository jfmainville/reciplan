import React, { useContext, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Context as GroceryContext } from "../context/GroceryContext";
import { SafeAreaView } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import { Button, ListItem } from "react-native-elements";

const GroceryListScreen = ({ navigation }) => {
	const { state, fetchGroceries, deleteGrocery, checkGrocery } = useContext(GroceryContext);
	let ingredients = [];
	if (state.length > 0) {
		state.reduce((result, ingredient) => {
			if (!result[ingredient.name]) {
				result[ingredient.name] = {
					_id: ingredient._id,
					name: ingredient.name,
					weightUnit: ingredient.weightUnit,
					quantity: 0,
					checked: ingredient.checked
				};
				ingredients.push(result[ingredient.name]);
			}
			result[ingredient.name].quantity += ingredient.quantity;
			return result;
		}, {});
	}

	useEffect(() => {
		fetchGroceries();

		const listener = navigation.addListener("didFocus", () => {
			fetchGroceries();
		});

		return () => {
			listener.remove();
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				data={ingredients}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<ListItem.Swipeable
							leftContent={
								<Button
									title="Done"
									icon={{ name: "check", color: "white" }}
									buttonStyle={{ minHeight: "100%" }}
									onPress={() => checkGrocery(item.name, !item.checked)}
								/>
							}
							rightContent={
								<Button
									title="Delete"
									icon={{ name: "delete", color: "white" }}
									buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
									onPress={() => deleteGrocery(item.name)}
								/>
							}
						>
							<View style={styles.card}>
								{item.checked ?
									<Text style={{ fontSize: 20, color: "green" }}>{item.quantity}{item.weightUnit} {item.name}</Text>
									: <Text style={{ fontSize: 20, color: "red" }}>{item.quantity}{item.weightUnit} {item.name}</Text>}
							</View>
						</ListItem.Swipeable>
					);
				}}
			/>
		</SafeAreaView>
	);
};

GroceryListScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity onPress={() => navigation.navigate("GroceryCreate")}>
				<FontAwesome style={styles.icon} name="plus" size={25}/>
			</TouchableOpacity>
		),
		title: "Groceries",
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
		justifyContent: "center",
		height: 40,
	},
	icon: {
		color: "white",
		fontSize: 24,
		marginRight: 10
	}
});

export default GroceryListScreen;