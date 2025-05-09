import React from "react";
import Image from "next/image";
import FullContainer from "../../common/FullContainer";

export default function Banner({ image, data }) {
  return (
    <div>
      <FullContainer
        className="min-h-[600px] relative"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 30})`,
          color: data.textColor || "white",
          borderRadius:"28px",
        }}
      >
        <Image
          src={image}
          title={data.imageTitle || data.title || "Banner"}
          alt={data.altImage || data.tagline || "No Banner Found"}
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-52 rounded-3xl  "
          style={{ objectFit: "cover" }}
          sizes="(max-width: 320px) 320px,
               (max-width: 480px) 480px,
               (max-width: 768px) 768px,
               (max-width: 1024px) 1024px,
               (max-width: 1280px) 1280px,
               (max-width: 1600px) 1600px,
               (max-width: 1920px) 1920px,
               (max-width: 2560px) 2560px,
               (max-width: 3840px) 3840px,
               100vw"
        />
        
        <div className="absolute bottom-8 left-8 text-left z-10">
          <h1
            style={{ fontSize: data.titleFontSize || 48 }}
            className="font-bold capitalize"
          >
            {data.title}
          </h1>
          {data.tagline && (
            <p
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-tight md:leading-none"
            >
              {data.tagline}
            </p>
          )}
        </div>
      </FullContainer>
    </div>
  );
}
