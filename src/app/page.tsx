"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { getBalance } from "@wagmi/core";
import { config } from "@/lib/config/wagmi";
import { formatEther } from "viem";

const Page = () => {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<string>();
  const [hydration, setIsHydration] = useState<boolean>();
  // set hydration
  useEffect(() => {
    setIsHydration(true);
  }, []);
  // get Balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        const balanced = await getBalance(config, { address });
        const formatted = formatEther(balanced.value);
        setBalance(formatted);
      }
    };
    fetchBalance();
  }, [address]);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {isConnected && hydration ? <h1>Welcome, {address}</h1> : <h1>YAHUU</h1>}
      {isConnected && hydration ? (
        <h1>Your Eth :{balance?.slice(0, 6)} </h1>
      ) : null}
    </div>
  );
};

export default Page;
