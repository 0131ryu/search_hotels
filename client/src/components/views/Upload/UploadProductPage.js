import React, { useState } from "react";
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Asia" },
  { key: 2, value: "Africa" },
  { key: 3, value: "North America" },
  { key: 4, value: "South America" },
  { key: 5, value: "Antarctica" },
  { key: 6, value: "Europe" },
  { key: 7, value: "Australia" },
];

const Metropolitans = [
  { key: 1, value: "서울특별시" },
  { key: 2, value: "부산광역시" },
  { key: 3, value: "전주광역시" },
  { key: 4, value: "대구광역시" },
  { key: 5, value: "인천광역시" },
  { key: 6, value: "광주광역시" },
  { key: 7, value: "대전광역시" },
  { key: 8, value: "울산광역시" },
];

function UploadProductPage() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  // const [Images, setImages] = useState([]);
  const [Metropolitan, setMetropolitans] = useState(1);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const metropolitanChangeHandler = (event) => {
    setMetropolitans(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>여행 상품 업로드</h2>

        <Form>
          {/* DropZone */}
          <label>이름</label>
          <Input onChange={titleChangeHandler} value={Title} />
          <br />
          <br />
          <label>설명</label>
          <TextArea onChange={descriptionChangeHandler} value={Description} />
          <br />
          <br />
          <label>가격($)</label>
          <Input onChange={priceChangeHandler} value={Price} />
          <br />
          <br />
          <select onChange={continentChangeHandler} value={Continent}>
            {Continents.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <br />
          <br />
          <br />
          <select onChange={metropolitanChangeHandler} value={Metropolitan}>
            {Metropolitans.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <br />
          <br />
          <Button>확인</Button>
        </Form>
      </div>
    </div>
  );
}

export default UploadProductPage;
