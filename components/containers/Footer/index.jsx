import React from "react";
import LatestPosts from "../LatestPosts";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/lib/myFun";
import Logo from "../Navbar/Logo";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { TelegramIcon } from "react-share";
import { Share, Mail } from "lucide-react";

export default function Footer({
  categories,
  blog_list,
  imagePath,
  category,
  logo,
  about_me,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/sitemap.xml";
  };

  return (
    <>
      <FullContainer className="bg-theme py-36 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-black/5" />
        <div className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-black/5" />

        <Container>
          <div className="max-w-2xl mx-auto text-center relative">
            {/* Header section with gradient underline */}
            <div className="inline-flex items-center justify-center gap-3 mb-3 relative">
              <Mail className="w-6 h-6 text-gray-700" />
              <h4 className="text-lg font-semibold tracking-wide uppercase">
                Newsletter
              </h4>
            </div>

            <h2 className="text-4xl font-bold mb-4">
              Stay Updated with Our Latest
            </h2>

            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Join our community and receive the best content straight to your
              inbox
            </p>

            {/* Subscription form with floating label */}
            <div className="relative max-w-md mx-auto p-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    label="Enter your email"
                    className="w-full py-4 px-6 rounded-xl border-2 outline-none border-transparent focus:border-black focus:outline-none transition-all duration-200 placeholder:text-transparent peer"
                    id="email-input"
                  />
                  <label
                    htmlFor="email-input"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                  >
                    Enter your email
                  </label>
                </div>
                <button
                  className="px-8 py-4 bg-black text-white rounded-xl font-semibold 
                    hover:bg-gray-800 active:scale-95 transition-all duration-200 
                    whitespace-nowrap shadow-[5px_5px_20px_rgba(0,0,0,0.15)]"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>No Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Weekly Updates</span>
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>

      <FullContainer className="bg-black text-white">
        <Container>
          {/* Logo Section */}
          <div className="py-8">
            <Logo logo={logo} imagePath={imagePath} />
          </div>

          {/* Main Border */}
          <div className="w-full h-px bg-gray-800" />

          {/* Footer Content Grid */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* About Section */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-6">About Us</h4>
              <p className="text-gray-400 leading-relaxed ">{about_me?.value}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                  title="Home"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-400 hover:text-white transition-colors"
                  title="About"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-400 hover:text-white transition-colors"
                  title="Contact"
                >
                  Contact
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="block text-gray-400 hover:text-white transition-colors"
                  title="Terms & conditions"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/privacy-policy"
                  className="block text-gray-400 hover:text-white transition-colors"
                  title="Privacy Policy"
                >
                  Privacy Policy
                </Link>
                <Link title="Sitemap" href="/sitemap.xml" legacyBehavior>
                  <a
                    onClick={handleClick}
                    title="Sitemap"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Sitemap
                  </a>
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-lg mb-6">Categories</h4>
              <div className="space-y-3">
                {categories?.map((item, index) => (
                  <Link
                    key={index}
                    href={`/category/${sanitizeUrl(item.title)}`}
                    title={item.title}
                    className={cn(
                      "block text-white hover:text-white rounded-xl bg-gray-800  hover:bg-gray-700 w-fit py-1 px-4 transition-colors",
                      category === item.title && "text-white"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>
    </>
  );
}
