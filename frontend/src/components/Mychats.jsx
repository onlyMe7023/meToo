import {
  Avatar,
  Button,
  Circle,
  Flex,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import UserLoading from "./UserLoading";
import { getSender, getSenderInfo } from "../config/ChatLogics";
import Lottie from "react-lottie";
import animationData from "../assets/image/Animation 1.json";
const Mychats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats, fetchAgain } =
    ChatState();
  const [loading, setloading] = useState();
  const toast = useToast();
  const fetchChats = async () => {
    setloading(true);
    try {
      const { data } = await axios.get("http://localhost:6969/chats", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      setChats(data);
      setloading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("UserInfo")));
    fetchChats();
  }, [fetchAgain]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className=" w-full h-dvh border-solid	rounded-3xl flex flex-col items-center justify-center p-6  ">
      {loading ? (
        <div>
          <Lottie options={defaultOptions} width={150} />
        </div>
      ) : (
        <div className="w-full h-dvh flex flex-col items-start  justify-center shadow-2xl shadow-cyan-300  rounded-3xl p-6 ">
          <div className="flex items-center justify-between w-full bg-white">
            <div className="basis-1/3 flex items-center justify-between  text-slate-700	text-xl ">
              <p className=" text-slate-700	text-xl font-medium	"> Sort By:</p>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            </div>
            <div className="flex items-center justify-items-stretch ">
              <p className=" justify-self-end text-slate-700	text-xl font-medium m-2 ">
                Create Chat
              </p>
              <Circle size="25px" bg="darkcyan" color="white">
                <AddIcon />
              </Circle>
            </div>
          </div>
          <Flex
            d="flex"
            flexDir="column"
            p={3}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden">
            {chats ? (
              <Stack overflowY="scroll">
                {chats.map((chat) => (
                  <div
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full min-h-44 flex items-start py-8  px-6 rounded-2xl flex-col mb-4 ${
                      selectedChat === chat ? "bg-[#252525]" : "bg-[#E8E8E8]"
                    } ${selectedChat === chat ? "text-white" : "text-black"}`}
                    key={chat._id}>
                    <div className="flex items-center justify-center  w-full">
                      <Avatar
                        size="lg"
                        mt="12px"
                        name="Prosper Otemuyiwa"
                        src={getSenderInfo(loggedUser, chat.users).pic}
                        cursor={"pointer"}
                      />
                      <div className="flex flex-col justify-cunter items-stretch ml-8  w-full">
                        <div>
                          <Text
                            fontSize="2xl"
                            as="b"
                            className="justify-self-start"
                            cursor={"pointer"}>
                            {!chat.isGroupChat
                              ? getSender(loggedUser, chat.users)
                              : chat.chatName}
                          </Text>
                          <p
                            className={`	text-xl font-medium	${
                              selectedChat === chat
                                ? "text-slate-500"
                                : "text-slate-700"
                            }`}>
                            Offline
                          </p>
                        </div>
                        <p
                          className={`	text-xl font-medium	self-end -mt-7 ${
                            selectedChat === chat
                              ? "text-slate-500"
                              : "text-slate-700"
                          }`}>
                          Last seen 3 hour ago
                        </p>
                      </div>
                    </div>
                    {chat.latestMessage && (
                      <div className=" px-24">
                        <Text fontSize="xl">
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) +
                              "..."
                            : chat.latestMessage.content}
                        </Text>
                      </div>
                    )}
                  </div>
                ))}
              </Stack>
            ) : (
              <UserLoading />
            )}
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Mychats;
