import React, { useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import GroceryForm from "../components/GroceryForm";
import { useTheme } from 'react-native-paper';
import { Context as GroceryContext } from "../context/GroceryContext";
import { FontAwesome } from "@expo/vector-icons";

const GroceryCreateScreen = ({ navigation, route }) => {
	const { headerButtonColor } = useTheme()
	const { createGrocery } = useContext(GroceryContext);

	useLayoutEffect(() => {
		const groceryQuantity = route.params ? route.params.groceryQuantity : ""
		const groceryName = route.params ? route.params.groceryName : ""

		navigation.setOptions({
			headerRight: () => (
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						onPress={() => createGrocery(groceryQuantity, (groceryName).toLowerCase(), () => navigation.navigate("GroceryList"))}>
						<FontAwesome name="check" size={25} style={{ color: headerButtonColor }}/>
					</TouchableOpacity>
				</View>
			)
		})
	})

	return (
		<GroceryForm
			navigation={navigation}
		/>
	);
};

const styles = StyleSheet.create({});

export default GroceryCreateScreen;