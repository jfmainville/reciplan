import React, { useState, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import ObjectID from "bson-objectid";
import { Context as IngredientContext } from "../context/IngredientContext";
import SwipeableRow from "./SwipeableRow";

const IngredientForm = ({ ingredients, setIngredients }) => {
	const { createIngredient, resetIngredient } = useContext(IngredientContext);
	const [ingredientName, setIngredientName] = useState("");
	const [ingredientQuantity, setIngredientQuantity] = useState("");

	const onAddIngredient = (ingredientQuantity, ingredientName) => {
		if (ingredientQuantity && ingredientName) {
			createIngredient(ingredientName.toLowerCase())
			const ingredientUnit = ingredientQuantity.split(/([0-9]+)/)[2].trim();
			setIngredients(ingredients => [...ingredients, {
				_id: ObjectID(),
				name: (ingredientName).toLowerCase(),
				quantity: parseInt(ingredientQuantity),
				weightUnit: ingredientUnit
			}]);

			setIngredientQuantity("");
			setIngredientName("");
			resetIngredient();
		}
	};

	const onDeleteIngredient = (id) => {
		setIngredients(ingredients.filter(item => item._id !== id));
	};

	return (
		<FlatList
			ListHeaderComponent={
				<>
					<View style={{
						margin: 5,
						flexDirection: "row",
						alignItems: "center"
					}}>
						<View style={{ flex: 2, marginRight: 5 }}>
							<TextInput
								styles={styles.textInput}
								mode="outlined"
								label="Quantity"
								value={ingredientQuantity}
								onChangeText={(text) => setIngredientQuantity(text)}
							/>
						</View>
						<View style={{
							flex: 4
						}}>
							<TextInput
								style={styles.textInput}
								mode="outlined"
								label="Ingredient"
								value={ingredientName}
								onChangeText={(text) => setIngredientName(text)}
							/>
						</View>
						<View style={{
							flex: 1
						}}>
							<Button
								style={styles.button}
								contentStyle={{ height: 50 }}
								labelStyle={{ fontSize: 25 }}
								mode="contained"
								compact
								icon="plus"
								onPress={() => onAddIngredient(ingredientQuantity, ingredientName)}
							/>
						</View>
					</View>
				</>
			}
			data={ingredients}
			keyExtractor={item => item._id}
			renderItem={({ item }) => {
				return (
					<SwipeableRow
						rightButtonColor={"#ee3d3d"}
						rightButtonIcon={"trash"}
						rightButtonAction={() => onDeleteIngredient(item._id)}
					>
						<View style={styles.card}>
							<Text style={{ fontSize: 20 }}>{item.quantity}{item.weightUnit} {item.name}</Text>
						</View>
					</SwipeableRow>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	textInput: {
		margin: 5
	},
	button: {
		margin: 5
	},
	card: {
		flex: 1,
		height: 80,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: "center",
		backgroundColor: "white"
	},
});

export default IngredientForm;