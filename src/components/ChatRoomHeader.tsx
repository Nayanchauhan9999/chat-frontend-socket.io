import { IGroup } from "@/utils/types/types";
import React from "react";

const ChatRoomHeader: React.FC<IGroup> = ({ name }): React.JSX.Element => {
  return (
    <div className="px-4 bg-white h-14 border-b shadow-sm flex items-center">
      <h4 className="text-xl font-medium font-sans text-slate-600 capitalize">
        {name}
      </h4>
    </div>
  );
};

export default ChatRoomHeader;
