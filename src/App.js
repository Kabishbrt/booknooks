import React, { useEffect } from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./Home";
import { ExploreBooks } from "./ExploreBooks";
import { Login } from "./Login";
import { Cart } from "./Cart";
import { Signup } from "./Signup";
import { Orders } from "./Orders";
import { Contact } from "./Contact";
import { Provider } from 'react-redux';
import store from './Store';
import { fetchBooks } from "./Actions/bookActions";
import { Book } from "./Book";
import { getStoredToken } from "./Actions/authActions";
import { Init } from "./Init";

const App = () => {
  const theme = {
    colors: {
      black: "black",
      helper: "#267bb8",
      cart: "red",
      grey: "grey",
      price: "black",
      white: "#fff",
      bg: "#F6F8FA",
      featbg: "rgb(246 246 246)",
      cardbg: "white",
      productpagebg: "#f8f7f7",
      logbtn: "#6366eb",
      footer_bg: "#0a1435",
      btn: "red",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(Ødeg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  }



  
return (
<Provider store = {store}>
<ThemeProvider theme={theme}>
<Router>
    <GlobalStyle/>
    <Init/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/explore" element={<ExploreBooks/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/orders" element={<Orders/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/book/:title" element={<Book/>} />
    </Routes> 
    <Footer/>
</Router>
</ThemeProvider>
</Provider>
)
};

export default App;
