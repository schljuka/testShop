
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  productsReducer, productDetailsReducer, newReviewReducer,
  newProductReducer, productReducer, productReviewsReducer, reviewReducer
} from './reducers/productsReducer';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer, myOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  newReview: newReviewReducer,
});

const preloadedState = {
  cart: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingInfo: JSON.parse(localStorage.getItem('shippingInfo')) || {},
  },
};

const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
