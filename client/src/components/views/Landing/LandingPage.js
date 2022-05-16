import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/home").then((response) => console.log(response));
  });
  return <div>LandingPage</div>;
}

export default LandingPage;
