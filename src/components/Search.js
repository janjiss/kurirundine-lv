import React, { useState, useRef, useEffect, useMemo } from "react"
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"

const Search = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("")
  const inputRef = useRef(null)

  const data = useStaticQuery(graphql`
    query SearchQuery {
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
  `)

  const posts = data.allMarkdownRemark.nodes

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) {
      setQuery("")
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const results = useMemo(() => {
    if (!query || query.length < 2) return []
    const q = query.toLowerCase()
    return posts.filter(({ frontmatter: f }) => {
      const titleMatch = (f.title || "").toLowerCase().includes(q)
      const tagMatch = (f.tags || []).some((t) => t.toLowerCase().includes(q))
      const authorMatch = (f.authors || []).some((a) =>
        a.toLowerCase().includes(q)
      )
      return titleMatch || tagMatch || authorMatch
    })
  }, [query, posts])

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("lv-LV", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : ""

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      <div className={`sidebar ${isOpen ? "" : ""}`} style={isOpen ? { right: 0, visibility: "visible" } : {}}>
        <div className="sidebar-inside">
          <div className="sidebar-top">
            <button
              className="sidebar-close button button-icon button-clear"
              onClick={onClose}
              aria-label="Aizvērt"
              style={{ position: "absolute", right: "1rem", top: "1rem", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "inherit" }}
            >
              ✕
            </button>
            <div style={{ padding: "0.5rem 0" }}>
              <input
                ref={inputRef}
                type="search"
                placeholder="Meklēt pēc virsraksta, taga vai autora..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.25rem",
                  background: "var(--color-bg)",
                  color: "var(--color-text-highlight)",
                  fontFamily: "var(--font-primary)",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div className="sidebar-menu" style={{ overflowY: "auto", maxHeight: "calc(100vh - 8rem)" }}>
            {query.length >= 2 && (
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5rem", color: "var(--color-text-muted)" }}>
                {results.length} {results.length === 1 ? "rezultāts" : "rezultāti"}
              </p>
            )}
            {results.map(({ frontmatter: f }) => (
              <article
                key={f.slug}
                onClick={onClose}
                style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}
              >
                {f.feature_image && (
                  <Link to={`/${f.slug}/`} style={{ flexShrink: 0 }}>
                    <img
                      src={withPrefix(f.feature_image)}
                      alt={f.title}
                      loading="lazy"
                      style={{
                        width: "5rem",
                        height: "3.5rem",
                        objectFit: "cover",
                        borderRadius: "0.25rem",
                      }}
                    />
                  </Link>
                )}
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.3 }}>
                    <Link
                      to={`/${f.slug}/`}
                      style={{ color: "var(--color-text-highlight)", textDecoration: "none" }}
                    >
                      {f.title}
                    </Link>
                  </h4>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    {f.authors && f.authors.length > 0 && (
                      <span>{f.authors.join(", ")} · </span>
                    )}
                    <time>{formatDate(f.date)}</time>
                  </div>
                  {f.tags && f.tags.length > 0 && (
                    <div style={{ fontSize: "0.6875rem", marginTop: "0.375rem", display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                      {f.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "var(--color-bg-muted)",
                            padding: "0.125rem 0.5rem",
                            borderRadius: "0.125rem",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
