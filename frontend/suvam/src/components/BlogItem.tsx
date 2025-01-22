import React from "react";
import { Link } from "react-router-dom";
interface BlogItemProps {
  blog: { _id: string; title: string; content : string , image : string};
}
// to={`/blogs/${blog._id}`}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => (
  <div
    
    className=" w-1/2 bg-red-300 p-2 min-h-36 mt-2 ml-auto mr-auto border border-black rounded-md cursor-pointer"
  >
    <Link to={`/blogs/${blog._id}`}>
    <span className=" text-xl font-semibold ">{blog.title}</span>
    <div className=" flex gap-2 ">
      <p className="  line-clamp-4">
         {blog.content}
      </p>
      {
        blog.image && <img src={blog.image} alt="trial" className=" h-24 w-24 ml-auto" />
      }
    </div>
    </Link>
  </div>
);

export default BlogItem;
