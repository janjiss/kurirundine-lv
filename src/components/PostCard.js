import React from "react"
import { Link } from "gatsby"

const PostCard = ({ post }) => {
  const { title, slug, date, feature_image, tags, authors } = post
  const tagList = tags || []
  const authorList = authors || []

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

  return (
    <article className="post-card bg-dark bg-full">
      {feature_image && (
        <img
          className="post-card-image bg-full-image bg-fade-in"
          src={feature_image}
          alt={title}
          loading="lazy"
        />
      )}
      <div className="post-card-inside">
        <div className="post-card-content">
          <header className="post-card-header">
            {tagList.length > 0 && (
              <div className="post-card-tags">
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
            <h2 className="post-card-title">
              <Link to={`/${slug}/`}>{title}</Link>
            </h2>
            <div className="post-card-meta">
              {authorList.length > 0 && (
                <span className="post-card-author">
                  {authorList.join(", ")}
                </span>
              )}{" "}
              <time dateTime={dateISO}>{formattedDate}</time>
            </div>
          </header>
          <div className="post-card-read-more">
            <Link className="button button-outlined" to={`/${slug}/`}>
              Lasīt vairāk
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
