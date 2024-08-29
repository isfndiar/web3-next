import Modal from "@/components/core/modal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return product;
}

const DetailProduct = async (props: { params: { id: string } }) => {
  const { params } = props;
  const product = await getData(params.id);
  return (
    <Modal>
      <Image
        width={1000}
        height={1000}
        className=" object-contain h-[20rem] w-full "
        src={product ? product?.image : ""}
        alt={product ? product?.title : "product not found"}
      />
      <div className="text-xl font-bold  text-black px-5">
        <div className="text-center">
          {product?.title} - ${product?.price}
        </div>
        {/* <Link href={`/products/detail/${params.id}`}>see detail</Link> */}
        <button className="mt-7 px-3 py-2 bg-green-500 text-white hover:bg-green-600 rounded-md w-full">
          Buy Now
        </button>
      </div>
    </Modal>
  );
};

export default DetailProduct;
