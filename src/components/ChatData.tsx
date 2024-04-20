import { IRootState } from "@/store/store";
import { IMessage } from "@/utils/types/types";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface IChatData extends IMessage {}

const ChatData: React.FC<IChatData> = ({
  text,
  senderId,
}): React.JSX.Element => {
  const { userInfo } = useSelector((state: IRootState) => state.user);
  const isSender: boolean = useMemo(() => {
    return userInfo?._id === senderId;
  }, [senderId, userInfo?._id]);

  return (
    <div
      className={`${
        isSender ? "bg-green-100" : "bg-sky-100"
      } px-2 my-2 w-fit max-w-[60%] rounded ${
        isSender ? "ms-auto" : "me-auto"
      } shadow`}
    >
      <p className="text-base">{text}</p>
    </div>
  );
};

export default ChatData;
