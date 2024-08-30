import { createPublicClient, http, createClient } from "viem";
import { mainnet, sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});
