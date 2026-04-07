import React from "react"
import { graphql, Link, withPrefix } from "gatsby"
import Layout from "../components/Layout"

const prefixImages = (html) =>
  html.replace(/(src|srcset)="\/content\//g, `$1="${withPrefix("/content/")}`)
      .replace(/, \/content\//g, `, ${withPrefix("/content/")}`)

const PostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { title, date, feature_image, tags, authors } = post.frontmatter
  const tagList = tags || []
  const authorList = authors || []
  const { prevSlug, nextSlug } = pageContext
  const prevPost = data.prevPost
  const nextPost = data.nextPost

  const formattedDate = date
    ? new Date(date).toLocaleDateString("lv-LV", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  const dateISO = date
    ? new Date(date).toISOString().split("T")[0]
    : ""

  const wordCount = post.html.replace(/<[^>]+>/g, "").split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <Layout title={title}>
      <main id="main" className="content outer">
        <div className="inner-wide">
          <article className="post-full">
            <header
              className={`post-header ${feature_image ? "has-image" : "no-image"}`}
            >
              <div
                className={`post-header-inside ${feature_image ? "bg-dark bg-full" : ""}`}
              >
                {feature_image && (
                  <img
                    className="bg-full-image bg-fade-in"
                    src={withPrefix(feature_image)}
                    alt={title}
                  />
                )}
                <div className="post-header-content inner">
                  {tagList.length > 0 && (
                    <div className="post-tags">
                      {tagList.map((tag) => (
                        <Link
                          key={tag}
                          to={`/tag/${tag.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")}/`}
                          className="button button-small button-solid-alt"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                  <h1 className="post-title">{title}</h1>
                  <div className="post-meta">
                    {authorList.length > 0 && (
                      <span>{authorList.join(", ")}</span>
                    )}{" "}
                    <time dateTime={dateISO}>{formattedDate}</time>
                  </div>
                  <div className="post-reading-time">
                    {readingTime} min lasīšana
                  </div>
                </div>
              </div>
            </header>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: prefixImages(post.html) }}
            />

            <footer className="post-footer inner">
              {authorList.length > 0 && (
                <div className="post-authors">
                  <span className="post-card-author">
                    {authorList.join(", ")}
                  </span>
                </div>
              )}
            </footer>
          </article>

          <nav className="post-navigation">
            {nextPost && (
              <Link
                to={`/${nextPost.frontmatter.slug}/`}
                className="post-navigation-next post-card bg-dark bg-full"
              >
                {nextPost.frontmatter.feature_image && (
                  <img
                    className="post-card-image bg-full-image bg-fade-in"
                    src={withPrefix(nextPost.frontmatter.feature_image)}
                    alt={nextPost.frontmatter.title}
                    loading="lazy"
                  />
                )}
                <div className="post-card-inside">
                  <div className="post-card-content">
                    <header className="post-card-header">
                      <div className="post-card-badge">Nākamais</div>
                      <h2 className="post-card-title">{nextPost.frontmatter.title}</h2>
                    </header>
                  </div>
                </div>
              </Link>
            )}
            {prevPost && (
              <Link
                to={`/${prevPost.frontmatter.slug}/`}
                className="post-navigation-prev post-card bg-dark bg-full"
              >
                {prevPost.frontmatter.feature_image && (
                  <img
                    className="post-card-image bg-full-image bg-fade-in"
                    src={withPrefix(prevPost.frontmatter.feature_image)}
                    alt={prevPost.frontmatter.title}
                    loading="lazy"
                  />
                )}
                <div className="post-card-inside">
                  <div className="post-card-content">
                    <header className="post-card-header">
                      <div className="post-card-badge">Iepriekšējais</div>
                      <h2 className="post-card-title">{prevPost.frontmatter.title}</h2>
                    </header>
                  </div>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </main>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!, $prevSlug: String, $nextSlug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        date
        feature_image
        tags
        authors
        excerpt
      }
    }
    prevPost: markdownRemark(frontmatter: { slug: { eq: $prevSlug } }) {
      frontmatter {
        title
        slug
        feature_image
      }
    }
    nextPost: markdownRemark(frontmatter: { slug: { eq: $nextSlug } }) {
      frontmatter {
        title
        slug
        feature_image
      }
    }
  }
`
