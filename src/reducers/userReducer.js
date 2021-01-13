import { USER_DETAILS } from "../types";

const initialState = {
	userDetails: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_DETAILS:
			return {
				...state,
				userDetails: payload,
			};
		default:
			return state;
	}
};

