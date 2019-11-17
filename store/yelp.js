import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const YELP_API_KEY =
	"zbczWecavwX-PEqu2ZY9Nji3l8hmfiBgSBgaOElh8q_XS-izyIPL1IWRiI77e-z6PXvZIWq6WI3oujk8_cui6_2Xs2IP4sksuRv9zow3ynMHGZBWcywWbOPs3XvNXXYx";

const api = axios.create({
	baseURL: "https://api.yelp.com/v3",
	headers: {
		Authorization: `Bearer ${YELP_API_KEY}`
	}
});

//ACTION TYPES
const GOT_BUSINESSES = "GOT_BUSINESSES";

//ACTION CREATORS
const gotBusinesses = businesses => ({
	type: GOT_BUSINESSES,
	businesses
});

//THUNKS
export const getBusinesses = location => async dispatch => {
	try {
		console.log("I AM IN THE THUNK");
		const { data } = await api.get("/businesses/search", {
			params: {
				limit: 20,
				location: location
				//	term
			}
		});
		// console.log(data);
		const info = data.businesses.map(business => ({
			name: business.name,
			location: business.location,
			imageUrl: business.image_url,
			categories: business.categories,
			rating: business.rating
		}));
		//console.log("THIS IS INFO", info);
		dispatch(gotBusinesses(info));
		// dispatch(gotBusinesses(data));
	} catch (error) {
		console.log("error getting businesses", error);
	}
};

const initialState = {
	businesses: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GOT_BUSINESSES:
			return { ...state, businesses: action.businesses };
		default:
			return state;
	}
};

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
