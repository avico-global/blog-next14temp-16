import React from "react";
import Head from "next/head";
import Banner from "@/components/containers/Banner/Banner";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Rightbar from "@/components/containers/Rightbar";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import JsonLd from "@/components/json/JsonLd";
import BlogCard from "@/components/common/BlogCard";
import Link from "next/link";
import Image from "next/image";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";
import MustRead from "@/components/containers/MustRead";

export default function Home({
  footer_type,
  categories,
  blog_list,
  imagePath,
  favicon,
  banner,
  domain,
  logo,
  meta,
  page,
  tag_list,
  nav_type,
  about_me,
  contact_details,
  logo_white,
}) {
  const lastFiveBlogs = blog_list.slice(-5);
  const bgColors = [
    "bg-background1",
    "bg-background2",
    "bg-background3",
    "bg-background4",
    "bg-background1",
    "bg-background2",
  ];

  const renderBlogList = () => {
    return (
      <div className="grid  gap-5 md:gap-10">
        <div className="flex flex-col gap-5 ">
          {blog_list?.slice(0, 8).map((item, index) => (
            <BlogCard
              key={index}
              category={sanitizeUrl(item.article_category) || "#"}
              title={item.title}
              published_at={item.published_at}
              author={item.author}
              image={
                item.image ? `${imagePath}/${item.image}` : "/no-image.png"
              }
              href={`/${encodeURI(sanitizeUrl(item.title))}`}
              imageHeight="h-full"
              imageTitle={item.imageTitle || item.title || "Blog Image Title"}
              altImage={item.altImage || item.tagline || "Article Thumbnail"}
              className="bg-white shadow-xl "
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    page?.enable && (
      <div className="min-h-screen">
        <Head>
          <meta charSet="UTF-8" />
          <title>{meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <link rel="author" href={`https://www.${domain}`} />
          <link rel="publisher" href={`https://www.${domain}`} />
          <link rel="canonical" href={`https://www.${domain}`} />
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

        <Navbar
          logo={logo}
          imagePath={imagePath}
          blog_list={blog_list}
          categories={categories}
          nav_type={nav_type}
          contact_details={contact_details}
        />

        <FullContainer>
          <Container className="gap-24">
            <div className="grid md:grid-cols-2 gap-8 mt-10 w-full">
              <Banner
                data={banner.value}
                image={`${imagePath}/${banner?.file_name}`}
                blog_list={blog_list}
              />

              <div className="grid grid-cols-2 gap-4">
                {categories?.slice(0, 4).map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${sanitizeUrl(category.title)}`}
                    title={category.title}
                    className="relative group overflow-hidden h-66"
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all rounded-3xl duration-300 z-10" />
                    <Image
                      src={
                        category.image
                          ? `${imagePath}/${category.image}`
                          : "/no-image.png"
                      }
                      alt={category.title || "Category Image"}
                      title={category.title || "Category Image"}
                      className="object-cover transition-all duration-500 h-full w-full rounded-3xl "
                      fill
                    />
                    <div className="absolute inset-0 flex items-center  ml-12  justify-start z-20">
                      <h3
                        className={`${bgColors[index]}  text-normal rounded-xl font-bold text-black   py-2 px-6 capitalize`}
                      >
                        {category.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative z-20 w-full mt-28">
              <h2 className="text-3xl md:text-4xl font-bold text-black px-4 md:px-0 text-left">
                Featured Article
              </h2>
            </div>
            {blog_list?.map(
              (item, index) =>
                item.isFeatured && (
                  <div key={index} className="relative py-20 ">
                    {/* Background accent */}
                    <div className="absolute right-0 top-0 w-full h-full bg-theme  " />

                    <div className="relative container mx-auto px-4">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Content Section */}
                        <div className="flex flex-col gap-6 md:pr-6 p-4 md:p-6">
                          <div className="flex items-center gap-4 text-gray-600 flex-wrap">
                            <Link
                              className="w-fit text-sm font-semibold bg-background4 hover:bg-background1 text-black py-2 px-6 rounded-xl transition-colors"
                              title={item.article_category}
                              href={`/category/${
                                sanitizeUrl(item.article_category) || "#"
                              }`}
                            >
                              {item.article_category}
                            </Link>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <p>{item.published_at}</p>
                          </div>

                          <Link
                           href={`/${sanitizeUrl(item?.title)}`}
                            title={item.title}
                            className="group"
                          >
                            <h3 className="font-bold text-2xl md:text-4xl lg:text-5xl leading-tight group-hover:text-gray-500 duration-200 transition-colors">
                              {item.title}
                            </h3>
                          </Link>

                          <Link
                           href={`/${sanitizeUrl(item?.title)}`}
                            title={item.tagline}
                            className="group"
                          >
                            <h3 className="font-normal text-lg md:text-xl leading-tight group-hover:text-gray-500 duration-200 transition-colors">
                              {item.tagline}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-4 text-gray-600">
                            <p className="font-medium">{item.author}</p>
                          </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative">
                          <Link
                           href={`/${sanitizeUrl(item?.title)}`}
                            title={item.imageTitle}
                            className="block relative aspect-[3/3] w-full md:w-3/4 mt-0 md:-mt-80 overflow-hidden rounded-2xl group"
                          >
                            <Image
                              src={`${imagePath}/${
                                item.image || "no-image.png"
                              }`}
                              title={item.imageTitle || item.title}
                              alt={item.altImage || item.tagline}
                              priority={false}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 transition-colors duration-700" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}

            <MustRead blog_list={blog_list} imagePath={imagePath} />

            <div>
              <div className=" py-10 w-full flex flex-col ">
                <h2 className=" text-4xl font-bold  text-start bg-white w-fit">
                  Latest Posts
                </h2>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-home1 gap-12 w-full mb-12 ">
                  <div className="flex flex-col gap-10 w-full">
                    {renderBlogList(blog_list)}
                  </div>

                  <Rightbar blog_list={blog_list} imagePath={imagePath} />
                </div>
              </div>
            </div>
          </Container>
        </FullContainer>

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
          footer_type={footer_type}
        />

        <JsonLd
          data={{
            "@context": "https://www.schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `https://${domain}/`,
                url: `https://${domain}/`,
                name: meta?.title,
                isPartOf: {
                  "@id": `https://${domain}`,
                },
                description: meta?.description,
                inLanguage: "en-US",
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: `${imagePath}/${banner?.file_name}`,
                  width: 1920,
                  height: 1080,
                },
              },
              {
                "@type": "Organization",
                "@id": `https://${domain}`,
                name: domain,
                url: `https://${domain}`,
                logo: {
                  "@type": "ImageObject",
                  url: `${imagePath}/${logo.file_name}`,
                  width: logo.width,
                  height: logo.height,
                },
                sameAs: [
                  "https://www.facebook.com",
                  "https://www.twitter.com",
                  "https://instagram.com",
                ],
              },
              
              {
                "@type": "ItemList",
                url: `https://${domain}`,
                name: "blog",
                itemListElement: blog_list?.map((blog, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Article",
                    url: `https://${domain}/${sanitizeUrl(
                      blog?.article_category
                    )}/${sanitizeUrl(blog?.title)}`,
                    name: blog?.title,
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

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const logo_white = await callBackendApi({ domain, type: "logo_white" });

  const meta = await callBackendApi({ domain, type: "meta_home" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });

  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });

  const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const imagePath = await getImagePath(project_id, domain);

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "home");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  robotsTxt({ domain });

  return {
    props: {
      page,
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      logo_white: logo_white?.data[0] || null,
      banner: banner?.data[0] || null,
      meta: meta?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      nav_type: nav_type?.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      copyright: copyright?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      categories: categories?.data[0]?.value || null,
      footer_type: footer_type?.data[0]?.value || {},
      contact_details: contact_details?.data[0]?.value || null,
    },
  };
}
