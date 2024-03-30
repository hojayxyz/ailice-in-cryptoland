import { useState } from "react";
import Title from "./Title";
import axios from "axios";
import RecordMessage from "./RecordMessage";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

const Controller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [credit, setCredit] = useState(10);

  function createBlobURL(data: any) {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  }

  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    // convert blob url to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio to send file
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // send form data to api endpoint
        await axios
          .post("http://localhost:8000/post-audio/", formData, {
            headers: {
              "Content-Type": "audio/mpeg",
            },
            responseType: "arraybuffer", // Set the response type to handle binary data
          })
          .then((res: any) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobURL(blob);

            // Append to audio
            const ailiceMessage = { sender: "ailice", blobUrl: audio.src };
            messagesArr.push(ailiceMessage);
            setMessages(messagesArr);

            // Play audio
            setIsLoading(false);
            audio.play();
            setCredit((c) => c - 1);
          })
          .catch((err: any) => {
            console.error(err);
            setIsLoading(false);
            setCredit((c) => c - 1);
          });
      });
  };

  // Reset conversation
  const resetConversation = async () => {
    setIsResetting(true);

    await axios
      .get("http://localhost:8000/reset", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setMessages([]);
        }
      })
      .catch((err) => {});

    setIsResetting(false);
  };

  // Refill Credit
  const buyCredit = () => {
    setCredit((c) => c + 10);
  };

  return (
    <div className="h-screen overflow-y-hidden">
      {/* Title */}
      <Title setMessages={setMessages} />

      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {/* Conversation */}
        <div className="mt-5 px-5">
          {messages?.map((audio, index) => {
            return (
              <div
                key={index + audio.sender}
                className={
                  "flex flex-col " +
                  (audio.sender == "ailice" && "flex items-end")
                }
              >
                {/* Sender */}
                <div className="mt-4 ">
                  <p
                    className={
                      audio.sender == "ailice"
                        ? "text-right mr-2 italic text-green-500"
                        : "ml-2 italic text-blue-500"
                    }
                  >
                    {audio.sender}
                  </p>

                  {/* Message */}
                  <audio
                    src={audio.blobUrl}
                    className="appearance-none"
                    controls
                  />
                </div>
              </div>
            );
          })}
          {messages.length == 0 && !isLoading && !isConnected && (
            <div className="flex justify-center items-center gap-2 font-light mt-10">
              <span className="italic">Connect to talk to Ailice</span>
              <span className="text-3xl">👩‍🦳</span>
            </div>
          )}
          {isConnected && (
            <div className="flex justify-center text-sm">
              <span>Credit: </span>
              {credit}
            </div>
          )}
          {/* reset history */}
          {isConnected && (
            <div className="flex justify-center m-2">
              <button
                onClick={resetConversation}
                className={
                  "flex items-center gap-2 text-sm transition-all duration-300 text-blue-300 hover:text-pink-500 " +
                  (isResetting && "animate-pulse")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                click to reset Ailice's memory 🧲
              </button>
            </div>
          )}
          {/* WalletConnect */}
          {!isConnected && (
            <div className="mt-2 text-center">
              <button
                className="px-6 py-3 text-white bg-slate-500 rounded-full hover:bg-slate-400 transition-all"
                onClick={() => open({ view: "Networks" })}
              >
                Check Available Networks
              </button>
            </div>
          )}
          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Gimme a sec...
            </div>
          )}
        </div>

        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-sky-500 to-green-500">
          <div className="flex justify-center items-center w-full">
            {isConnected ? (
              credit > 0 ? (
                <div>
                  <RecordMessage handleStop={handleStop} />
                </div>
              ) : (
                <div>
                  <button
                    onClick={buyCredit}
                    className="px-5 py-10 text-slate-800 font-semibold bg-sky-100 rounded-full hover:bg-sky-300 transition-all"
                  >
                    Buy Credit
                  </button>
                  <button className="px-5 py-10 text-slate-800 font-semibold bg-sky-100 rounded-full hover:bg-sky-300 transition-all">
                    Buy Credit
                  </button>
                </div>
              )
            ) : (
              <div>
                <button
                  className="px-5 py-10 text-slate-800 font-semibold bg-sky-100 rounded-full hover:bg-sky-300 transition-all"
                  onClick={() => open({ view: "Connect" })}
                >
                  Connect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controller;
