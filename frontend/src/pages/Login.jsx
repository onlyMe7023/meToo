import { motion } from "framer-motion";
import userIcon from "../assets/icon/user icon.svg";
import lock from "../assets/icon/lock.svg";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import bg from "../assets/image/bg3.png";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);
  const submitHandler = async () => {
    setloading(true);
    if (!email || !password) {
      toast.error("fill all feilds ", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setloading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:6969/login",
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      toast.success("Congratulation", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("UserInfo", JSON.stringify(data));
      navigate("/chats");
      setloading(false);
    } catch (error) {
      toast.error("Something Was Wrong", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setloading(false);
    }
  };
  return (
    <div className="bg-[#fff] max-w-6xl	 w-full m-10	border-solid	rounded-3xl	 shadow-[1px_1px_80px_1px_rgba(0,0,0,0.1)] flex flex-col items-center justify-around p-10 md:max-w-7xl md:flex-row">
      <div
        className="hidden md:basis-1/2  md:w-full md:flex item-center justify-center bg-contain	bg-center bg-no-repeat w-[32rem]	h-[42rem]"
        style={{ backgroundImage: `url(${bg})` }}>
        <a
          href="/"
          className="underline underline-offset-1 text-slate-700 text-2xl font-[Poppins] self-end">
          Craete a Account
        </a>
      </div>
      <div className="w-full flex flex-col items-center justify-around md:basis-1/2">
        <div className="my-10 md:w-full">
          <h1 className="text-5xl font-extrabold font-[Poppins]">Login</h1>
        </div>
        <div className="w-full flex flex-col items-center justify-between">
          <div className="relative w-full m-7">
            <input
              id="fullName"
              name="fullName"
              autoComplete="off"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="text"
              className="peer h-10 w-full border-b focus:border-b-2 border-[#999999] bg-[#fff] text-[#000] focus:outline-none text-xl placeholder-transparent focus:border-[#999999] font-[Poppins]"
              placeholder="hospitalname"
            />
            <label
              htmlFor="hospitalname"
              className="absolute text-[#999999] left-0 -top-8 text-lg	  peer-placeholder-shown:text-xl peer-placeholder-shown:text-[#999999] transition-all peer-placeholder-shown:-top-0 font-[Poppins] peer-focus:-top-12 peer-focus:text-[#999999] peer-focus:text-xs">
              <img
                src={userIcon}
                alt="Description"
                style={{
                  width: "18px",
                  height: "18px",
                  display: "inline-block",
                }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Full Name
            </label>
          </div>
          <div className="relative w-full m-7">
            <input
              id="fullName"
              name="fullName"
              autoComplete="off"
              type="text"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="peer h-10 w-full border-b focus:border-b-2 border-[#999999] bg-[#fff] text-[#000] focus:outline-none text-xl placeholder-transparent focus:border-[#999999] font-[Poppins]"
              placeholder="hospitalname"
            />
            <label
              htmlFor="hospitalname"
              className="absolute text-[#999999] left-0 -top-8 text-lg	  peer-placeholder-shown:text-xl peer-placeholder-shown:text-[#999999] transition-all peer-placeholder-shown:-top-0 font-[Poppins] peer-focus:-top-12 peer-focus:text-[#999999] peer-focus:text-xs">
              <img
                src={lock}
                alt="Description"
                style={{
                  width: "18px",
                  height: "18px",
                  display: "inline-block",
                }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Enter Password
            </label>
          </div>
        </div>
        <div className="w-full flex items-center my-8 ">
          <input type="checkbox" name="checkbox" className="me-8 text-2xl" />
          <p className="inline-block text-2xl font-[Poppins]">
            Remember Me&nbsp;&nbsp;
          </p>
        </div>
        <div className="w-full flex items-center justify-center  text-2xl">
          <motion.button
            whileTap={{ scale: 0.85 }}
            className=" bg-sky-500 cursor-pointer	rounded-lg py-[1rem] px-[2rem] text-white	 hover:bg-sky-700 w-48 h-full"
            onClick={submitHandler}>
            {loading ? (
              <Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            ) : (
              <p>login</p>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Login;
