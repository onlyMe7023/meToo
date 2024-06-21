import notificationIcon from "../assets/icon/notification.svg";
import chat from "../assets/icon/chat.svg";
import setting from "../assets/icon/setting.svg";
import searchSvg from "../assets/icon/search.svg";
import notificationIconAlt from "../assets/icon/notificationIconAlt.svg";
import logout from "../assets/icon/logout.svg";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { Tooltip } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserLoading from "./UserLoading";
import UserListItem from "./userAvatar/UserListItem";
import GroupChatModal from "./GroupChatModal";
import { getSender, getSenderInfo } from "../config/ChatLogics";

const SideDrawer = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    user,
    click,
    setclick,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const btnRef = React.useRef();

  const handleClick = () => {
    setclick(!click);
  };
  const logoutHandler = () => {
    localStorage.removeItem("UserInfo");
    navigate("/");
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "please Enter something in search",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "bottom-center",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:6969?search=${search}`,
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      setLoading(false);
      setSearchResult(data);
      setSearch("");
    } catch (error) {
      console.log(error.massage);
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-center",
      });
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post(
        `http://localhost:6969/chats`,
        { userId },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!chats.find((c) => c.id) === data._id) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "error fatching chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const hasNotifications = notification.length > 0;
  const iconSrc = hasNotifications ? notificationIconAlt : notificationIcon;

  return (
    <div className="bg-[#262727] w-28 h-dvh border-solid	rounded-r-full flex flex-col items-center justify-self-start p-8 ">
      <div className="basis-1/4 flex items-center justify-center ">
        <Menu>
          <Tooltip
            hasArrow
            label="View Profile"
            bg="white"
            color={"gray"}
            fontSize="xl">
            <MenuButton>
              <Avatar name="Dan Abrahmov" src={user.pic} cursor="pointer">
                <AvatarBadge boxSize="1em" bg="green.500" border="none" />
              </Avatar>
            </MenuButton>
          </Tooltip>
          <MenuList>
            <MenuItem width="100%" onClick={handleClick}>
              <Flex gap="3">
                <Avatar name="Dan Abrahmov" src={user.pic} cursor="pointer">
                  <AvatarBadge boxSize="1em" bg="green.500" border="none" />
                </Avatar>
                <Spacer />
                <Center color="gray" fontSize="lg">
                  My Account
                </Center>
              </Flex>
            </MenuItem>
            <MenuDivider sx={{ borderWidth: "2px" }} />
            <MenuItem pl={6}>
              <Flex gap="3">
                <img
                  src={setting}
                  alt="Description"
                  style={{
                    width: "16px",
                    height: "16px",
                    display: "inline-block",
                  }}
                />
                <Spacer />
                <Center color="gray" fontSize="lg">
                  setting
                </Center>
              </Flex>{" "}
            </MenuItem>
            <MenuItem pl={6} onClick={logoutHandler}>
              <Flex gap="3">
                <img
                  src={logout}
                  alt="Description"
                  style={{
                    width: "16px",
                    height: "16px",
                    display: "inline-block",
                  }}
                />
                <Spacer />
                <Center color="gray" fontSize="lg">
                  Logout
                </Center>
              </Flex>{" "}
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="flex flex-col items-center justify-around basis-1/2 ">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <img
            src={searchSvg}
            alt="Description"
            style={{
              width: "32px",
              height: "32px",
              display: "inline-block",
            }}
            onClick={onOpen}
          />
        </motion.div>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="sm">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize="3xl">Find Friend's </DrawerHeader>{" "}
            <DrawerBody>
              <HStack mb={5}>
                <Center color="gray" sx={{ width: "100%" }}>
                  <Input
                    placeholder="Search by Name or Email"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </Center>
                <Center
                  w="50px"
                  h="25px"
                  bg="darkcyan"
                  color="white "
                  borderRadius="md"
                  onClick={handleSearch}
                  cursor={"pointer"}>
                  <Box as="span" fontWeight="bold" fontSize="lg">
                    GO
                  </Box>
                </Center>
              </HStack>
              <Divider
                sx={{ borderColor: "gray", borderWidth: "1px" }}
                mb={5}
                borderRadius={5}
              />
              {loading ? (
                <UserLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              <Center>
                <Box w="50px" h="50px">
                  {loadingChat && (
                    <motion.div
                      className="bg-[#272627] w-full h-full"
                      animate={{
                        scale: [0.5, 1, 1, 0.5, 0.5],
                        rotate: [0, 0, 180, 180, 0],
                        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 0.2,
                      }}></motion.div>
                  )}
                </Box>
              </Center>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <img
            src={chat}
            alt="Description"
            style={{
              width: "32px",
              height: "32px",
              display: "inline-block",
            }}
          />
        </motion.div>
        <GroupChatModal />
        <Menu>
          <Tooltip
            hasArrow
            label="View Profile"
            bg="white"
            color={"gray"}
            fontSize="xl">
            <MenuButton>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <img
                  src={iconSrc}
                  alt="Description"
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "inline-block",
                  }}
                />
              </motion.div>
            </MenuButton>
          </Tooltip>
          <MenuList>
            <Center width="100%">
              {!notification.length && "No New Message"}
            </Center>
            {notification.map((notif) => (
              <MenuItem
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}>
                {notif.chat.isGroupChat ? (
                  <>
                    <Flex gap="3">
                      <Avatar
                        name="Dan Abrahmov"
                        src={user.pic}
                        cursor="pointer">
                        <AvatarBadge
                          boxSize="1em"
                          bg="green.500"
                          border="none"
                        />
                      </Avatar>
                      <Spacer />
                      <Center color="gray" fontSize="lg">
                        New Message in {notif.chat.chatName}
                      </Center>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex gap="3">
                      <Avatar
                        name="Dan Abrahmov"
                        src={getSenderInfo(user, notif.chat.users).pic}
                        cursor="pointer">
                        <AvatarBadge
                          boxSize="1em"
                          bg="green.500"
                          border="none"
                        />
                      </Avatar>
                      <Spacer />
                      <Center color="gray" fontSize="lg">
                        New Message from {getSender(user, notif.chat.users)}
                      </Center>
                    </Flex>
                  </>
                )}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <div className="basis-1/4 flex items-center justify-center">
        <img
          src={setting}
          alt="Description"
          style={{
            width: "32px",
            height: "32px",
            display: "inline-block",
          }}
        />
      </div>
    </div>
  );
};

export default SideDrawer;
