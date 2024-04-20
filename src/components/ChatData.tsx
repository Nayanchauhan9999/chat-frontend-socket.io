import { IRootState } from "@/store/store";
import { convertToTimeFormat } from "@/utils/constant";
import { IMessage } from "@/utils/types/types";
import Image from "next/image";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface IChatData extends IMessage {}

const ChatData: React.FC<IChatData> = ({
  text,
  senderId,
  createdAt,
}): React.JSX.Element => {
  const { userInfo } = useSelector((state: IRootState) => state.user);
  const isSender: boolean = useMemo(() => {
    return userInfo?._id === senderId;
  }, [senderId, userInfo?._id]);

  return (
    <div className="flex items-center gap-x-1">
      {!isSender && (
        <div>
          <Image
            src="/group_avatar_image.jpg"
            alt="avatar"
            width={30}
            height={30}
            priority
            className="rounded-full"
          />
        </div>
      )}
      <div
        className={`${
          isSender ? "bg-green-100" : "bg-sky-100"
        } px-2 my-2 w-fit max-w-[60%] rounded ${
          isSender ? "ms-auto" : "me-auto"
        } shadow`}
      >
        <div>
          <p className="text-base">{text}</p>
          <p className="text-gray-400 font-mono text-[0.6rem] text-end">
            {createdAt ? convertToTimeFormat(createdAt) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatData;
