import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../utils/api";
import BlogItem from "../components/BlogItem";

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([
    {
      _id: "1",
      title: "Blog 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      author: "John Doe",
    },
    {
      _id: "2",
      title: "Blog 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      author: "John Doe",
    },
    {
      _id: "3",
      title: "Blog 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      author: "John Doe",
    },
    {
      _id: "4",
      title: "Blog 4",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      author: "John Doe",
    },
    {
      _id: "5",
      title: "Blog 5",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      author: "John Doe",
    },
    {
      _id: "6",
      title: "Blog 6",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      author: "John Doe",
    },
    {
      _id: "7",
      title: "Blog 7",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      author: "John Doe",
    },
    {
      _id: "8",
      title: "Blog 8",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      author: "John Doe",
    },
  ]);

  useEffect(() => {
    const getBlogs = async () => {
      const { data } = await fetchBlogs();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  return (
    <>
      <div className=" w-full max-h-[620px] mt-2 overflow-y-scroll ">
        {blogs.map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Home;
