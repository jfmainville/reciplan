import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import RecipeCreateScreen from "./src/screens/RecipeCreateScreen";
import RecipeListScreen from "./src/screens/RecipeListScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import GroceryScreen from "./src/screens/GroceryScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { Provider as RecipeProvider } from "./src/context/RecipeContext";
import { setNavigator } from "./src/navigationRef";
// import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const recipeListFlow = createStackNavigator({
	RecipeList: RecipeListScreen,
	RecipeDetail: RecipeDetailScreen
});

recipeListFlow.navigationOptions = {
	title: "Recipes",
	tabBarIcon: <FontAwesome5 name="book" size={20}/>
};

const switchNavigator = createSwitchNavigator({
		// ResolveAuth: ResolveAuthScreen,
		// loginFlow: createStackNavigator({
		// 	Signup: SignupScreen,
		// 	Signin: SigninScreen
		// }),
		mainFlow: createBottomTabNavigator({
			recipeListFlow,
			Grocery: GroceryScreen,
			Account: AccountScreen
		})
	})
;

const App = createAppContainer(switchNavigator);

export default () => {
	return (
		<SafeAreaProvider>
			<RecipeProvider>
				<App ref={(navigator) => setNavigator(navigator)}/>
			</RecipeProvider>
		</SafeAreaProvider>
	);
}