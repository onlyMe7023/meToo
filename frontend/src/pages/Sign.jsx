import { motion } from "framer-motion";
import userIcon from "../assets/icon/user icon.svg";
import mail from "../assets/icon/mail.svg";
import { useNavigate } from "react-router-dom";
import lock from "../assets/icon/lock.svg";
import { Spinner } from "@chakra-ui/react";
import bg from "../assets/image/bg.webp";
import upload from "../assets/icon/upload.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
//main function
const Sign = () => {
  const navigate = useNavigate();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmPassword] = useState();
  const [pic, setpic] = useState();
  const [loading, setloading] = useState(false);
  //this function handle click imput whick is hidden
  const UploadPic = () => {
    document.getElementById("profilePic").click();
  };
  //this function handle post the image to cloudnary and receive a online woeking string
  const postDetails = (pics) => {
    setloading(true);
    //if pic not defind
    if (pics === undefined) {
      toast.info("select image", {
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
    //if image format is right then post in cloudnary
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      document.getElementById("btn").innerText = `${pics.name}`;
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "iSeend");
      data.append("cloud_name", "dbsft5jx6");
      fetch("https://api.cloudinary.com/v1_1/dbsft5jx6/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setpic(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      toast.info("select image", {
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
  };
  const submitHandler = async () => {
    setloading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast.error("password do not match", {
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
        "http://localhost:6969/",
        { name, email, password, pic },
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
      toast.error("your profile is no create ", {
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
    <div className="bg-[#fff] max-w-6xl 		 w-full m-10	border-solid	rounded-3xl	 shadow-[1px_1px_80px_1px_rgba(0,0,0,0.1)] flex flex-col items-center justify-around p-10 md:max-w-7xl md:flex-row">
      <div className="w-full flex flex-col items-center justify-around md:basis-1/2">
        <div className="my-10 md:w-full">
          <h1 className="text-5xl font-extrabold font-[Poppins]">Sign up</h1>
        </div>
        <div className="w-full flex flex-col items-center justify-between">
          <div className="relative w-full m-7">
            <input
              id="name"
              name="name"
              autoComplete="off"
              type="text"
              onChange={(e) => {
                setname(e.target.value);
              }}
              className="peer h-12 w-full border-b focus:border-b-2 border-[#999999] bg-[#fff] text-[#000] focus:outline-none text-xl placeholder-transparent focus:border-[#999999] font-[Poppins]"
              placeholder="fullName"
            />
            <label
              htmlFor="name"
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
              id="email"
              name="email"
              autoComplete="off"
              type="text"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="peer h-10 w-full border-b focus:border-b-2 border-[#999999] bg-[#fff] text-[#000] focus:outline-none text-xl placeholder-transparent focus:border-[#999999] font-[Poppins]"
              placeholder="email"
            />
            <label
              htmlFor="email"
              className="absolute text-[#999999] left-0 -top-8 text-lg	  peer-placeholder-shown:text-xl peer-placeholder-shown:text-[#999999] transition-all peer-placeholder-shown:-top-0 font-[Poppins] peer-focus:-top-12 peer-focus:text-[#999999] peer-focus:text-xs">
              <img
                src={mail}
                alt="Description"
                style={{
                  width: "18px",
                  height: "18px",
                  display: "inline-block",
                }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Email
            </label>
          </div>
          <div className="relative w-full m-7">
            <input
              id="password"
              name="password"
              autoComplete="off"
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="peer h-10 w-full border-b focus:border-b-2 border-[#999999] bg-[#fff] text-[#000] focus:outline-none text-xl placeholder-transparent focus:border-[#999999] font-[Poppins]"
              placeholder="password"
            />
            <label
              htmlFor="password"
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password
            </label>
          </div>
          <div className="relative w-full m-7">
            <input
              id="confirmPassword"
              name="confirmpassword"
              autoComplete="off"
              type="password"
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
              className="peer h-10 w-full border-b focus:border-b-2 border-[#999999] bg-[#fff] text-[#000] focus:outline-none text-xl placeholder-transparent focus:border-[#999999] font-[Poppins]"
              placeholder="confirmPassword"
            />
            <label
              htmlFor="confirmPassword"
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Repeat Your Password
            </label>
          </div>
          <div onClick={UploadPic} className="min-h-12 ">
            <div
              className="reletive border-dotted	text-xl cursor-pointer border-2 border-[#717775] rounded-md min-w-96 h-12 text-[#717775] flex justify-center items-center min-h-12"
              id="btn">
              <img
                src={upload}
                alt="Description of the image"
                className="w-6 h-6 mx-2"
              />
              Click to upload a file
            </div>
            <input
              id="profilePic"
              name="profilePic"
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e != null) {
                  postDetails(e.target.files[0]);
                  setpic(e.target.value);
                }
              }}
              accept="image/*"
            />
          </div>
        </div>
        <div className="w-full flex items-center my-8 ">
          <input type="checkbox" name="checkbox" className="me-8 text-2xl" />
          <p className="inline-block text-2xl font-[Poppins]">
            I agree all statements in&nbsp;&nbsp;
            <a
              href="/"
              className="underline underline-offset-1 text-sky-400/100 text-2xl font-[Poppins]">
              Terms of service
            </a>
          </p>
        </div>
        <div className="w-full flex items-center justify-center  text-2xl h-16">
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
              <p>Register</p>
            )}
          </motion.button>
        </div>
      </div>
      <div
        className="hidden md:basis-1/2  md:w-full md:flex item-center justify-center bg-contain	bg-center bg-no-repeat w-[32rem]	h-[32rem]"
        style={{ backgroundImage: `url(${bg})` }}>
        <a
          href="/login"
          className="underline underline-offset-1 text-slate-700 text-2xl font-[Poppins] self-end -mb-10">
          i am already member
        </a>
      </div>
    </div>
  );
};

export default Sign;
