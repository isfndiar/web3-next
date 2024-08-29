"use client";
import React, { MouseEventHandler, ReactNode, useRef } from "react";
import { useRouter } from "next/navigation";
const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const overlay = useRef(null);
  const close: MouseEventHandler = (e) => {
    if (overlay.current == e.target) {
      router.back();
    }
  };
  return (
    <div
      ref={overlay}
      onClick={close}
      className="fixed inset-0 flex flex-col justify-center items-center h-screen w-full bg-black bg-opacity-35"
    >
      <div className="bg-white w-1/3 p-1 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Modal;
