//LandingPage
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import DataCheckbox from "./Sections/DataCheckbox";
import { continents, price } from "./Sections/Datas";
import DataRadioBox from "./Sections/DataRadioBox";
import SearchFeature from "./Sections/SearchFeature";

import "./LandingPage.css";

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  //skip, limit ->최대 8개까지
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  //보여줄 자료가 없으면 더보기 버튼 안 보이게 해야 함
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({ continents: [], price: [] });

  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        // console.log(response.data);

        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품을 가져오는데 실패했습니다.");
      }
    });
  };

  const showMoreHanlder = () => {
    let skip = Skip + Limit; //0  + 8(8씩 증가)

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const handlePrice = (value) => {
    const data = price; //Datas 정보
    let array = [];

    for (let key in data) {
      if (data[key]._id) {
        //value는 가격범위 누르는 radiobox(숫자)
        if (data[key]._id === parseInt(value, 10)) {
          array = data[key].array;
        }
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    // console.log("filters : ", filters);

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters); //radiobox
    setFilters(newFilters); //checkbox
  };

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  const renderCard = Products.map((product, index) => {
    // console.log("product", product);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Col lg={6} md={8} xs={24} key={index}>
          <Card
            style={{
              width: "250px",
              height: "15%",
            }}
            className="ImageBox"
            cover={
              <a href={`/product/${product._id}`}>
                <ImageSlider images={product.images} />
              </a>
            }
          >
            <Meta
              title={product.title}
              description={`$${product.price}`}
            ></Meta>
          </Card>
        </Col>
      </div>
    );
  });

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <br />
      <h2 style={{ textAlign: "center" }}>Let's Travel Anywhere</h2>
      {/* filter */}

      {/* checkBox */}
      <Row className="BoxRow">
        <Col lg={10} xs={20} className="dataCheckbox">
          <DataCheckbox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={10} xs={20} className="dataRadiobox">
          {/* RadioBox */}
          <DataRadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      {/* Search */}
      <Row
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
          width: "68%",
        }}
        className="searchBar"
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </Row>

      {/* card */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Row gutter={[20, 20]}>{renderCard}</Row>
      </div>

      <br />
      {PostSize >= Limit && ( //자료보다 limit가 작으면 더보기 없어짐
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button style={{}} onClick={showMoreHanlder}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
