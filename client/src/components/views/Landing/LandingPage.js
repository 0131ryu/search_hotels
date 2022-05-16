//rfce
import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/");
  }, []);
  return <div>LandingPage</div>;
}

export default LandingPage;
