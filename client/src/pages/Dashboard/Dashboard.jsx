import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./dashboard.scss"

function Dashboard() {
  return (
    <div className="wrapper">
      <Sidebar />
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
