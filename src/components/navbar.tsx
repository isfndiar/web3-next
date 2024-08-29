"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";
import { config } from "@/lib/config/wagmi";
import { getBalance } from "@wagmi/core";
import { formatEther } from "viem";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openWallet, setOpenWallet] = useState<boolean>(false);
  const [hydration, setIsHydration] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      setIsOpen(false);
      setIsHydration(true);
    }
  }, [isConnected]);
  useEffect(() => {
    if (address) {
      const fetchBalance = async () => {
        const balanced = await getBalance(config, { address });
        setBalance(formatEther(balanced.value));
      };
      fetchBalance();
    }
  }, [address]);

  return (
    <div className="w-full py-5 px-10 flex items-center bg-black text-white">
      <div className="me-auto flex">
        <header className="xl:me-40 lg:me-32 md:me-20 ">Logo</header>
        <Navigation />
      </div>
      <div></div>
      {isConnected && hydration ? (
        <div className="flex gap-3 relative">
          <DropDownWallet
            address={address}
            balance={balance}
            openWallet={openWallet}
          />
          <button
            onClick={() => setOpenWallet((x) => !x)}
            className="bg-blue-500 rounded-full py-2 px-3"
          >
            {address?.slice(0, 4) + "..." + address?.slice(-4)}
          </button>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 py-2 px-3 text-white font-semibold"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className={`bg-white py-2 px-3 rounded-full font-semibold text-black`}
          onClick={() => setIsOpen(true)}
        >
          Wallet
        </button>
      )}
      <WalletOptions handleOpen={() => setIsOpen(false)} isOpen={isOpen} />
    </div>
  );
};

function Navigation() {
  return (
    <nav className="space-x-4 hidden md:block">
      <Link className="hover:text-green-300" href={"/"}>
        Home
      </Link>
      <Link className="hover:text-green-300" href={"/dashboard"}>
        Dashboard
      </Link>
      <Link className="hover:text-green-300" href={"/products"}>
        Products
      </Link>
      <Link className="hover:text-green-300" href={"/faq"}>
        FAQs
      </Link>
      <Link className="hover:text-green-300" href={"/mood"}>
        Mood
      </Link>
    </nav>
  );
}

const DropDownWallet = (props: {
  address: string | undefined;
  openWallet: boolean;
  balance: string | undefined;
}) => {
  const { address, openWallet, balance } = props;
  const { chains, switchChain } = useSwitchChain();
  const [copyLoading, setCopyLoading] = useState<boolean>(false);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(address ? address : "")
      .then(() => {
        toast.success("Text copied to clipboard!", {
          position: "top-center",
          duration: 1000,
        });
      })
      .catch(() => {
        toast.error("Failed to copy text", { position: "top-center" });
      });
    setCopyLoading(true);
    setTimeout(() => {
      setCopyLoading(false);
    }, 1000);
  };
  return (
    <>
      {openWallet && (
        <div className="absolute -bottom-32 flex flex-col -left-10 origin-bottom  border border-gray-200 shadow-2xl bg-white text-black">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm w-full"
          >
            {address?.slice(0, 4) + "..." + address?.slice(-4)}
            {copyLoading ? <CopyCheck size={15} /> : <Copy size={15} />}
          </button>
          <div>{balance?.slice(0, 6)} Eth</div>
          <div>
            {chains.map((item) => (
              <div className="hover:bg-gray-300" key={item.id}>
                <button onClick={() => switchChain({ chainId: item.id })}>
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const WalletOptions = (props: { isOpen: boolean; handleOpen: () => void }) => {
  const { isOpen, handleOpen } = props;
  const { connect, connectors } = useConnect();

  return (
    <>
      {isOpen && (
        <div className="fixed w-full h-full inset-0 z-10 flex flex-col justify-center items-center">
          <div
            onClick={handleOpen}
            className="fixed bg-black opacity-35 inset-0 size-full z-10"
          />

          <div className="bg-white z-[99] flex gap-3 py-6 px-3">
            {connectors.map((connector) => (
              <button
                className="text-white bg-blue-400 rounded-full px-3 py-2 hover:bg-blue-500"
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
