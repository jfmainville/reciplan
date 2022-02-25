import createDataContext from "./createDataContext";
import recipeApi from "../api/recipe";

const ingredientReducer = (state, action) => {
	switch (action.type) {
		case "create_ingredient":
			return { ...state, ingredient: action.payload };
		case "reset_ingredient":
			return { ...state, ingredient: "" };
		default:
			return state;
	}
};

const createIngredient = (dispatch) => async (ingredientName) => {
	const response = await recipeApi.post("/ingredients/create", {
		ingredientName
	});
	dispatch({ type: "create_ingredient", payload: response.data });
};

const resetIngredient = (dispatch) => () => {
	dispatch({ type: "reset_ingredient" });
};

export const { Provider, Context } = createDataContext(
	ingredientReducer,
	{ createIngredient, resetIngredient },
	{ ingredient: "" }
);