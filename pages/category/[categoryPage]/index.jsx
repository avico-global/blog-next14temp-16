import React, { useEffect } from "react";
import dayjs from "dayjs";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Footer from "@/components/containers/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Navbar from "@/components/containers/Navbar";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";

export default function Categories({
  contact_details,
  footer_type,
  blog_list,
  tag_list,
  favicon,
  domain,
  logo,
  meta,
  page,
  categories,
  imagePath,
  about_me,
  nav_type,
  logo_white,
}) {
  const router = useRouter();
  const { categoryPage } = router.query;
  const breadcrumbs = useBreadcrumbs();

  // Move useEffect before the conditional return
  useEffect(() => {
    const currentPath = router.asPath;

    if (
      categoryPage &&
      (categoryPage.includes("%20") || categoryPage.includes(" "))
    ) {
      const newCategory = categoryPage.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [categoryPage, router]);

  // Find the selected category
  const selectedCategory = categories?.find(
    (cat) =>
      cat.title.toLowerCase() ===
      categoryPage?.replaceAll("-", " ").toLowerCase()
  );

  if (!selectedCategory) return null;

  console.log(blog_list);

  // Log the current category for debugging
  console.log(
    "Current category:",
    categoryPage?.replaceAll("-", " ").toLowerCase()
  );

  // Inspect the first blog post to understand its structure
  if (blog_list && blog_list.length > 0) {
    console.log(
      "First blog post structure:",
      JSON.stringify(blog_list[0], null, 2)
    );
    // Check if it has category-related fields
    console.log("Has categories?", !!blog_list[0].categories);
    console.log("Has category?", !!blog_list[0].category);
    console.log("Has article_category?", !!blog_list[0].article_category);
    console.log("Has tags?", !!blog_list[0].tags);
  }

  // Get the category ID from the selected category
  const categoryId = selectedCategory?.id;
  console.log("Selected category ID:", categoryId);

  // Normalize the current category name
  const categoryNameLower = categoryPage?.replaceAll("-", " ").toLowerCase();

  // Filter blog posts based on the actual structure we see in your API response
  const filteredBlogList = blog_list.filter((item) => {
    // Match by article_category if present
    if (item.article_category) {
      const itemCategory =
        typeof item.article_category === "string"
          ? item.article_category.toLowerCase()
          : "";
      if (itemCategory === categoryNameLower) {
        return true;
      }
    }

    // Since we can see from your API response that these are piping-related posts,
    // let's try to match against the title which appears to contain the topic
    if (item.title) {
      const titleLower = item.title.toLowerCase();

      // Extract the main topics from the title
      // For example: "Commercial Piping", "Smart Piping" etc.
      const categoryPhrases = ["commercial piping", "smart piping", "piping"];

      // If the current category is one of these phrases, check if the title contains it
      if (
        categoryPhrases.includes(categoryNameLower) &&
        titleLower.includes(categoryNameLower)
      ) {
        return true;
      }

      // Alternatively, if the category name contains the word "commercial" or "smart"
      // and the title contains that word too, consider it a match
      const categoryWords = categoryNameLower.split(" ");
      const keyWordsToMatch = ["commercial", "smart", "piping"];

      for (const word of categoryWords) {
        if (keyWordsToMatch.includes(word) && titleLower.includes(word)) {
          return true;
        }
      }
    }

    // No match
    return false;
  });

  console.log("Filtered posts:", filteredBlogList.length);
  console.log(
    "Filtered posts titles:",
    filteredBlogList.map((post) => post.title)
  );

  return (
    page?.enable && (
      <div>
        <Head>
          <meta charSet="UTF-8" />
          <title>
            {meta?.title?.replaceAll(
              "##category##",
              categoryPage
                ?.replaceAll("-", " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            )}
          </title>
          <meta
            name="description"
            content={meta?.description.replaceAll(
              "##category##",
              categoryPage?.replaceAll("-", " ")
            )}
          />
          <link rel="author" href={`https:${domain}`} />
          <link rel="publisher" href={`https://${domain}`} />
          <link
            rel="canonical"
            href={`https://${domain}/${categoryPage}`}
          />
          <meta name="theme-color" content="#008DE5" />
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <GoogleTagManager />
          <meta
            name="google-site-verification"
            content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
          />
        </Head>

        {/* Navbar */}
        <Navbar
          logo={logo}
          nav_type={nav_type}
          category={categoryPage}
          imagePath={imagePath}
          blog_list={blog_list}
          categories={categories}
          contact_details={contact_details}
        />

        {/* Hero Section with Category Title and Image */}
        <FullContainer className="bg-gradient-to-br from-theme to-theme-dark py-24 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="text-left space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-background2/90 text-black rounded-full text-sm font-medium backdrop-blur-sm">
                  <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                  Exploring Category
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold capitalize leading-tight">
                  {categoryPage?.replaceAll("-", " ")}
                  <span className="block mt-2 text-background2/90 text-2xl md:text-3xl font-medium">
                    Articles & Resources
                  </span>
                </h1>

                <p className=" text-lg max-w-lg">
                  Discover our collection of insightful articles, guides, and
                  resources about {categoryPage?.replaceAll("-", " ")}.
                </p>

                <Breadcrumbs breadcrumbs={breadcrumbs} className="mt-8" />

                <div className="pt-4">
                  <Link
                    title="Explore Articles"
                    href="#articles"
                    className="inline-flex items-center px-6 py-3 bg-background2 text-black rounded-lg font-medium hover:bg-background2/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Explore Articles
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <div className="overflow-hidden relative h-[480px] rounded-2xl shadow-2xl">
                  <Image
                    title={categoryPage?.replaceAll("-", " ")}
                    src={`${imagePath}/${selectedCategory.image}`}
                    fill={true}
                    priority
                    alt={`${categoryPage?.replaceAll("-", " ")} cover`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={95}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 opacity-60 group-hover:opacity-30 transition-opacity duration-700"></div>

                  {/* Category stats overlay */}
                  <div className="absolute bottom-8 left-8 right-8 bg-black/50 backdrop-blur-md rounded-xl p-4 transform transition-all duration-500 group-hover:translate-y-0 opacity-90">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <span className="block text-sm font-medium text-background2">
                          In this category
                        </span>
                        <span className="text-xl font-bold">
                          {filteredBlogList.length} Articles
                        </span>
                      </div>
                      <div className="h-8 w-px bg-white/20 mx-4"></div>
                      <div>
                        <span className="block text-sm font-medium text-background2">
                          Updated
                        </span>
                        <span className="text-md">
                          {dayjs().format("MMM YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-background2/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-background2/20 rounded-full blur-2xl"></div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-background2 text-black px-5 py-2 rounded-full font-bold shadow-lg transform -rotate-3">
                  Featured
                </div>
              </div>
            </div>
          </Container>
        </FullContainer>

        {/* Blog List and Right Sidebar */}
        <div id="articles"></div>

        {/* Blog List and Right Sidebar */}
        <FullContainer className="mb-12">
          <Container>
            <div className="grid grid-cols-1 gap-12 w-full">
              <div>
                {filteredBlogList?.length > 0 ? (
                  <div className="space-y-12">
                    {/* First Two Featured Blogs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 ">
                      {filteredBlogList.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          <Link
                            title={item?.title || "Article Link"}
                            href={`/${sanitizeUrl(
                              item.article_category
                            )}/${sanitizeUrl(item?.title)}`}
                            className="block relative"
                          >
                            <div className="overflow-hidden relative h-64">
                              <Image
                                title={item?.title || item.imageTitle}
                                src={
                                  item.image
                                    ? `${imagePath}/${item.image}`
                                    : "/no-image.png"
                                }
                                fill={true}
                                loading="lazy"
                                alt="blog"
                                className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                              <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-background3 text-black text-sm rounded-full">
                                  {categoryPage}
                                </span>
                              </div>
                            </div>
                          </Link>

                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-5 h-5 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                <p className="text-sm font-medium">
                                  {item.author}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-5 h-5 text-gray-400"
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
                                <p className="text-sm text-gray-500">
                                  {dayjs(item?.published_at)?.format(
                                    "MMM D, YYYY"
                                  )}
                                </p>
                              </div>
                            </div>

                            <Link
                              title={item?.title || "Article Link"}
                              href={`/${sanitizeUrl(item?.title)}`}
                            >
                              <h3 className="text-2xl font-bold  hover:text-gray-600 transition-colors mb-3 line-clamp-2">
                                {item.title}
                              </h3>
                            </Link>

                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {item.tagline}
                            </p>

                            <Link
                              title={item?.title || "Article Link"}
                              href={`/${sanitizeUrl(item?.title)}`}
                              className="mt-auto inline-flex items-center text-black hover:text-background3 font-medium"
                            >
                              Read More
                              <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center border px-10 py-40 text-lg bg-gray-200">
                    No articles found related to {categoryPage}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </FullContainer>

        {/* Footer */}
        <Footer
          logo={logo_white}
          about_me={
            about_me?.value
              ? {
                  ...about_me,
                  value:
                    about_me.value.split(" ").slice(0, 55).join(" ") + "...",
                }
              : about_me
          }
          imagePath={imagePath}
          blog_list={blog_list}
          categories={categories}
          category={categoryPage}
          footer_type={footer_type}
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: breadcrumb.label,
                  item: `https://${domain}${breadcrumb.url}`,
                })),
              },
              {
                "@type": "WebPage",
                "@id": `https://${domain}/${categoryPage}`,
                url: `https://${domain}/${categoryPage}`,
                name: meta?.title?.replaceAll(
                  "##category##",
                  categoryPage?.replaceAll("-", " ")
                ),
                description: meta?.description?.replaceAll(
                  "##category##",
                  categoryPage?.replaceAll("-", " ")
                ),
                inLanguage: "en-US",
                publisher: {
                  "@type": "Organization",
                  "@id": `https://${domain}`,
                },
              },
              {
                "@type": "ItemList",
                url: `https://${domain}/${categoryPage}`,
                name: "blog",
                itemListElement: blog_list?.map((blog, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Article",
                    url: `https://${domain}/${sanitizeUrl(
                      blog?.article_category.replaceAll(" ", "-")
                    )}/${sanitizeUrl(blog?.title)}`,
                    name: blog.title,
                  },
                })),
              },
            ],
          }}
        />
      </div>
    )
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { categoryPage } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const logo_white = await callBackendApi({ domain, type: "logo_white" });

  const favicon = await callBackendApi({ domain, type: "favicon" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const footer_text = await callBackendApi({ domain, type: "footer_text" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const meta = await callBackendApi({ domain, type: "meta_category" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "category");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() ===
      categoryPage?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      logo_white: logo_white?.data[0],
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0].value,
      about_me: about_me.data[0] || null,
      copyright: copyright?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      contact_details: contact_details.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      footer_type: footer_type?.data[0]?.value || {},
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
