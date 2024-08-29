import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

export const config = createPublicClient({
  chain: sepolia,
  transport: http(),
});
