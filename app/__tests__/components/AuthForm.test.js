import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import AuthForm from "../../src/components/AuthForm";
import { NavigationContainer } from "@react-navigation/native";
import { Context as AuthContext } from "../../src/context/AuthContext";

const context = {
	state: {
		errorMessage: "Something went wrong with sign in"
	},
	clearErrorMessage: jest.fn(),
	onSubmit: jest.fn()
};

const navigation = {
	navigate: jest.fn()
};

const component = (
	<NavigationContainer>
		<AuthForm
			navigation={navigation}
			headerText="Sign In"
			onSubmit={jest.fn()}
			submitButtonText="Sign In Button"
			errorMessage="Something went wrong with sign in"
		/>
	</NavigationContainer>
);

describe("validate the AuthForm component functionality", () => {
	it("should show an error message if no password is specified", async () => {
		render(component);

		const emailField = screen.getByTestId("#email");
		const signinButton = screen.getByText("Sign In Button");

		fireEvent.changeText(emailField, "test1@test.com");
		fireEvent.press(signinButton);

		expect(screen.getByText("Something went wrong with sign in"));
	});
	it("should show an error message if no email is specified", async () => {
		render(component);

		const passwordField = screen.getByTestId("#password");
		const signinButton = screen.getByText("Sign In Button");

		fireEvent.changeText(passwordField, "");
		fireEvent.press(signinButton);

		expect(screen.getByText("Something went wrong with sign in"));
	});
	it("should login if a username and password is specified", async () => {
		render(component);

		const onSubmit = jest.fn();

		const emailField = screen.getByTestId("#email");
		const passwordField = screen.getByTestId("#password");
		const signinButton = screen.getByText("Sign In Button");

		fireEvent.changeText(emailField, "test1@test.com");
		fireEvent.changeText(passwordField, "password12");
		fireEvent.press(signinButton);

		expect(onSubmit).toBeCalledWith("test1@test.com");
	});
});