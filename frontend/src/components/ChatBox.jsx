import { Avatar, Text } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { ChevronRightIcon } from "@chakra-ui/icons";
import call from "../assets/icon/call.svg";
import videoCall from "../assets/icon/video-call.svg";
import threeDotes from "../assets/icon/three-dots.svg";
import { motion } from "framer-motion";
import SingleChat from "./SingleChat";
const ChatBox = () => {
  const { user } = ChatState();
  return (
    <div className=" w-full h-svh border-solid	rounded-3xl flex flex-col items-center justify-center p-6  ">
      <div className="w-full h-svh flex flex-col items-start  justify-start shadow-2xl shadow-cyan-400  rounded-3xl p-6 ">
        <SingleChat />
      </div>
    </div>
  );
};

export default ChatBox;
