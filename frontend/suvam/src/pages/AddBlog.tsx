import { useRef, useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const ref :any = useRef(null);

  const handleTitleChange = (e:any) => setTitle(e.target.value);
  const handleContentChange = (e:any) => setContent(e.target.value);
  const handleImageChange = (e:any) => setImage(e.target.files[0]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    console.log(formData.get("content"));

    try {
      const response = await fetch("http://localhost:5000/api/createData", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Data created successfully!");
        setTitle("");
        setContent("");
        setImage(null);
        if(ref.current) ref.current.value = "";
        alert("Failed to create data.");
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-2">
      <h2 className="text-2xl font-semibold mb-6">Create New Entry</h2>
      <form onSubmit={handleSubmit}>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
