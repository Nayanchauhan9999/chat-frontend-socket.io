"use client";
import React, { useEffect, useState } from "react";
import { socket } from "@/socket/socket";

const ContactUs: React.FC = (): React.JSX.Element => {
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("client is disconnected");
    });
    socket.on("message", (data) => {
      console.log("messageData", setReceivedMessage(data));
    });
  }, []);
  // send message function
  const handleSendMessage = () => {
    socket.emit("message", message);
  };

  return (
    <div>
      <h1 className="text-center text-5xl">Chat With Us</h1>
      <div className="h-[70vh] flex flex-col gap-y-6 border-2 w-3/4 bg-slate-50 mx-auto mt-14 rounded-3xl p-4">
        <div className="message-area flex-grow">
          {receivedMessage && receivedMessage}
        </div>
        <div className="flex items-center gap-4 h-9">
          <input
            type="text"
            className="border-2 border-slate-200 rounded-lg flex-grow h-9 ps-3 outline-none focus:border-slate-400"
            placeholder="type your message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            className="bg-blue-600 text-white w-24 h-9 rounded-lg active:bg-blue-700 hover:bg-blue-500 disabled:bg-blue-300"
            disabled={!message}
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
