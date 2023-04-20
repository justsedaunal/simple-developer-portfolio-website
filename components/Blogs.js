import React, { useState, useEffect } from "react";
import axios from "axios";

function Blogs() {
  const mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@justsedaunal";
  const [profile, setProfile] = useState({
    name: "Seda Unal",
    profileImage: "",
    profileUrl: "",
  });
  const [blog, setBlog] = useState({ item: [], isLoading: true, error: null });
  useEffect(() => {
    axios
      .get(mediumURL)
      .then((info) => {
        console.log(info);
        const image = info.data.feed.image;
        const link = info.data.feed.link;
        const blogs = info.data.items;
        const posts = blogs.filter((post) => post.categories.length > 0);
        setProfile((p) => ({ ...p, profileUrl: link, profileImage: image }));
        setBlog({ item: blogs.splice(0, 6), isLoading: false });
      })
      .catch((err) => setBlog({ error: err.message }));
  }, [axios]);

  const haveBlogs = () => {
    console.log(blog);
    if (blog.item) {
      return blog.item.map((post, index) => (
        <div>
          <p className=""> {post.title} </p>
          <a
            href={post.link}
            class="font-semibold group flex flex-row space-x-2 w-full items-center"
          >
            <p>View Blog </p>
            <div class="transform group-hover:translate-x-2 transition duration-300">
              →
            </div>
          </a>
        </div>
      ));
    }
  };

  return (
    <div className="bg-[#F1F1F1] -mt-40 dark:bg-gray-900 pb-40">
      <div className="max-w-6xl mx-auto ">
        <div className="flex flex-col md:flex-row justify-between items-center md:pt-40 mx-10" >

        </div>
        <h1 className="text-6xl lg:text-9xl max-w-lg font-bold text-gray-500 my-20 md:my-0 md:text-white dark:text-gray-600 text-center lg:text-left">
          Latest Blogs
        </h1>
        <div className="bg-[#F1F1F1] -mt-40 dark:bg-gray-900 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-10 lg:-mt-10 gap-y-20">
            {" "}
            {blog.isLoading ? "Loading..." : haveBlogs()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
