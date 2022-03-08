import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
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
				<TextInput
					style={styles.textInput}
					mode="outlined"
					label="Recipe Name"
					value={recipeName}
					onChangeText={(text) => setRecipeName(text)}
				/>
				<View style={{ marginTop: 10, alignItems: "center" }}>
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
				<TextInput
					style={styles.textInput}
					mode="outlined"
					label="Recipe Style"
					value={recipeStyle}
					onChangeText={(text) => setRecipeStyle(text)}
				/>
				<TextInput
					style={styles.textInput}
					mode="outlined"
					label="Preparation Time (minutes)"
					value={recipePreparationTime}
					onChangeText={(text) => setRecipePreparationTime(text)}
				/>
				<TextInput
					style={styles.textInput}
					mode="outlined"
					label="Cook Time (minutes)"
					value={recipeCookTime}
					onChangeText={(text) => setRecipeCookTime(text)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10
	},
	textInput: {
		margin: 5
	},
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
		margin: 5,
		width: 100,
		height: 100,
	},
});

export default RecipeForm;