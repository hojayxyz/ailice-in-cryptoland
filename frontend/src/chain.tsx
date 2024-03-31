import { defineChain } from "viem";

export const ASTARzkEVM = defineChain({
  id: 3776,
  name: "Astar zkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.startale.com/astar-zkevmm"] },
  },
  blockExplorers: {
    default: {
      name: "Astar zkEVM",
      url: "https://astar-zkevm.explorer.startale.com/",
    },
  },
});
