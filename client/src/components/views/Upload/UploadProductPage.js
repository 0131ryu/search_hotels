import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "../../utils/FilUpload";

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

function UploadProductPage() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  // const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
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
        <br />
        <br />
        <h2>여행 상품 업로드</h2>

        <Form>
          {/* DropZone */}
          <FileUpload />
          <label>이름</label>
          <Input onChange={titleChangeHandler} value={Title} />
          <br />
          <br />
          <label style={{ textAlignLast: "left" }}>설명</label>
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
          <Button>확인</Button>
        </Form>
      </div>
    </div>
  );
}

export default UploadProductPage;
