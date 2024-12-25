"use client";
import { useEffect, useState } from "react";
import { postdata } from "@/app/data/postdata";
import Link from "next/link";
import Image from "next/image"; // Import Image component from Next.js

// Define the Blog type
interface Category {
  id: number;
  name: string;
}

interface Blog {
  ID: number;
  post_author: string;
  name: string; // Make sure name is always a string
  category: Category;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: string;
  guid: string;
  menu_order: string;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  imageUrl: string;
}

// Function to extract the first image's src from the post_content
const extractFirstImage = (htmlContent: string): string => {
  const placeholderImage = "https://via.placeholder.com/400x200";
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement
      ? imgElement.getAttribute("src") ?? placeholderImage
      : placeholderImage;
  }
  return placeholderImage;
};

const BlogSection = () => {
  const [blogCards, setBlogCards] = useState<Blog[]>([]);

  useEffect(() => {
    // Process postdata client-side to extract images
    const processedData: Blog[] = postdata.slice(1, 4).map((blog) => ({
      ID: Number(blog.ID), // Ensure ID is a number
      post_author: blog.post_author,
      name: blog.name ?? "Unnamed Post", // Provide a fallback value for name
      category: blog.category,
      post_date: blog.post_date,
      post_date_gmt: blog.post_date_gmt,
      post_content: blog.post_content,
      post_title: blog.post_title,
      post_excerpt: blog.post_excerpt,
      post_status: blog.post_status,
      comment_status: blog.comment_status,
      ping_status: blog.ping_status,
      post_password: blog.post_password,
      post_name: blog.post_name,
      to_ping: blog.to_ping,
      pinged: blog.pinged,
      post_modified: blog.post_modified,
      post_modified_gmt: blog.post_modified_gmt,
      post_content_filtered: blog.post_content_filtered,
      post_parent: blog.post_parent,
      guid: blog.guid,
      menu_order: blog.menu_order,
      post_type: blog.post_type,
      post_mime_type: blog.post_mime_type,
      comment_count: blog.comment_count,
      imageUrl: extractFirstImage(blog.post_content), // Ensure imageUrl is added
    }));

    setBlogCards(processedData); // Set the processed data as the state
  }, []);

  return (
    <section className="py-16 bg-black text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Blogs</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogCards.map((blog, index) => (
          <div
            key={index}
            className="border border-gray-700 bg-gray-900 p-6 text-center shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={blog.imageUrl}
              alt={blog.post_title}
              width={400} // Set width for image
              height={200} // Set height for image
              className="w-full h-40 object-cover rounded-md mb-4"
              priority // Add this for prioritizing above-the-fold images (optional)
            />
            <h3 className="text-xl font-bold text-yellow-400 mb-4">
              {blog.post_title}
            </h3>
            <div
              className="text-white text-lg leading-7"
              dangerouslySetInnerHTML={{
                __html: blog.post_content.slice(0, 300) + "...",
              }}
            ></div>
            <button className="mt-5 bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors">
              <Link href={`/blogs/${blog.ID}`}>Read More</Link>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/allBlogs"
          className="px-4 py-2 bg-yellow-400 text-black shadow-md hover:bg-yellow-500 transition"
        >
          VIEW MORE
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
