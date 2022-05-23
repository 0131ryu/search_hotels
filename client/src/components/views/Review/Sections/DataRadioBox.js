import React, { useState } from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;

function DataRadioBox(props) {
  const [Price, setPrice] = useState(0);

  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <Radio key={value._id} value={`${value._id}`}>
        {value.name}
      </Radio>
    ));

  //this.state.value -> Value로 제어(버튼 한 개만 눌러짐)
  const handleChange = (event) => {
    setPrice(event.target.value);
    props.boxFilters(event.target.value);
  };

  return (
    <div>
      <div>
        <Collapse
          style={{ height: "100%", width: "500px", marginLeft: "14.8%" }}
        >
          <Panel header="Prices" key="1">
            <Radio.Group onChange={handleChange} value={Price}>
              {renderRadioBox()}
            </Radio.Group>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default DataRadioBox;
