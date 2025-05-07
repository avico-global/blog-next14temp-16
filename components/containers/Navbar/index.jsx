import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { Menu, Search, X } from "lucide-react";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function Navbar({
  logo,
  categories,
  imagePath,
  blog_list,
  searchContainerRef,
}) {
  const [sidebar, setSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null); // Add a ref for the sidebar
  // Add new state variables for search
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const searchRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const lastThreeBlogs = blog_list.slice(-3);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false); // Close sidebar if clicked outside
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  // Add search handlers
  const handleSearchToggle = () => {
    setOpenSearch(!openSearch);
    setSearchQuery("");
    setFilteredBlogs([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredBlogs([]);
      return;
    }

    const filtered =
      blog_list?.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      ) || [];
    setFilteredBlogs(filtered);
  };

  // Add click outside handler for search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
        setSearchQuery("");
        setFilteredBlogs([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <FullContainer className=" bg-theme">
        <div className="w-full">
          <div className="flex items-center justify-between gap-3 mx-auto  p-6 lg:max-w-[1700px]">
            <div className="flex items-center gap-4">
              <Menu
                onClick={() => setSidebar(true)}
                className="cursor-pointer w-8  flex lg:hidden "
              />
              <Logo logo={logo} imagePath={imagePath} />
            </div>

            {/* Main Nav Links */}
            <div className="hidden lg:flex space-x-4 lg:space-x-9">
              <Link title="Home" href="/">
                Home
              </Link>

              {/* Categories Link */}
              <div
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button title="Categories" className="hover:text-black">
                  Categories
                </button>

                {/* Categories Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full bg-white/100 backdrop-blur-lg shadow-2xl rounded-3xl z-50 p-6 w-[600px] m border border-gray-100">
                    <div className="grid grid-cols-3 gap-5">
                      {categories.map((category, index) => (
                        <Link
                          key={index}
                          href={`/category/${encodeURI(sanitizeUrl(category.title))}`}
                          title={category.title}
                          className="group relative overflow-hidden"
                        >
                          <div className="relative h-48 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                            <Image
                              src={`${imagePath}/${category.image}`}
                              alt={category.title || "Category Image"}
                              title={category.article_category || "Category Image"}
                              fill
                              className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                              <span className="text-white font-medium capitalize text-lg  transition-colors">
                                {category.title}
                              </span>
                              <div className="h-1 w-0 bg-background2 group-hover:w-full transition-all duration-300 mt-2" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link title="Contact" href="/contact">
                Contact Us
              </Link>
              <Link
                title="About"
                href="/about"
                className="  mb-2 w-fit transition-all"
              >
                About
              </Link>
            </div>

            {/* Search Section */}
            <div
              className="flex items-center justify-end gap-3 text-gray-500 relative"
              ref={searchRef}
            >
              <div
                className={`flex items-center transition-all duration-500 ${
                  openSearch ? "w-[400px]" : "w-10"
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={` w-full  bg-white/80 backdrop-blur-sm rounded-full py-3.5 pl-3    outline-none transition-all duration-500 
                      border border-gray-200 hover:border-gray-300
                      focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400
                      ${
                        openSearch
                          ? "opacity-100 visible"
                          : "opacity-0 invisible w-0"
                      }`}
                  placeholder="Type to search articles..."
                  autoFocus={openSearch}
                />
                <button
                  onClick={handleSearchToggle}
                  className={`flex items-center justify-center hover:bg-yellow-100  rounded-full transition-all duration-300
                      ${openSearch ? "absolute right-2" : ""}`}
                >
                  {openSearch ? (
                    <X className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Search className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Search Results Dropdown */}
              {openSearch && searchQuery && (
                <div className="absolute top-full right-0 w-[400px] bg-white/80 backdrop-blur-lg rounded-3xl mt-4 shadow-2xl max-h-[70vh] overflow-y-auto border border-gray-100 z-50 ">
                  <div className="p-4 sticky top-0 bg-white/90 backdrop-blur-lg border-b border-gray-100">
                    <p className="text-sm text-gray-500">
                      {filteredBlogs?.length} results found
                    </p>
                  </div>

                  <div className="p-3">
                    {filteredBlogs?.length > 0 ? (
                      filteredBlogs.map((item, index) => (
                        <Link
                          key={index}
                          title={item.title}
                          href={`/${sanitizeUrl(item?.title)}`}
                        >
                          <div className="group hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent p-4 rounded-2xl transition-all">
                            <div className="flex items-center gap-4">
                              <div className="bg-yellow-100 p-3 rounded-xl group-hover:bg-yellow-200 transition-colors">
                                <Search className="w-4 h-4 text-yellow-600" />
                              </div>
                              <div className="flex-1">
                                <span className="text-gray-800 font-medium text-sm line-clamp-1 group-hover:text-yellow-600">
                                  {item.title}
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                                    {item.article_category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="py-12 text-center">
                        <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Search className="w-6 h-6 text-yellow-600" />
                        </div>
                        <p className="text-base font-medium text-gray-600">
                          No matches found
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Try adjusting your search terms
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </FullContainer>

      {/* Sidebar for Mobile */}
      <div
        className={`sidebar fixed top-0 left-0 h-screen flex flex-col justify-between bg-white text-black shadow-xl z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-ml-96"
        }`}
        ref={sidebarRef}
      >
        <div>
          <div className="flex items-center justify-between">
            <Logo logo={logo} imagePath={imagePath} />
            <X
              className="w-8 text-black cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>

          <div className="pt-32 hidden lg:flex flex-col items-center p-2">
            <div className="lg:flex lg:flex-col">
              {lastThreeBlogs.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-widget1 gap-4 py-3 border-b last:border-none"
                >
                  <Link
                    title={item.title || "Article"}
                    href={`/${encodeURI(
                      sanitizeUrl(item.article_category)
                    )}/${encodeURI(sanitizeUrl(item.title))}`}
                  >
                    <div className="overflow-hidden relative min-h-20 w-full bg-black flex-1 rounded-full">
                      <Image
                        title={
                          item?.imageTitle || item?.title || "Article Thumbnail"
                        }
                        alt={
                          item?.tagline || item?.altText || "Article Thumbnail"
                        }
                        src={
                          item.image
                            ? `${imagePath}/${item.image}`
                            : "/no-image.png"
                        }
                        fill
                        loading="lazy"
                        className="object-cover hover:scale-125 transition-all"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div>
                    <Link
                      title={item.title || "Article Link"}
                      href={`/${encodeURI(
                        sanitizeUrl(item.article_category)
                      )}/${encodeURI(sanitizeUrl(item.title))}`}
                    >
                      <p className="font-semibold leading-tight ">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Menu Links */}
          <div className="flex lg:hidden text-2xl flex-col gap-6 mt-16">
            <Link title="Home" href="/">
              Home
            </Link>
            <div className="relative">
              <button
                title="Categories"
                className="cursor-pointer"
                onClick={toggleDropdown}
              >
                Categories
              </button>

              {/* Categories Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full bg-white text-black shadow-lg rounded-md z-50 p-4 w-[300px]  grid grid-cols-1 gap-4">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/${encodeURI(sanitizeUrl(category.title))}`}
                    >
                      <div className="flex items-center  gap-4 hover:bg-gray-100 p-2 transition">
                        <Image
                          src={`${imagePath}/${category.image}`}
                          alt={category.title}
                          width={60}
                          height={100}
                          className="rounded-md"
                        />
                        <span className="font-semibold">{category.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link title="Contact" href="/contact">
              Contacts
            </Link>

            <Link
              title="About"
              href="/about"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Styles */}
      <style jsx>{`
        .sidebar {
          width: 0;
          transition: width 0.3s ease;
        }
        .sidebar.open {
          width: 300px;
        }
        @media only screen and (max-width: 600px) {
          .sidebar.open {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
