import React from "react";
import { redirect } from "next/navigation";

function Dashboard() {
  redirect("/dashboard/profile");
  return null;
}

export default Dashboard;
