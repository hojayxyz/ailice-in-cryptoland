import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { ASTARzkEVM } from "./chain";
import { neonDevnet, klaytn, celoAlfajores } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "7516507bb5b81201cbbe68a57234e4f3";

// 2. Create wagmiConfig
const metadata = {
  name: "Ailice",
  description: "Ailice in Cryptoland",
  url: "https://localhost", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [neonDevnet, klaytn, ASTARzkEVM, celoAlfajores];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
