module.exports = {
  pathPrefix: "/kurirundine-lv",
  siteMetadata: {
    title: "Kur ir Undīne?",
    description: "Mēs, Undīne un Jānis, esam atgriezušies no gada Latīņamerikā. Un ceļojumi turpinās - šeit atradīsi mūsu piedzīvojumu stāstus un noderīgus padomus savu ceļojumu plānošanai.",
    siteUrl: "https://kurirundine.lv",
    locale: "lv",
    accentColor: "#71b129",
    coverImage: "/content/images/2021/08/IMG_7308--Large--1.JPG",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
  ],
}
