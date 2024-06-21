import call from "../../assets/icon/call.svg";
import videoCall from "../../assets/icon/video-call.svg";
import threeDotes from "../../assets/icon/three-dots.svg";
import { motion } from "framer-motion";
import { Avatar, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
const ProfileHeader = ({ userInfo }) => {
  console.log("userInfo:" + userInfo.pic);
  const { click, setclick } = ChatState();
  const handleClick = () => {
    setclick(!click);
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4 w-full border-2	border-b-gray  border-t-white border-l-white border-r-white   ">
        <div className="flex items-center justify-center ">
          <Avatar
            size="xl"
            name="Prosper Otemuyiwa"
            src={userInfo.pic}
            onClick={handleClick}
            cursor={"pointer"}
          />
          <div className="flex flex-col justify-items-start ml-6">
            <Text
              fontSize="2xl"
              as="b"
              className="justify-self-start"
              onClick={handleClick}
              cursor={"pointer"}>
              {userInfo.name}
            </Text>
            <p className=" text-slate-700	text-xl font-medium	">
              Offline <ChevronRightIcon /> Last seen 3 hour ago
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-12">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <img
              src={call}
              alt="Description"
              style={{
                width: "25px",
                height: "25px",
                display: "inline-block",
              }}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <img
              src={videoCall}
              alt="Description"
              style={{
                width: "25px",
                height: "25px",
                display: "inline-block",
              }}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <img
              src={threeDotes}
              alt="Description"
              style={{
                width: "25px",
                height: "25px",
                display: "inline-block",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
