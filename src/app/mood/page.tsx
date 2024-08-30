"use client";
import React, { useEffect, useState } from "react";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import { readContract } from "@wagmi/core";
import { config } from "@/lib/config/wagmi";
import { toast } from "sonner";
import { publicClient } from "@/lib/config/viem";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
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
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
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

const moodAddressContract = "0x600E5E3aA2B580b090395b8b8a2423A3e080BC97";

const MoodPage = () => {
  const [addr, setAddr] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [toastId, setToastId] = useState<string | number | undefined>();
  const { address, isConnected } = useAccount();
  const [hydration, setHydration] = useState<boolean>(false);
  const { writeContract, isPending } = useWriteContract();

  const getMood = async () => {
    try {
      const result = await readContract(config, {
        abi,
        address: moodAddressContract,
        functionName: "getMood",
        args: [address],
      });
      console.log("Mood retrieved:", result);
      toast.success(`${result}`, { position: "top-center" });
    } catch (error) {
      console.error("Error retrieving mood:", error);
      toast.error("Failed to retrieve mood", { position: "top-center" });
    }
  };

  const setMood = async () => {
    writeContract({
      abi: abi,
      address: moodAddressContract,
      functionName: "setMood",
      args: [address, value],
    });
  };

  useEffect(() => {
    if (isConnected && address) {
      setAddr(address);
    }
  }, [isConnected, address]);

  useEffect(() => {
    setHydration(true);
  }, []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  // read contract
  const result = useReadContract({
    abi,
    address: moodAddressContract,
    functionName: "getMood",
    args: [address],
  });
  return (
    <div
      className={`size-full  flex flex-col justify-center items-center font-mono`}
    >
      <div className="border border-gray-200 shadow-2xl rounded-2xl p-3 w-1/3 mt-32">
        <header className="text-center">
          <div className="font-bold text-2xl">Type Your Mood! :D</div>
          <div className="font-light text-sm">
            it can be save in blockchain :D
          </div>
        </header>
        <section className="mt-3 flex flex-col">
          <label htmlFor="set-mood" className=" font-semibold">
            Set Your Mood
          </label>
          <input
            className="bg-slate-200 outline-none px-3 py-1 rounded-xl"
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
            type="text"
            id="mood"
          />
        </section>
        <section className={`space-x-4 mt-10`}>
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
        </section>
      </div>
    </div>
  );
};

export default MoodPage;
