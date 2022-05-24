import React, { useState } from "react";
import { Input, Space } from "antd";
const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHanlder = (event) => {
    setSearchTerm(event.currentTarget.value);
    props.refreshFunction(event.currentTarget.value);
  };
  return (
    <div>
      <Search
        placeholder="search"
        style={{
          width: 200,
        }}
        value={SearchTerm}
        onChange={searchHanlder}
      />
    </div>
  );
}

export default SearchFeature;
