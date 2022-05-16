import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/home").then((response) => console.log(response));
  });
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
      LandingPage
    </div>
  );
}

export default LandingPage;
