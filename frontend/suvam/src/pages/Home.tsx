import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../utils/api";
import BlogItem from "../components/BlogItem";

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const { data } = await fetchBlogs();
      setBlogs(data);
      setLoading(false);
    };
    getBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;


  return (
    <>
      <div className=" w-full max-h-[620px] mt-2 overflow-y-scroll ">

        {blogs && blogs.map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Home;
