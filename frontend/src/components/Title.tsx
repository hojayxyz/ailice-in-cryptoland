import { useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";

type Props = {
  setMessages: any;
};

function Title({ setMessages }: Props) {
  const [isResetting, setIsResetting] = useState(false);
  const { address, isConnected } = useAccount();

  return (
    <div className="flex justify-between items-center w-full p-4 bg-gray-900 text-white font-bold shadow">
      <div className="ml-3">
        <span className="italic font-extralight text-xl">Ailice</span>
      </div>
      <div className="flex gap-6 mr-3">
        <w3m-button balance="hide" size="sm" />
      </div>
    </div>
  );
}

export default Title;
