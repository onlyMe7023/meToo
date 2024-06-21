import { ChatState } from "../Context/ChatProvider";
import meeToo from "../assets/image/meToo.png";
import ProfileHeader from "./userAvatar/ProfileHeader";
import { getSenderInfo } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { FormControl, Input, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../assets/image/Animation";

const ENDPOINT = "http://localhost:6969"; // Adjust according to your backend server address
let socket, selectedChatCompare;

const SingleChat = () => {
  //useState
  const toast = useToast();
  const {
    user,
    selectedChat,
    notification,
    setNotification,
    fetchAgain,
    setfetchAgain,
  } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  //useEffect
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  //continous runing useEffect
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setfetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  //fetchAll the message array
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:6969/message/${selectedChat._id}`,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join room", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      setNewMessage("");
      try {
        const { data } = await axios.post(
          "http://localhost:6969/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "error",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.log(error);
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          {!selectedChat.isGroupChat ? (
            <>
              <ProfileHeader
                userInfo={getSenderInfo(user, selectedChat?.users)}
              />
            </>
          ) : (
            <>
              <ProfileHeader
                userInfo={{
                  name: selectedChat.chatName.toUpperCase(),
                  pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxH-6ZolWIuQXzhmOZztBTjY1Cu1vtg0-fiQ&s",
                }}
              />
              <UpdateGroupChatModal fetchMessages={fetchMessages} />
            </>
          )}

          <div className="w-full h-full flex flex-col items-center justify-end bg-neutral-100 overflow-hidden">
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="basis-9/10 flex flex-col w-full max-h-full items-center justify-self-stretch overflow-y-scroll  ">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <div className="basis-1/10 w-full flex flex-col item-center justify-end ">
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={50}
                    style={{ marginTop: 0, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt={3}
                height="40px">
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  color="black"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  height="100%"
                />
              </FormControl>
            </div>
          </div>
        </>
      ) : (
        <div className=" w-full h-dvh flex items-center justify-center flex-col ">
          <img
            src={meeToo}
            alt="Description"
            style={{
              width: "180px",
              height: "180px",
              display: "inline-block",
            }}
          />
          <p className="text-3xl italic font-semibold tracking-wider">
            Select Any chats to Start Chatting
          </p>
        </div>
      )}
    </>
  );
};

export default SingleChat;
