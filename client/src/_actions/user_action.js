import axios from "axios";
import { USER_SERVER } from "../Config";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_CART,
  ADD_TO_HEART,
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
