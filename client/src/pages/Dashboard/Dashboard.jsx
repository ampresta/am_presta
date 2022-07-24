import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Navbar path="Dashboard"/>
        CONTENT
      </div>
    </div>
  );
}

export default Dashboard;
