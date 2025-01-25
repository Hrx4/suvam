import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Navbar from "./components/Navbar";
import AddBlog from "./pages/AddBlog";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";

const App: React.FC = () => {

  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [loginPage, setloginPage] = useState(false)


  return (
    <>
      <div className=" h-dvh w-full flex flex-col">
      <Router>
      <Navbar />

      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} loginPage={loginPage} setloginPage={setloginPage} />

        <Routes>
          <Route path="/fictional" element={<Home />} />
          <Route path="/non-fictional" element={<Home />} />
          <Route path="/addblog" element={<AddBlog />}  />
          <Route path="/editblog" element={<AddBlog />}  />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login loginPage={loginPage} setloginPage={setloginPage}/>}/>
        </Routes>
      </Router>
      </div>
    </>
  );
};

export default App;
