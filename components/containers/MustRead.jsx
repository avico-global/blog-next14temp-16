import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";

export default function MustRead({ blog_list = [], imagePath }) {
  const mustReadBlogs = blog_list.filter((item) => item.isMustRead);

  return (
    mustReadBlogs?.length > 0 && (
      <div className="mb-16">
        {/* Header Section */}
        <div className="relative z-20 w-full mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black px-4 md:px-0 text-left">
            Must Read
          </h2>
          <p className="text-xl text-gray-600 mt-3 px-4 md:px-0">
            Essential reads: Don&apos;t miss these standout articles.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1  gap-16 lg:gap-44">
          {mustReadBlogs.map((item, index) => (
            <div key={index} className="relative py-20">
              {/* Background accent */}
              <div className="absolute right-0 top-0 w-full h-full bg-theme" />

              <div className="relative container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Content Section */}
                  <div className="flex flex-col gap-6 md:pr-6 p-4 md:p-6">
                    <div className="flex items-center gap-4 text-gray-600 flex-wrap">
                      <Link
                        className="w-fit text-sm font-semibold bg-background4 hover:bg-background1 text-black py-2 px-6 rounded-xl transition-colors"
                        href={`/${sanitizeUrl(item.article_category) || "#"}`}
                      >
                        {item.article_category}
                      </Link>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <p>{item.published_at}</p>
                    </div>

                    <Link
                      href={`/${sanitizeUrl(item.article_category) || "#"}`}
                      className="group"
                    >
                      <h3 className="font-bold text-2xl md:text-4xl lg:text-5xl leading-tight group-hover:text-gray-500 duration-200 transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <Link
                      href={`/${sanitizeUrl(item.article_category) || "#"}`}
                      className="group"
                    >
                      <h3 className="font-normal text-lg md:text-xl leading-tight group-hover:text-gray-500 duration-200 transition-colors">
                        {item.tagline}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-4 text-gray-600">
                      <p className="font-medium">By {item.author}</p>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="relative">
                    <Link
                      href={`/${sanitizeUrl(item.article_category) || "#"}`}
                      title={item.imageTitle}
                      className="block relative aspect-[3/3] w-full md:w-3/4 mt-0 md:-mt-80 overflow-hidden rounded-2xl group"
                    >
                      <Image
                        src={`${imagePath}/${item.image || "no-image.png"}`}
                        title={item.imageTitle || item.title || "Article Image"}
                        alt={item.altImage || item.tagline}
                        priority={false}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 transition-colors duration-700" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
