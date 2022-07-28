import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CardsGrid from "../../components/Cards Grid/CardsGrid";
import "./dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Navbar className="navbar" path="Dashboard" />
        <div className="dashboardWrapper">
          <h1>Dashboard</h1>
          <CardsGrid className="cardsGrid" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
