import { http, createConfig } from "wagmi";
import { base, mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error("Project ID Not Found");

export const config = createConfig({
  chains: [mainnet, base, sepolia],
  connectors: [walletConnect({ projectId }), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});
