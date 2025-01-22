import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Navbar from "./components/Navbar";
import AddBlog from "./pages/AddBlog";

const App: React.FC = () => {
  return (
    <>
      <div className=" h-dvh w-full flex flex-col">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<AddBlog />}  />
          <Route path="/editblog" element={<AddBlog />}  />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Router>
      </div>
    </>
  );
};

export default App;
