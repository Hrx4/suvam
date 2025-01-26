import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../utils/api";

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>();

  useEffect(() => {
    const getBlog = async () => {
      const { data } = await fetchBlog(id || "");
      setBlog(data);
    };
    getBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="flex-1 w-full text-center whitespace-pre-wrap overflow-y-scroll p-2">
      <h1 className=" font-bona text-3xl font-bold">{blog.title}</h1>
      <div className=" h-full w-full md:w-11/12">
        {
          blog.image &&
<div className="h-72 w-1/2 ml-auto mr-auto block  pt-5">
<img
          src={blog.image}
          alt="trial"
          className=" h-full w-full"
        />
</div>
        }
        <p className=" text-left px-3 py-5 font-lora ">{blog.content}

        <div className="border-0 border-t border-dotted border-black  mt-4 "></div>

        </p>

      </div>
    </div>
  );
};

export default BlogDetails;
