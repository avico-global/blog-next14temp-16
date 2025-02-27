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
  const { category } = router.query;
  const breadcrumbs = useBreadcrumbs();

  // Move useEffect before the conditional return
  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);

  // Find the selected category
  const selectedCategory = categories?.find(
    (cat) =>
      cat.title.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!selectedCategory) return null;

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = sanitizeUrl(category);
    return sanitizeUrl(item.article_category) === searchContent;
  });

  return (
    page?.enable && (
      <div>
        <Head>
          <meta charSet="UTF-8" />
          <title>
            {meta?.title?.replaceAll(
              "##category##",
              category
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
              category?.replaceAll("-", " ")
            )}
          />
          <link rel="author" href={`https://www.${domain}`} />
          <link rel="publisher" href={`https://www.${domain}`} />
          <link rel="canonical" href={`https://www.${domain}/${category}`} />
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
              category={category}
              imagePath={imagePath}
              blog_list={blog_list}
              categories={categories}
              contact_details={contact_details}
            />

        {/* Hero Section with Category Title and Image */}
        <FullContainer className="bg-theme py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <div className="inline-block px-4 py-2 bg-background2 text-black rounded-full text-sm font-medium mb-2">
                  Category
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold capitalize leading-tight">
                  {category?.replaceAll("-", " ")}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit
                  Asperiores non dolor officiis eaque corporis.
                </p>
                <Breadcrumbs breadcrumbs={breadcrumbs} className="mt-6" />
              </div>
              <div className="relative group">
                <div className="overflow-hidden relative h-[450px] rounded-2xl shadow-xl">
                  <Image
                    title={category?.replaceAll("-", " ")}
                    src={`${imagePath}/${selectedCategory.image}`}
                    fill={true}
                    loading="lazy"
                    alt={`${category?.replaceAll("-", " ")} cover`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 group-hover:opacity-0 transition-opacity duration-700"></div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-100 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </div>
          </Container>
        </FullContainer>

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
                                  {category}
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
                              href={`/${sanitizeUrl(
                                item.article_category
                              )}/${sanitizeUrl(item?.title)}`}
                            >
                              <h3 className="text-2xl font-bold hover:text-gray-600 transition-colors mb-3 line-clamp-2">
                                {item.title}
                              </h3>
                            </Link>

                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {item.tagline}
                            </p>

                            <Link
                              href={`/${sanitizeUrl(
                                item.article_category
                              )}/${sanitizeUrl(item?.title)}`}
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
                    No articles found related to {category}
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
          category={category}
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
                "@id": `https://${domain}/${category}`,
                url: `https://${domain}/${category}`,
                name: meta?.title?.replaceAll(
                  "##category##",
                  category?.replaceAll("-", " ")
                ),
                description: meta?.description?.replaceAll(
                  "##category##",
                  category?.replaceAll("-", " ")
                ),
                inLanguage: "en-US",
                publisher: {
                  "@type": "Organization",
                  "@id": `https://${domain}`,
                },
              },
              {
                "@type": "ItemList",
                url: `https://${domain}/${category}`,
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
  const { category } = query;

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
      cat?.title?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
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
