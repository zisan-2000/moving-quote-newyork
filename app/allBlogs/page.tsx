"use client";
import { postdata } from "@/app/data/postdata";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Define the Blog type
interface Blog {
  ID: string;
  post_title: string;
  post_content: string;
  imageUrl?: string;
}

const extractFirstImage = (htmlContent: string): string => {
  const placeholderImage = "https://via.placeholder.com/400x200";
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement?.getAttribute("src") || placeholderImage;
  }
  return placeholderImage;
};

const BlogAll = () => {
  const [blogData, setBlogData] = useState<Blog[]>([]);

  useEffect(() => {
    const processedData = postdata.map((blog) => {
      const imageUrl = extractFirstImage(blog.post_content);
      return {
        ...blog,
        imageUrl,
      };
    });
    setBlogData(processedData);
  }, []);

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-10 text-center">
          All Blogs
        </h2>

        <p className="text-gray-300 mb-10 text-center">
          Explore how our innovative logistics solutions meet your business
          needs.
        </p>
        <div className="text-2xl p-2 text-white text-center">
          Total Blogs: {postdata.length}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <div
              key={blog.ID}
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={blog.imageUrl || ""}
                alt={blog.post_title}
                width={400}
                height={200}
                className="w-full h-36 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                {blog.post_title}
              </h3>
              <div
                className="text-white text-lg"
                dangerouslySetInnerHTML={{
                  __html: blog.post_content.slice(0, 200) + "...",
                }}
              ></div>
              <button className="mt-5 bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors">
                <Link href={`/blogs/${blog.ID}`}>Read More</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogAll;
