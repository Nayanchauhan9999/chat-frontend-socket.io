/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { socket } from "@/socket/socket";
import { useParams } from "next/navigation";
import { GET } from "@/utils/service/axiosService";
import { GROUP_MESSAGES } from "@/utils/service/endpoints";
import { AxiosError } from "axios";
import { IGroup, IMessage } from "@/utils/types/types";
import { useSelector } from "react-redux";
import { IRootState } from "@/store/store";
import ChatData from "@/components/ChatData";

const ContactUs: React.FC = (): React.JSX.Element => {
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  // const [receivedMessage, setReceivedMessage] = useState({} as IGroup);
  const [groupMessages, setGroupMessages] = useState<IMessage[]>([]);
  const { userInfo } = useSelector((state: IRootState) => state.user);

  const params = useParams<{ id: string }>();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("client is disconnected");
    });
    socket.on("message", (data: IMessage[]) => {
      setGroupMessages(data);
      console.log("messageData", data);
    });
    socket.on("message-error", (data) => {
      console.log("message error", data);
      alert(data?.message);
    });
  }, []);

  useEffect(() => {
    getGroupMessageById();
  }, []);

  // send message function
  const handleSendMessage = () => {
    const createMessageObject: IMessage = {
      groupId: params?.id,
      text: message,
      senderId: userInfo?._id,
    };
    setMessage("");
    socket.emit("message", createMessageObject);
  };

  const getGroupMessageById = async () => {
    try {
      const res = await GET<IGroup>(GROUP_MESSAGES, {
        params: {
          groupId: params?.id,
        },
      });
      res?.data?.data?.messages && setGroupMessages(res?.data?.data?.messages);
    } catch (error) {
      console.log("errror while fetch group message", error);
      if (error instanceof AxiosError) {
        alert(JSON.stringify(error?.response?.data));
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-5xl">Chat With Us</h1>
      <div className="h-[70vh] flex flex-col gap-y-6 border-2 w-3/4 bg-slate-50 mx-auto mt-14 rounded-3xl p-4">
        <div className="message-area flex-grow">
          {groupMessages &&
            groupMessages?.map((messageObj, index) => (
              <ChatData key={index} {...messageObj} />
            ))}
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
