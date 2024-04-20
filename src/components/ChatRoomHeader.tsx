"use client";
import { IGroup } from "@/utils/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { TiArrowBack } from "react-icons/ti";

const ChatRoomHeader: React.FC<IGroup> = ({ name }): React.JSX.Element => {
  const router = useRouter();
  return (
    <div className="px-4 bg-white h-14 border-b shadow-sm flex items-center">
      <div
        onClick={() => router.back()}
        className="bg-gray-50 cursor-pointer hover:bg-gray-100 shadow h-7 w-7 me-2 rounded-full flex justify-center items-center"
      >
        <TiArrowBack size={22} fill="gray" className="hover:fill-gray-600" />
      </div>
      <h4 className="text-xl font-medium font-sans text-slate-600 capitalize">
        {name}
      </h4>
    </div>
  );
};

export default ChatRoomHeader;
