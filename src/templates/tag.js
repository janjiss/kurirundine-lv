import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import PostCard from "../components/PostCard"

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout title={tag}>
      <main id="main" className="content outer">
        <div className="inner-wide">
          <header className="page-header">
            <div className="page-header-inside">
              <div className="page-header-content inner">
                <h1 className="page-title">{tag}</h1>
                <p className="page-description">
                  {posts.length} {posts.length === 1 ? "ieraksts" : "ieraksti"}
                </p>
              </div>
            </div>
          </header>

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

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts/" }
        frontmatter: { tags: { in: [$tag] } }
      }
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
