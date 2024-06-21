import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sign from "./pages/Sign";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Chatpages from "./pages/Chatpages";
import { ChatState } from "./Context/ChatProvider";

function App() {
  const navigate = useNavigate();
  const { user, click } = ChatState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate,click]);
  return (
    <>
      <div className="bg-gradient-to-r from-slate-300 bg-cover h-dvh	bg-center bg-no-repeat to-white w-full min-h-full flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Sign />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/chats" element={<Chatpages />} exact />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
