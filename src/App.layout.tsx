import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./layout";
import { Box } from "@mui/material";

const AppLayout = () => {
  return (
    <Suspense fallback={null}>
      <Header />
      <Outlet />
      <Footer />
    </Suspense>
  );
};

export default React.memo(AppLayout);
