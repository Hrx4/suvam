import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddBlog = () => {
  const location = useLocation();
  const { blog: blogState } = location.state || {};
  const { edit } = location.state || false;
  const [title, setTitle] = useState(blogState?.title || "");
  const [blogType, setBlogType] = useState(blogState?.blogType || "fictional");
  const [content, setContent] = useState(blogState?.content || "");
  const [image, setImage] = useState(blogState?.image || null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const ref: any = useRef(null);

  const handleTitleChange = (e: any) => setTitle(e.target.value);
  const handleContentChange = (e: any) => setContent(e.target.value);
  const handleBlogTypeChange = (e: any) => setBlogType(e.target.value);
  const handleImageChange = (e: any) => setImage(e.target.files[0]);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("blogType", blogType);
    if (image) {
      formData.append("image", image);
    }
    console.log(formData.get("content"));

    try {
      const response = await fetch(
        "https://suvam-svwu.vercel.app/api/createData",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Data created successfully!");
        setTitle("");
        setContent("");
        setBlogType("fictional");
        setImage(null);
        if (ref.current) ref.current.value = "";
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
    setLoading(false);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("blogType", blogType);
    if (typeof image === "string") {
      formData.append("existimage", image);
    } else if (image) {
      formData.append("image", image);
    }
    console.log(formData.get("content"));

    try {
      const response = await fetch(
        `https://suvam-svwu.vercel.app/api/blogs/${blogState._id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Data created successfully!");
        setTitle("");
        setContent("");
        setBlogType("fictional");
        setImage(null);
        if (ref.current) ref.current.value = "";
        navigate("/fictional");
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-2">
      <h2 className="text-2xl font-semibold mb-6">
        {edit ? "Edit Entry" : "Create New Entry"}
      </h2>
      <form onSubmit={edit ? handleEdit : handleCreate}>
        {/* Title Field */}
        <div className="mb-4">
          <select
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={blogType}
            onChange={handleBlogTypeChange}
          >
            <option value="fictional">Fictional</option>
            <option value="non-fictional">Non-fictional</option>
          </select>
        </div>
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Content Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={handleContentChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            required
          ></textarea>
        </div>

        {/* Image Field (Optional) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            ref={ref}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {edit ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
