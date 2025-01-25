import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface BlogItemProps {
  blog: { _id: string; title: string; content: string; image: string };
}
// to={`/blogs/${blog._id}`}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  const navigate = useNavigate();

  const handleGoBlog = () => {
    navigate(`/blogs/${blog._id}`);
  };

  const handleNavigate = () => {
    navigate(`/editblog`, { state: { blog, edit: true } });
  };

  const handleDelete = async () => {
    await fetch(`https://suvam-svwu.vercel.app/api/blogs/${blog._id}`, {
      credentials : "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    console.log("delete");
    window.location.reload();
  };

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
      // Function to get a specific cookie value by name
      const getCookie = (name: string): string | null => {
        const cookies = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`));
        return cookies ? cookies.split("=")[1] : null;
      };
  
      // Example: Access a cookie named "userToken"
      const userToken = getCookie("admin_token");
      setToken(userToken);
      console.log("User Token:", userToken);
    }, []);

  return (
    <div className=" lg:w-1/2 md:w-2/3 w-11/12 p-2 min-h-36 mt-2 ml-auto mr-auto shadow-customMedium  rounded-md ">
      <div className={`justify-end gap-4 ${token ? "flex" : "hidden"}`}>
        <button onClick={handleNavigate}>
          <EditIcon />
        </button>
        <button onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
      <div className=" cursor-pointer" onClick={handleGoBlog}>
        <span className=" text-xl font-extrabold">{blog.title}</span>
        <div className=" flex gap-2 ">
          <p className="  line-clamp-4">{blog.content}</p>
          {blog.image && (
            <img src={blog.image} alt="trial" className=" h-24 w-24 ml-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 text-green-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 text-red-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

export default BlogItem;
