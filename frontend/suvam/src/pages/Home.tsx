import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../utils/api";
import BlogItem from "../components/BlogItem";
const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const blogType = location.pathname.split("/")[1];      
      const { data } =  await fetchBlogs(blogType);
      setBlogs(data);
      setLoading(false);
    };
    getBlogs();
  }, [location.pathname]);

  

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
