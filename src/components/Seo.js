import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ title, description }) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          locale
        }
      }
    }
  `)

  const siteTitle = site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle

  return (
    <>
      <html lang={site.siteMetadata.locale} />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
    </>
  )
}

export default Seo
