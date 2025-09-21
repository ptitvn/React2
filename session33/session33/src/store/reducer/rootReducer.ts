import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productListReducer } from "./productListReducer";

export const rootReducer=combineReducers({
    cart: cartReducer,
    products: productListReducer
})