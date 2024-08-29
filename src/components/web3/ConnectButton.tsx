import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function ConnectButton() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  console.log(connect);

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col">
          <span>Connected with {address}</span>
          <button
            className="bg-black py-2 px-3 text-white"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <>
          {connectors.map((connector) => (
            <div key={connector.id}>
              <Image
                alt={connector.name}
                width={1000}
                height={1000}
                src={connector.icon ? connector.icon : ""}
                className="size-10"
              />
              <button onClick={() => connect({ connector })}>
                {connector.name}
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default ConnectButton;
