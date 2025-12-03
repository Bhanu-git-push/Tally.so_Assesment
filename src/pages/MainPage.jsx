import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardManagement from "../components/DashboardManagement";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <DashboardManagement/>
      <Footer />
    </div>
  );
};

export default MainPage;
