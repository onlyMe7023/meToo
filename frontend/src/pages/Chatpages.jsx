import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import Mychats from "../components/Mychats";
import ProfileModel from "../components/userAvatar/ProfileModel";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
const Chatpages = () => {
  const { user, click, fetchAgain } = ChatState();
  useEffect(() => {}, [fetchAgain]);
  return (
    <div className="bg-[#fff] w-full h-dvh  flex items-center justify-around ">
      <div className="basis-1/3 w-full  flex ustify-items-stretch  items-center">
        {user && <SideDrawer />}
        {user && <Mychats />}
      </div>
      <div className="basis-2/3 w-full  flex item-center justify-center h-full">
        {user && <ChatBox />}
        {user && click && <ProfileModel />}
      </div>
    </div>
  );
};

export default Chatpages;
