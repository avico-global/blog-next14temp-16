import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BlogCard = ({
  href,
  image,
  title,
  tagline,
  altImage,
  className,
  imageTitle,
  imageHeight,
  published_at,
  author,
  category,
}) => {
  const encodedHref = href ? encodeURI(href) : "#";
  const bgColors = [
    "bg-background1 text-black",
    "bg-background2 text-black",
    "bg-background3 text-black",
    "bg-background4 text-black",
    "bg-background1 text-black",
    "bg-background2 text-black",
  ];

  // Function to get category color
  const getCategoryColor = (category) => {
    const colors = {
      default: "bg-blue-100 text-blue-800",
      technology: "bg-purple-100 text-purple-800",
      design: "bg-pink-100 text-pink-800",
      business: "bg-green-100 text-green-800",
      marketing: "bg-orange-100 text-orange-800",
      development: "bg-indigo-100 text-indigo-800",
    };

    const normalizedCategory = category?.toLowerCase() || "default";
    return colors[normalizedCategory] || colors.default;
  };

  return (
    <div
      className={cn(
        "group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-row",
        className
      )}
    >
      {/* Image Container - Left Side */}
      <Link
        title={imageTitle}
        href={encodedHref}
        className="relative block overflow-hidden w-1/2 min-w-[200px]"
      >
        <Image
          src={image}
          width={331}
          height={parseInt(imageHeight, 10) || 420}
          loading="eager"
          alt={altImage}
          priority={true}
          title={imageTitle}
          className="w-full h-full absolute top-0 object-cover group-hover:scale-110 transition-all duration-700"
        />
      </Link>

      {/* Content Container - Right Side */}
      <div className="flex flex-col justify-start p-6 space-y-4 w-2/3">
        <Link
          href={encodedHref}
          className={cn(
            "text-normal font-semibold px-6 py-2 rounded-xl w-fit",
            bgColors[Math.floor(Math.random() * bgColors.length)] // Randomly select a background color
          )}
        >
          {category}
        </Link>

        <Link
          className="font-bold text-xl md:text-2xl leading-snug hover:text-primary transition-colors"
          title={title}
          href={encodedHref}
        >
          {title}
        </Link>

        <p className="text-sm text-gray-500 font-medium">{author}</p>
        <p className="text-sm text-gray-500 font-medium">{published_at}</p>

        {tagline && <p className="text-gray-600 line-clamp-2">{tagline}</p>}
      </div>
    </div>
  );
};

export default BlogCard;
