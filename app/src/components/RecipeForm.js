import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { Context as RecipeContext } from "../context/RecipeContext";

const RecipeForm = ({
	                    recipeName,
	                    recipeImage,
	                    recipeStyle,
	                    recipePreparationTime,
	                    recipeCookTime,
	                    setRecipeName,
	                    setRecipeImage,
	                    setRecipeStyle,
	                    setRecipePreparationTime,
	                    setRecipeCookTime
                    }) => {
	const { state: { images }, fetchRecipeImages, cleanRecipeImages } = useContext(RecipeContext)
	const [imageSelect, setImageSelect] = useState(recipeImage)

	useEffect(() => {
		if (recipeName.length >= 3) {
			fetchRecipeImages(recipeName)
		} else {
			cleanRecipeImages()
		}
	}, [recipeName]);

	return (
		<View>
			<View style={styles.container}>
				<Input
					label="Recipe Name"
					value={recipeName}
					onChangeText={(text) => setRecipeName(text)}
				/>
				<View style={{ height: 150, alignItems: "center" }}>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={images}
						keyExtractor={item => item.url}
						renderItem={({ item }) => {
							return (
								<View style={{ margin: 5 }}>
									<TouchableOpacity
										style={imageSelect === item.url ? styles.buttonSelect : styles.buttonNormal}
										onPress={() => {
											setRecipeImage(item.url);
											setImageSelect(item.url);
										}}
									>
										<Image
											style={styles.image}
											source={{ uri: item.url }}
										/>
									</TouchableOpacity>
								</View>
							);
						}}
					/>
				</View>
				<Input
					label="Recipe Style"
					value={recipeStyle}
					onChangeText={(text) => setRecipeStyle(text)}
				/>
				<Input
					label="Preparation Time (minutes)"
					value={recipePreparationTime}
					onChangeText={(text) => setRecipePreparationTime(text)}
				/>
				<Input
					label="Cook Time (minutes)"
					value={recipeCookTime}
					onChangeText={(text) => setRecipeCookTime(text)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonSelect: {
		borderStyle: "solid",
		borderColor: "#F49301",
		borderWidth: 1
	},
	buttonNormal: {
		borderStyle: "solid",
		borderColor: "transparent",
		borderWidth: 1
	},
	image: {
		width: 100,
		height: 100
	},
	card: {
		flex: 1,
		height: 80,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: "center",
		backgroundColor: "white",
	},
});

export default RecipeForm;