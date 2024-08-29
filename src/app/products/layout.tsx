import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};
const ProductsLayouts = ({ children, modal }: LayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default ProductsLayouts;
