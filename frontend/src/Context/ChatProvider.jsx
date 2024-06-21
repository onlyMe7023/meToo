import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();


const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [fetchAgain, setfetchAgain] = useState(false);
  const [click, setclick] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    console.log(window.location.pathname);
    setUser(userInfo);
    if (!userInfo) {
      if (window.location.pathname === "/login") {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        fetchAgain,
        setfetchAgain,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        click,
        setclick,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
