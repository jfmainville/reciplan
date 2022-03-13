import React, { useContext, useEffect, useLayoutEffect } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Context as GroceryContext } from "../context/GroceryContext";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from 'react-native-paper';
import SwipeableRow from "../components/SwipeableRow";

const GroceryListScreen = ({ navigation }) => {
	const { headerButtonColor } = useTheme()
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
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => navigation.navigate("GroceryCreate")}>
					<FontAwesome name="plus" size={25} style={{ color: headerButtonColor }}/>
				</TouchableOpacity>
			)
		})
	}, [navigation])

	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			data={ingredients}
			keyExtractor={(item) => item._id}
			renderItem={({ item }) => {
				return (
					<SwipeableRow
						leftButtonColor={"#2f9d25"}
						leftButtonIcon={"check"}
						leftButtonAction={() => checkGrocery(item.name, !item.checked)}
						rightButtonColor={"#ee3d3d"}
						rightButtonIcon={"trash"}
						rightButtonAction={() => deleteGrocery(item.name)}
					>
						<View style={styles.card}>
							{item.checked ?
								<Text style={styles.checkedItems}>{item.quantity}{item.weightUnit} {item.name}</Text>
								: <Text
									style={styles.notCheckedItems}>{item.quantity}{item.weightUnit} {item.name}</Text>}
						</View>
					</SwipeableRow>
				);
			}}
		/>
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
	card: {
		flex: 1,
		height: 80,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: "center",
		backgroundColor: "white",
	},
	checkedItems: {
		fontSize: 20,
		color: "lightgray",
		textDecorationLine: "line-through",
		textDecorationStyle: "solid"
	},
	notCheckedItems: {
		fontSize: 20,
		color: "black"
	},
	icon: {
		color: "white",
		fontSize: 24,
		marginRight: 10
	}
});

export default GroceryListScreen;