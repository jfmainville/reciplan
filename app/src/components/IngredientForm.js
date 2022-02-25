import React, { useState, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import ObjectID from "bson-objectid";
import { Context as IngredientContext } from "../context/IngredientContext";
import SwipeableRow from "./SwipeableRow";

const IngredientForm = ({ ingredients, setIngredients }) => {
	const { createIngredient, resetIngredient } = useContext(IngredientContext);
	const [ingredientName, setIngredientName] = useState("");
	const [ingredientQuantity, setIngredientQuantity] = useState("");

	const onAddIngredient = (ingredientQuantity, ingredientName) => {
		if (ingredientQuantity && ingredientName) {
			createIngredient(ingredientName)
			const ingredientUnit = ingredientQuantity.split(/([0-9]+)/)[2].trim();
			setIngredients(ingredients => [...ingredients, {
				_id: ObjectID(),
				name: ingredientName,
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
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
					}}>
						<View style={{ flex: 2 }}>
							<Input
								label="Quantity"
								value={ingredientQuantity}
								onChangeText={(text) => setIngredientQuantity(text)}
							/>
						</View>
						<View style={{
							flex: 3
						}}>
							<Input
								label="Ingredient"
								value={ingredientName}
								onChangeText={(text) => setIngredientName(text)}
							/>
						</View>
						<View style={{
							flex: 1,
						}}>
							<Button
								title="+"
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