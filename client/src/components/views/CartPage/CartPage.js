import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_action";
import UserCardBlocks from "./Sections/UserCardBlocks";

function CartPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    //리덕스 User 안의 cart안에 상품이 들었는지 확인
    let cartItems = [];

    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            console.log(response);
          }
        );
      }
    }
  }, [props.user.userData]);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlocks products={props.user.cartDetail} />
      </div>
    </div>
  );
}

export default CartPage;
