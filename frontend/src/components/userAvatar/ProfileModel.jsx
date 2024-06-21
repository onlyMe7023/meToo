import facebook from "../../assets/icon/facebook.svg";
import instagram from "../../assets/icon/instagram.svg";
import twitter from "../../assets/icon/twitter.svg";
import demo from "../../assets/image/demo1.jpg";
import demo1 from "../../assets/image/demo2.jpg";
import demo2 from "../../assets/image/demo3.jpg";
import wrong from "../../assets/icon/wrong.svg";
import { ChatState } from "../../Context/ChatProvider";
import { getSenderInfo } from "../../config/ChatLogics";

const ProfileModel = () => {
  const { user, click, setclick, selectedChat } = ChatState();
  const handle = () => {
    setclick(!click);
  };
  const userInfo = selectedChat ? getSenderInfo(user, selectedChat.users) : user;

  console.log(userInfo);
  return (
    <div className="bg-[#fff] w-[50rem] h-full flex flex-col items-center justify-around p-8 ">
      <div className="w-full">
        <img
          src={wrong}
          alt="Description"
          style={{
            width: "32px",
            height: "32px",
            display: "inline-block",
          }}
          className="float-right	"
          onClick={handle}
        />{" "}
      </div>
      <div className="w-full min-h-56  flex items-center justify-center flex-col ">
        <div className="w-56 h-56 rounded-full flex items-center justify-center bg-[#28e596] mb-6 overflow-hidden	">
          <img
            src={userInfo.pic}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="Description"
          />
        </div>
        <h1 className="text-6xl font-[Caveat] font-extrabold ">
          {userInfo.name}
        </h1>
        <p className="text-[#5d5d5c] text-2xl mb-8">Jaipur,Rajasthan</p>
        <p className="text-xl font-[Poppins]">
          Help people to build Websites and apps🔥🔥
        </p>
        <div className="flex items-center justify-between w-full px-24 p-12">
          <img
            src={facebook}
            alt="Description"
            style={{
              width: "32px",
              height: "32px",
              display: "inline-block",
            }}
          />{" "}
          <img
            src={instagram}
            alt="Description"
            style={{
              width: "32px",
              height: "32px",
              display: "inline-block",
            }}
          />{" "}
          <img
            src={twitter}
            alt="Description"
            style={{
              width: "32px",
              height: "32px",
              display: "inline-block",
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full rounded-full  shadow-[1px_1px_80px_1px_rgba(0,0,0,0.1)]  p-2">
          <div className="text-2xl">
            <span className="inline-block mr-4 text-[#5d5d5c]"> Phone :</span>
            <span>+917023886544</span>
          </div>
          <div className="text-2xl">
            <span className="inline-block  text-[#5d5d5c]"> Email :</span>
            <span>{userInfo.email}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-around w-full border-[#5d5d5c]  min-h-56  rounded-2xl shadow-[1px_1px_80px_1px_rgba(0,0,0,0.1)] p-6 ">
        <div className="flex items-end justify-between w-full">
          <p className="text-xl text-[#5d5d5c] ">Media(31)</p>
          <p className=" text-xl text-[#5d5d5c] ]">See all :</p>
        </div>
        <div className="w-full flex item-center justify-between">
          <img
            src={demo}
            alt="Description"
            style={{
              width: "90px",
              height: "90px",
              display: "inline-block",
            }}
          />
          <img
            src={demo2}
            alt="Description"
            style={{
              width: "90px",
              height: "90px",
              display: "inline-block",
            }}
          />
          <img
            src={demo1}
            alt="Description"
            style={{
              width: "90px",
              height: "90px",
              display: "inline-block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
