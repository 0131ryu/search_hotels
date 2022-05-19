import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function FilUpload() {
  //저장하기 전 state에 저장
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        //원래있던 이미지 다 넣게 됨
        setImages([...Images, response.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignSelf: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined
              style={{ fontSize: "3rem", display: "flex", alignSelf: "center" }}
            />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflow: "scroll",
        }}
      >
        {Images.map((image, index) => {
          return (
            //key 없으면Each child in a list should have a unique "key" prop. 오류 발생
            <div key={index}>
              <img
                style={{ minWidth: "300px", width: "300px", height: "240px" }}
                src={`https://localhost:5000/${image}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilUpload;
