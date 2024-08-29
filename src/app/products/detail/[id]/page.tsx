import Image from "next/image";
import React from "react";

async function getData(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return product;
}

const DetailProduct = async (props: { params: { id: string } }) => {
  const { params } = props;
  const product = await getData(params.id);
  return (
    <>
      <div className="text-2xl font-bold text-center py-7">DetailProduct</div>
      <div className="flex gap-3 justify-center">
        <Image
          width={400}
          height={400}
          className="w-[50%] bg-red-500  object-cover h-[30rem] "
          src={product ? product?.image : ""}
          alt={product ? product?.title : "product not fount"}
        />
        <div className="text-xl font-bold w-[50%]">
          <div>
            {product?.title} - ${product?.price}
          </div>
          <button className="mt-7 px-3 py-2 bg-green-500 rounded-md">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
