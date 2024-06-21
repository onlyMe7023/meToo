import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from "./Context/ChatProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
    <ChakraProvider>
      <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);
