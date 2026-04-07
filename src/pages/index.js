import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import PostCard from "../components/PostCard"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const { title, description, coverImage } = data.site.siteMetadata

  return (
    <Layout>
      <main id="main" className="content outer">
        <div className="inner-wide">
          <div className="hero bg-dark bg-full">
            <img
              className="hero-image bg-full-image bg-fade-in"
              src={coverImage}
              alt=""
            />
            <div className="hero-inside inner">
              <div className="hero-content">
                <h2 className="hero-title h1">{title}</h2>
                <p className="hero-text">{description}</p>
              </div>
            </div>
          </div>

          <div className="post-feed">
            {posts.map((post) => (
              <PostCard key={post.frontmatter.slug} post={post.frontmatter} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        coverImage
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          date
          feature_image
          tags
          authors
        }
      }
    }
  }
`
