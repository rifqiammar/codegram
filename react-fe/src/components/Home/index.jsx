import React, { useEffect } from "react";

import Navbar from "../Navbar";
import Content from "./Content";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Content />
    </div>
  );
};

export default Home;
