import createDataContext from "./createDataContext";
import recipeApi from "../api/recipe";

const recipeReducer = (state, action) => {
	switch (action.type) {
		case "fetch_recipes":
			return { ...state, recipes: action.payload }
		case "fetch_recipe_details":
			return { ...state, recipe: action.payload }
		case "fetch_recipe_images":
			return { ...state, images: action.payload }
		case "clean_recipe_images":
			return { ...state, images: [] }
		case "create_recipe":
			return { ...state, recipes: [...state.recipes, action.payload] }
		case "update_recipe":
			return {
				...state, recipes: state.recipes.map((recipe) => {
					return recipe._id === action.payload._id
						? action.payload
						: recipe;
				})
			};
		case "delete_recipe":
			return { ...state, recipes: state.recipes.filter((recipe) => recipe._id !== action.payload) };
		default:
			return state;
	}
};

const fetchRecipes = (dispatch) => async () => {
	const response = await recipeApi.get("/recipes");
	dispatch({ type: "fetch_recipes", payload: response.data });
};

const fetchRecipeDetails = (dispatch) => async (recipeId) => {
	const response = await recipeApi.get(`/recipes/details/${recipeId}`);
	dispatch({ type: "fetch_recipe_details", payload: response.data });
};

const fetchRecipeImages = (dispatch) => async (recipeName) => {
	const response = await recipeApi.post("/recipes/images", { recipeName });
	dispatch({ type: "fetch_recipe_images", payload: response.data });
}

const cleanRecipeImages = (dispatch) => async () => {
	dispatch({ type: "clean_recipe_images" });
}

const createRecipe = (dispatch) => async (recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, callback) => {
	const response = await recipeApi.post("/recipes/create", {
		recipeName,
		recipeImage,
		recipeStyle,
		recipePreparationTime,
		recipeCookTime,
		ingredients
	});
	dispatch({ type: "create_recipe", payload: response.data });

	if (callback) {
		callback();
	}
};

const updateRecipe = (dispatch) => async (recipeId, recipeName, recipeImage, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, callback) => {
	const response = await recipeApi.put(`/recipes/update/${recipeId}`, {
		recipeName,
		recipeImage,
		recipeStyle,
		recipePreparationTime,
		recipeCookTime,
		ingredients
	});
	dispatch({ type: "update_recipe", payload: response.data });

	if (callback) {
		callback();
	}
};

const deleteRecipe = (dispatch) => async (recipeId) => {
	await recipeApi.delete(`/recipes/delete/${recipeId}`);
	dispatch({ type: "delete_recipe", payload: recipeId });
};

export const { Provider, Context } = createDataContext(
	recipeReducer,
	{
		fetchRecipes,
		fetchRecipeDetails,
		fetchRecipeImages,
		cleanRecipeImages,
		createRecipe,
		updateRecipe,
		deleteRecipe
	},
	{ recipe: [], recipes: [], images: [] }
);