"use client";
import React, { useEffect, useState } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { config } from "@/lib/config/wagmi";
import { toast } from "sonner";

const moodAbiContract = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const moodAddressContract = "0xc96d76650bf1e49d7f282e392561b78e1598c413";

const MoodPage = () => {
  const [addr, setAddr] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [toastId, setToastId] = useState<string | number | undefined>();
  const { address, isConnected } = useAccount();
  const [hydration, setHydration] = useState<boolean>(false);
  const { writeContract, isPending } = useWriteContract();

  const getMood = async () => {
    const result = await readContract(config, {
      abi: moodAbiContract,
      address: moodAddressContract,
      functionName: "getMood",
    });
    console.log(result);
    toast.success(`${result}`, { position: "top-center" });
  };

  const setMood = () => {
    writeContract({
      abi: moodAbiContract,
      address: moodAddressContract,
      functionName: "setMood",
      args: [value],
    });
  };

  useEffect(() => {
    if (isConnected && address) {
      setAddr(address);
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (isPending) {
      const id = toast.loading("Transaction in progress...", {
        position: "top-center",
      });
      setToastId(id);
    } else if (toastId) {
      // Dismiss the loading toast when the transaction is no longer pending
      toast.dismiss(toastId);
      setTimeout(
        () =>
          toast.success(`${value} has been added`, { position: "top-center" }),
        1000
      );

      setToastId(undefined);
    }
  }, [isPending]);

  if (!isConnected) {
    return (
      <div className="size-full flex flex-col justify-center items-center mt-10">
        Sign In Your Wallet
      </div>
    );
  }

  return (
    <div className={`size-full flex flex-col justify-center items-center`}>
      <h1>Hello {addr}</h1>
      <div className="mt-3">
        <label htmlFor="set-mood">Set Your Mood</label>
        <input
          className="border border-black"
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
          type="text"
          id="mood"
        />
      </div>
      <div className={`space-x-4 mt-10`}>
        <button
          className={`bg-blue-200 rounded-full py-2 px-3`}
          onClick={getMood}
        >
          GetMood
        </button>
        <button
          className={`bg-blue-200 rounded-full py-2 px-3`}
          onClick={setMood}
        >
          SetMood
        </button>
      </div>
    </div>
  );
};

export default MoodPage;
