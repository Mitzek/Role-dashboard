import React from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { MockRoleService } from "./Mock_Service";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="display_columns">
        <Sidebar />
        <Main roleService={new MockRoleService()} />
      </div>
    </div>
  );
}
