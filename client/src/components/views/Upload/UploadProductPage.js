import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "../../utils/FilUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const navigate = useNavigate();

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

  //Fileupload에 있는 것을 새로운 이미지를 받아오도록 함
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    //페이지 자동 리프레시 되는 것 막음
    event.preventDefault();

    //값이 하나라도 비면 오류
    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert("모든 값을 작성해야 합니다.");
    }

    //값을 다 채우면 서버 request로 보낸다
    const body = {
      //로그인된 사람의 아이디
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents: Continent,
    };

    axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다.");
        navigate("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
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

        <Form onSubmitCapture={submitHandler}>
          {/* DropZone */}
          <FileUpload refreshFunction={updateImages} />
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
          <Button onClick={submitHandler}>확인</Button>
        </Form>
      </div>
    </div>
  );
}

export default UploadProductPage;
