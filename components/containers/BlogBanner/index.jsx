import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function BlogBannerStyle({ myblog, imagePath }) {
  return (
    <FullContainer>
      <Container className="min-h-[60vh] overflow-hidden relative rounded-2xl mt-8">
        {/* Background image with gradient overlay */}
        <Image
          src={`${imagePath}/${myblog?.file_name}`}
          alt={myblog?.value.imageAltText || myblog?.value?.tagline || "No Banner Found"}
          title={myblog?.value.imageTitle || myblog?.value.title}
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(0, 0, 0, ${myblog?.value?.opacity / 200}),
              rgba(0, 0, 0, ${myblog?.value?.opacity / 100})
            )`
          }}
        />

        {/* Content container */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-8 py-16">
          <Badge className="mb-6 transform hover:scale-105 transition-transform">
            {myblog?.value?.article_category}
          </Badge>
          
          <h1
            style={{ fontSize: myblog?.value?.titleFontSize || 42 }}
            className="font-bold text-center text-white mb-8 leading-tight max-w-4xl mx-auto animate-fade-in"
          >
            {myblog?.value.title}
          </h1>

          <div className="flex items-center gap-3 text-sm opacity-90">
            <div className="flex items-center">
              <span className="mr-2">By</span>
              <span className="font-medium">{myblog?.value?.author}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
            <time>{myblog?.value.published_at}</time>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
