import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    console.log(res);
    return "products not found";
  }
  const products = await res.json();
  return products;
}
const Products = async () => {
  const products = await getData();
  return (
    <div className="container">
      <div>Products Page</div>
      <div className="flex gap-3 flex-wrap">
        {products.length > 0 ? (
          products.map((item) => (
            <Link
              href={`/products/detail/${item.id}`}
              key={item.id}
              className="w-96 border border-white "
            >
              <Image
                src={item.image}
                width={1000}
                height={1000}
                alt="products"
                className="size-72 object-contain object-center"
              />
              <p>{item.title}</p>
              <p>{item.price}</p>
            </Link>
          ))
        ) : (
          <p>products not found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
