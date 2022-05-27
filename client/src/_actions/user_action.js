import axios from "axios";
import { USER_SERVER } from "../Config";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_CART,
  ADD_TO_HEART,
  GET_CART_ITEMS,
} from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  //get 메소드는 body 부분 : dataToSubmit 필요 없음
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function addToCart(_id) {
  let body = {
    productId: _id,
  };

  //get 메소드는 body 부분 : dataToSubmit 필요 없음
  const request = axios
    .post(`${USER_SERVER}/addToCart`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

//addToHeart
export function addToHeart(_id) {
  let body = {
    dataId: _id,
  };

  //get 메소드는 body 부분 : dataToSubmit 필요 없음
  //USER_SERVER = '/api/user'
  const request = axios
    .post(`${USER_SERVER}/addToHeart`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_HEART,
    payload: request,
  };
}

//getCartItems
export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      //CartItem들에 해당하는 정보들을
      //Product Collection에서 가져온 후
      //Quantity 정보를 넣어준다

      userCart.forEach((cartItem) => {
        response.data.product.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data.product[index].quantity = cartItem.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}
