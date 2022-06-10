import React from "react";

function HistoryPage(props) {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>

      <br />
      <table>
        <thead>
          <tr>
            <th>Purchase name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
            props.user.userData.history &&
            props.user.userData.history.map((item, i) => (
              <tr key={i}>
                <td>{item[0].name}</td>
                <td>{item[0].price}</td>
                <td>{item[0].quantity}</td>
                <td>{item[0].dateOfPurchase}</td>
                {console.log("item ", item)}
                {console.log("index ", i)}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
