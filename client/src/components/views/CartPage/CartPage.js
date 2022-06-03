import useItems from "antd/lib/menu/hooks/useItems";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_action";
import UserCardBlocks from "./Sections/UserCardBlocks";

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);

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
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setTotal(total);
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlocks products={props.user.cartDetail} />
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Total Amount : ${Total}</h2>
      </div>
    </div>
  );
}

export default CartPage;
