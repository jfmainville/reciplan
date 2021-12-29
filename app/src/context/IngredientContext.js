import createDataContext from "./createDataContext";
import recipeApi from "../api/recipe";

const ingredientReducer = (state, action) => {
	switch (action.type) {
		case "search_ingredient":
			return { ...state, foundIngredient: action.payload };
		case "reset_ingredient":
			return { ...state, foundIngredient: [] };
		default:
			return state;
	}
};

const searchIngredient = (dispatch) => async (ingredientName) => {
	const response = await recipeApi.post("/ingredients", {
		ingredientName
	});
	dispatch({ type: "search_ingredient", payload: response.data });
};

const resetIngredient = (dispatch) => () => {
	dispatch({ type: "reset_ingredient" });
};

export const { Provider, Context } = createDataContext(
	ingredientReducer,
	{ searchIngredient, resetIngredient },
	{ foundIngredient: [] }
);