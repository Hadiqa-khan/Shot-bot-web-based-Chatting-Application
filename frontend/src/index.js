// Author Name :Hadiqa Khan
// Date of generation : 14 May 2022
// Date of last revision : 16-May-2022
// Version number: 2
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
ReactDOM.render(
     <BrowserRouter>
       <ChatProvider>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </ChatProvider>
    </BrowserRouter>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

 