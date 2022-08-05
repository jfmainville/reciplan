import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import SigninScreen from "../../src/screens/SigninScreen";
import { Context as AuthContext } from "../../src/context/AuthContext";

const context = {
	state: {
		errorMessage: "invalid password"
	},
	clearErrorMessage: jest.fn(),
	onSubmit: jest.fn(),
};

const navigation = {
	navigate: jest.fn()
};

describe("renders the signin screen", () => {
	test("should successfully load the AuthForm component", async () => {
		const component = (
			<NavigationContainer>
				<AuthContext.Provider value={context}>
					<SigninScreen navigation={navigation}/>
				</AuthContext.Provider>
			</NavigationContainer>
		);
		const { getAllByText } = render(component);

		expect(getAllByText("Sign In").length).toBe(2);
	});
	// test("should successfully show the signup form", async () => {
	// 	const component = (
	// 		<NavigationContainer>
	// 			<AuthContext.Provider value={context}>
	// 				<SigninScreen navigation={navigation}/>
	// 			</AuthContext.Provider>
	// 		</NavigationContainer>
	// 	);
	// 	render(component);
	//
	// 	 const button = await screen.findByText("Sign Up");
	//
	// 	// fireEvent.press(button);
	// 	const newHeader = await screen.findByText("Sign Up");
	// 	// expect(newHeader).toBeTruthy();
	// });
});

