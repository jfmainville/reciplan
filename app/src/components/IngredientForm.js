import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import ObjectID from "bson-objectid";
import { Context as IngredientContext } from "../context/IngredientContext";
import SwipeableRow from "./SwipeableRow";
import DropDownPicker from "react-native-dropdown-picker";

const IngredientForm = ({ ingredients, setIngredients }) => {
	const { state: { foundIngredient }, searchIngredient, resetIngredient } = useContext(IngredientContext);
	const [ingredient, setIngredient] = useState("");
	const [ingredientName, setIngredientName] = useState("");
	const [ingredientQuantity, setIngredientQuantity] = useState("");

	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" }
	]);

	useEffect(() => {
		searchIngredient(ingredientName);
	}, [ingredientName]);

	const onSearchIngredient = (ingredient) => {
		if (ingredient) {
			setIngredientName(ingredient);
		}
	};
	const onAddIngredient = (ingredientQuantity, ingredientName) => {
		if (ingredientQuantity && ingredientName) {
			const ingredientUnit = ingredientQuantity.split(/([0-9]+)/)[2].trim();

			if (foundIngredient.length > 0) {
				setIngredients(ingredients => [...ingredients, {
					_id: ObjectID(),
					name: foundIngredient[0].name,
					quantity: parseInt(ingredientQuantity),
					weightUnit: ingredientUnit
				}]);
				setIngredientQuantity("");
				setIngredientName("");
				resetIngredient();
			}
		}
	};

	const onDeleteIngredient = (id) => {
		setIngredients(ingredients.filter(item => item._id !== id));
	};

	return (
		<FlatList
			ListHeaderComponent={
				<View>
					<View style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
					}}>
						<View style={{ flex: 2 }}>
							<Input
								inputContainerStyle={{ flex: 1 }}
								label="Quantity"
								value={ingredientQuantity}
								onChangeText={(text) => setIngredientQuantity(text)}
							/>
						</View>
						<View style={{
							flex: 3,
							position: "relative",
							zIndex: 1
						}}>
							<DropDownPicker
								searchable={true}
								onChangeSearchText={(text) => onSearchIngredient(text)}
								open={open}
								value={ingredientName}
								items={items}
								setOpen={setOpen}
								setValue={setIngredientName}
								setItems={setItems}
								listMode="SCROLLVIEW"
								zIndex={1000}
							/>
						</View>
						<View style={{
							flex: 1, position: "relative",
							zIndex: 10,
						}}>
							<Button
								title="+"
								onPress={() => onAddIngredient(ingredientQuantity, ingredientName)}
							/>
						</View>
					</View>

				</View>
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