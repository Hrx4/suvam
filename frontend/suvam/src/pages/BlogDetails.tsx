import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../utils/api";

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>({
    _id: "1",
    title: "Blog 1",
    content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, soluta quo vero perspiciatis tempore pariatur quis a earum nihil fuga maxime. Debitis, distinctio quos vitae soluta expedita omnis eius libero iure esse culpa ipsum, commodi cumque? Est laborum consequuntur aliquam quasi quas earum dolores, dolorum animi nostrum quibusdam, dolore quisquam voluptatum. Iusto libero officia dolorem quasi explicabo namsequi, quidem facere aliquam deserunt modi eos, accusantium quam quis quisquam laborum ad eius dolorum iste! Esse dolores sunt autem. Atquesapiente labore obcaecati officia voluptate magni quibusdam dicta?
        Tempora atque inventore eligendi rerum corrupti obcaecati perferendis id qui sed, consequatur, distinctio suscipit temporibus! Distinctio debitis provident natus neque animi error, modi dolore cupiditate, amet iure cum nihil, tempora dolorem. Voluptatem inventore, quisquam at delectus a
        minus earum dolor nihil architecto, quaerat ut consequuntur repellendus quis, ducimus aperiam cum nulla porro repudiandae! Tenetur temporibus, nam consectetur facilis ut sapiente aspernatur voluptatem corrupti vel
        voluptatibus, vitae tempora  illo recusandae ad illum modi aliquam! Ipsa
        facere sunt et, molestiae voluptate eaque delectus cumque dolorem nulla
        laudantium blanditiis hic eligendi culpa maiores officiis. Minima
        ratione blanditiis fuga odit distinctio, iste harum, quos quaerat quidem
        voluptates, at explicabo accusamus. Itaque, facere sapiente rerum
        quisquam illum repudiandae!`,
    author: "John Doe",
  });

  useEffect(() => {
    const getBlog = async () => {
      const { data } = await fetchBlog(id || "");
      setBlog(data);
    };
    getBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-h-[620px] w-full text-center whitespace-pre-wrap overflow-y-scroll p-2">
      <h1 className=" text-2xl font-bold">{blog.title}</h1>
      <div className=" h-full w-full">
        {
          blog.image &&
          <img
          src={blog.image}
          alt="trial"
          className=" h-60 w-1/2 ml-auto mr-auto block  pt-5"
        />
        }
        <p className=" text-left pt-5">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
