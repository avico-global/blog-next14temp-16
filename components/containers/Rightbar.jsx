import { Circle, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { sanitizeUrl } from "@/lib/myFun";

const md = new MarkdownIt();

export default function Rightbar({
  about_me = {},
  category,
  tag_list = [],
  blog_list = [],
  imagePath,
  categories = [],
}) {
  const content = md.render(about_me?.value || "");
  const router = useRouter();
  const currentPath = router.asPath;

  const isActive = (path) => currentPath === path;
  const lastFiveBlogs = blog_list.slice(-4);

  const renderLatestPosts = () => (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-extrabold text-xl border-b w-full py-3 mb-4 text-gray-800">
        Popular Articles
      </h2>
      <div className="flex flex-col w-full space-y-6">
        {lastFiveBlogs.map((item, index) => (
          <div
            key={index}
            className="group grid grid-cols-rightBar gap-4 pb-6  border-gray-100 last:border-none last:pb-0"
          >
            <Link
              title={item.title || "Article"}
              href={`/${encodeURI(sanitizeUrl(item.title))}`}
              className="overflow-hidden rounded-lg relative min-h-20 w-24 bg-gray-100"
            >
              <Image
                title={item?.imageTitle || item?.title || "Article Thumbnail"}
                alt={item?.tagline || item?.altText || "Article Thumbnail"}
                src={
                  item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                }
                fill
                loading="lazy"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                style={{ objectFit: "cover" }}
              />
            </Link>

            <div className="flex flex-col justify-between">
              <Link
                title={item.title || "Article Link"}
                href={`/${encodeURI(sanitizeUrl(item.title))}`}
              >
                <p className="font-semibold text-lg text-gray-800 leading-snug group-hover:text-gray-600 transition-colors">
                  {item.title}
                </p>
              </Link>
              <div className="flex items-center gap-3 mt-2 text-gray-500">
                <p className="text-xs font-medium">{item.author}</p>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <p className="text-xs">{item.published_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-fit sticky top-4 flex flex-col gap-12">
      {renderLatestPosts()}
    </div>
  );
}
