import React from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Container from "../common/Container";

export default function AboutBanner({ image }) {
  return (
    <FullContainer>
      <Container className="relative h-[80vh] min-h-[600px] text-white mt-4 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-[2]"></div>
          <Image
            src={image}
            title="About Us"
            alt="About Us Banner Not Found"
            priority={true}
            fill={true}
            loading="eager"
            className="object-cover"
          />
        </div>
        
        {/* Content section */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-1 bg-white/80" />
              <span className="text-xl tracking-wider">Welcome to</span>
            </div>
            
            <h1 className="font-extrabold text-7xl capitalize leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-purple-200">Us</span>
            </h1>
            
            <p className="text-lg text-gray-200 max-w-xl">
              Discover our story, our mission, and the passion that drives us forward.
            </p>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
