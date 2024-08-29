import CardPersonalInfo from "@/components/card";
import React, { ReactNode } from "react";

type DashboardProps = {
  children: React.ReactNode;
  analytic: ReactNode;
  products: ReactNode;
};
const DashboardLayouts = (props: DashboardProps) => {
  const { children, analytic, products } = props;
  return (
    <div>
      <div>{children}</div>
      {analytic}
      {products}
      <CardPersonalInfo />
    </div>
  );
};

export default DashboardLayouts;
