import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <div className=" bg-neutral-100 w-full p-4 ">
      {messages &&
        messages.map((m, i) => (
          <div className="flex items-center " key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mb="-18px"
                  mr={1}
                  size="md"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#45d7b7" : "#fff"
                }`,
                color: `${m.sender._id === user._id ? "#fff" : "#000"}`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                padding: "5px 15px",
                maxWidth: "50%",
              }}
              className={`text-xl ${
                m.sender._id === user._id
                  ? "rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                  : "rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white shadow-[0_18px_50px_rgba(0,_0,_0,_0.2)]"
              }`}>
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
