import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import GroceryForm from "../components/GroceryForm";
import { Context as GroceryContext } from "../context/GroceryContext";
import { FontAwesome } from "@expo/vector-icons";

const GroceryCreateScreen = ({ navigation }) => {
	const { createGrocery } = useContext(GroceryContext);

	useEffect(() => {
		navigation.setParams({
			createGrocery
		});
	}, []);

	return (
		<GroceryForm
			navigation={navigation}
		/>
	);
};

const styles = StyleSheet.create({});

export default GroceryCreateScreen;