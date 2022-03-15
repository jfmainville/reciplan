import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeCreateScreen from "./src/screens/RecipeCreateScreen";
import RecipeUpdateScreen from "./src/screens/RecipeUpdateScreen";
import RecipeListScreen from "./src/screens/RecipeListScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import GroceryCreateScreen from "./src/screens/GroceryCreateScreen";
import GroceryListScreen from "./src/screens/GroceryListScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Context as AuthContext } from "./src/context/AuthContext";
import { Provider as RecipeProvider } from "./src/context/RecipeContext";
import { Provider as GroceryProvider } from "./src/context/GroceryContext";
import { Provider as IngredientProvider } from "./src/context/IngredientContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, Text } from "react-native";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";

const theme = {
	...DefaultTheme,
	roundness: 1,
	colors: {
		...DefaultTheme.colors,
		primary: "#55c748",
		accent: "#F49301"
	},
	headerTintColor: "#fff",
	headerButtonColor: "#fff",
	headerButtonColorDisabled: "lightgray",
	statusBarColor: "light-content"
};

const RecipeStack = createNativeStackNavigator();
const GroceryStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();

function RecipeStackScreens() {
	return (
		<RecipeStack.Navigator>
			<RecipeStack.Screen
				name="RecipeList"
				component={RecipeListScreen}
				options={{
					title: "Recipes",
					headerStyle: {
						backgroundColor: theme.colors.primary
					},
					headerTintColor: theme.headerTintColor,
					headerTitleStyle: {
						fontWeight: "bold"
					}
				}}
			/>
			<RecipeStack.Screen
				name="RecipeDetail"
				component={RecipeDetailScreen}
				options={{
					title: "Recipe",
					headerStyle: {
						backgroundColor: theme.colors.primary
					},
					headerTintColor: theme.headerTintColor,
					headerTitleStyle: {
						fontWeight: "bold"
					}
				}}
			/>
			<RecipeStack.Screen
				name="RecipeCreate"
				component={RecipeCreateScreen}
				options={{
					title: "Create Recipe",
					headerStyle: {
						backgroundColor: theme.colors.primary,
					},
					headerTintColor: theme.headerTintColor,
					headerTitleStyle: {
						fontWeight: "bold"
					}
				}}/>
			<RecipeStack.Screen
				name="RecipeUpdate"
				component={RecipeUpdateScreen}
				options={{
					title: "Update Recipe",
					headerStyle: {
						backgroundColor: theme.colors.primary,
					},
					headerTintColor: theme.headerTintColor,
					headerTitleStyle: {
						fontWeight: "bold"
					}
				}}
			/>
		</RecipeStack.Navigator>
	);
}

function GroceryStackScreens() {
	return (
		<GroceryStack.Navigator>
			<GroceryStack.Screen
				name="GroceryList"
				component={GroceryListScreen}
				options={{
					title: "Groceries",
					headerStyle: {
						backgroundColor: theme.colors.primary
					},
					headerTintColor: theme.headerTintColor,
					headerTitleStyle: {
						fontWeight: "bold"
					}
				}}
			/>
			<GroceryStack.Screen
				name="GroceryCreate"
				component={GroceryCreateScreen}
				options={{
					title: "Add Grocery Item",
					headerStyle: {
						backgroundColor: theme.colors.primary
					},
					headerTintColor: theme.headerTintColor,
					headerTitleStyle: {
						fontWeight: "bold"
					}
				}}
			/>
		</GroceryStack.Navigator>
	);
}

function AccountStackScreens() {
	return (
		<AccountStack.Navigator>
			<AccountStack.Screen
				name="AccountList"
				component={AccountScreen}
				options={{
					title: "Account",
					headerStyle: {
						backgroundColor: theme.colors.primary
					},
					headerTintColor: theme.headerTintColor,
					headerTitleStyle: {
						fontWeight: "bold"
					}
				}}
			/>
		</AccountStack.Navigator>
	);
}

function AuthenticationStackScreens() {
	return (
		<AuthenticationStack.Navigator>
			<AuthenticationStack.Screen name="Signin" component={SigninScreen}/>
			<AuthenticationStack.Screen name="Signup" component={SignupScreen}/>
		</AuthenticationStack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
	const { state: { token, loading }, tryLocalSignin } = useContext(AuthContext)

	useEffect(() => {
		tryLocalSignin();
	}, []);

	if (loading) {
		return (
			<Text>Test</Text>
		)
	}

	return (
		<NavigationContainer>
			{token ?
				<Tab.Navigator screenOptions={{ headerShown: false }}>
					<Tab.Screen
						name="Recipes"
						component={RecipeStackScreens}
						options={{
							tabBarLabel: "Recipes",
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="chef-hat" color={color} size={size}/>
							)
						}}
					/>
					<Tab.Screen
						name="Groceries"
						component={GroceryStackScreens}
						options={{
							tabBarLabel: "Groceries",
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="cart" color={color} size={size}/>
							)
						}}
					/>
					<Tab.Screen
						name="Account"
						component={AccountStackScreens}
						options={{
							tabBarLabel: "Account",
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="account-circle" color={color} size={size}/>
							)
						}}
					/>
				</Tab.Navigator>
				:
				<AuthenticationStackScreens/>
			}
		</NavigationContainer>
	)
}

export default function App() {
	return (
		<AuthProvider>
			<PaperProvider theme={theme}>
				<StatusBar barStyle={theme.statusBarColor}/>
				<SafeAreaProvider>
					<RecipeProvider>
						<IngredientProvider>
							<GroceryProvider>
								<BottomTabNavigator/>
							</GroceryProvider>
						</IngredientProvider>
					</RecipeProvider>
				</SafeAreaProvider>
			</PaperProvider>
		</AuthProvider>
	);
}