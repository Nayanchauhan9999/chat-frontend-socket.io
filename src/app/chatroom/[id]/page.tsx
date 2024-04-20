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
import ChatRoomHeader from "@/components/ChatRoomHeader";

const ChatRoom: React.FC = (): React.JSX.Element => {
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  // const [receivedMessage, setReceivedMessage] = useState({} as IGroup);
  const [groupDetails, setGroupDetails] = useState<IGroup>({} as IGroup);
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
    socket.on("message", (data: IGroup) => {
      setGroupDetails(data);
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
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      res?.data?.data && setGroupDetails(res?.data?.data);
    } catch (error) {
      console.log("errror while fetch group message", error);
      if (error instanceof AxiosError) {
        alert(JSON.stringify(error?.response?.data));
      }
    }
  };

  return (
    <div className="h-screen flex flex-col border w-full sm:w-3/4 border-slate-100 bg-slate-50 mx-auto">
      <ChatRoomHeader {...groupDetails} />
      <div className="flex-grow px-3 overflow-auto no-scrollbar">
        {groupDetails?.messages &&
          groupDetails?.messages?.map((messageObj, index) => (
            <ChatData key={index} {...messageObj} />
          ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-4 py-3 px-4 bg-zinc-100 shadow border-t border-t-gray-200"
      >
        <input
          type="text"
          className="border-slate-200 rounded flex-grow h-11 px-3 outline-none shadow-md"
          placeholder="type your message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input
          className="bg-blue-600 text-white w-24 h-11 shadow rounded active:bg-blue-700 hover:bg-blue-500 disabled:bg-blue-300"
          disabled={!message}
          value={"Send"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default ChatRoom;
