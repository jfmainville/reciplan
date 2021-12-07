import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import RecipeCreateScreen from "./src/screens/RecipeCreateScreen";
import RecipeListScreen from "./src/screens/RecipeListScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import GroceryScreen from "./src/screens/GroceryScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as RecipeProvider } from "./src/context/RecipeContext";
import { setNavigator } from "./src/navigationRef";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";

const recipeListFlow = createStackNavigator({
	RecipeList: RecipeListScreen,
	RecipeDetail: RecipeDetailScreen,
	RecipeCreate: RecipeCreateScreen
});

recipeListFlow.navigationOptions = {
	title: "Recipes",
	tabBarIcon: <FontAwesome5 name="book" size={20}/>
};

const switchNavigator = createSwitchNavigator({
		ResolveAuth: ResolveAuthScreen,
		loginFlow: createStackNavigator({
			Signup: SignupScreen,
			Signin: SigninScreen
		}),
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
			<AuthProvider>
				<RecipeProvider>
					<StatusBar barStyle="light-content" backgroundColor="#4854C7"/>
					<App ref={(navigator) => setNavigator(navigator)}/>
				</RecipeProvider>
			</AuthProvider>
		</SafeAreaProvider>
	);
}