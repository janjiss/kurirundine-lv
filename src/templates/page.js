import React from "react"
import { graphql, withPrefix } from "gatsby"
import Layout from "../components/Layout"

const prefixImages = (html) =>
  html.replace(/(src|srcset)="\/content\//g, `$1="${withPrefix("/content/")}`)
      .replace(/, \/content\//g, `, ${withPrefix("/content/")}`)

const PageTemplate = ({ data }) => {
  const page = data.markdownRemark
  const { title } = page.frontmatter

  return (
    <Layout title={title}>
      <main id="main" className="content outer">
        <div className="inner-wide">
          <article className="post-full">
            <header className="post-header no-image">
              <div className="post-header-inside">
                <div className="post-header-content inner">
                  <h1 className="post-title">{title}</h1>
                </div>
              </div>
            </header>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: prefixImages(page.html) }}
            />
          </article>
        </div>
      </main>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`
