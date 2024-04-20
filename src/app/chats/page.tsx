"use client";
import { GET } from "@/utils/service/axiosService";
import { USER_GROUP_LIST } from "@/utils/service/endpoints";
import { IGroup } from "@/utils/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Chats = () => {
  const [groupList, setGroupList] = useState<IGroup[]>([]);

  const getUserChats = async () => {
    try {
      const getChats = await GET<IGroup[]>(USER_GROUP_LIST);
      if (getChats.data?.data) {
        setGroupList(getChats.data?.data);
      }
    } catch (error) {
      console.log("error", error);
      alert(error);
    }
  };
  useEffect(() => {
    getUserChats();
  }, []);

  return (
    <div>
      <br />
      <hr />
      <br />
      <h1 className="text-center font-bold text-3xl">Chats</h1>
      <br />
      <hr />
      <br />
      <div>
        {groupList?.map((group, index) => {
          return (
            <Link
              key={index}
              className="flex gap-4 hover:bg-slate-100 p-2  cursor-pointer"
              href={"chatroom/" + group?._id}
            >
              <div>
                <Image
                  src="/group_avatar_image.jpg"
                  alt="avatar"
                  width={70}
                  height={70}
                  priority
                  className="rounded-full"
                />
              </div>
              <div>
                <h4>{group?.name}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Chats;
