import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../utils/api";
import BlogItem from "../components/BlogItem";
import { useCookies } from 'react-cookie';
const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['cookie-name']);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const blogType = location.pathname.split("/")[1];
      console.log(blogType);
      
      const { data } =  await fetchBlogs(blogType);
      setBlogs(data);
      setLoading(false);
    };
    getBlogs();
  }, [location.pathname]);

  useEffect(() => {
    // Function to get a specific cookie value by name
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));
      return cookies ? cookies.split("=")[1] : null;
    };
    console.log(cookies);

    // Example: Access a cookie named "userToken"
    const userToken = getCookie("admin_token");
    console.log("User Token:", userToken);
  }, []);

  if (loading) return <p>Loading...</p>;


  return (
    <>
      <div className=" w-full flex-1 pb-4 mt-2 overflow-y-auto ">
        {
          blogs.length===0 ? <p className=" text-2xl font-bold text-center">No blogs Here ;)</p> : null
        }
        {blogs && blogs.slice().reverse().map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Home;
