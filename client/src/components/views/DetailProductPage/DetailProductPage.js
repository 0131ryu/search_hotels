import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DetailProductPage(props) {
  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
        } else {
          alert("상세 정보 가져오기를 실패했습니다.");
        }
      });
  });

  return <div>DetailProductPage</div>;
}

export default DetailProductPage;
