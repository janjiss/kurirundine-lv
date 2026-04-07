import React, { useState, useCallback } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Seo from "./Seo"
import Search from "./Search"

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const Layout = ({ children, title, description }) => {
  const [searchOpen, setSearchOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          description
          accentColor
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  return (
    <div className={searchOpen ? "sidebar--opened" : ""}>
      <Seo title={title} description={description} />
      <div id="page" className="site">
        <header className="navbar outer">
          <div className="inner-wide">
            <div className="navbar-inside">
              <div className="navbar-branding">
                <h1 className="navbar-title">
                  <Link to="/">{siteTitle}</Link>
                </h1>
              </div>
              <nav className="navbar-menu" aria-label="Main Navigation">
                <ul className="actions">
                  <li className="action-item action-item-search">
                    <button
                      className="button button-icon button-clear"
                      onClick={() => setSearchOpen(true)}
                      aria-label="Meklēt"
                    >
                      <SearchIcon />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="footer outer">
          <div className="inner-wide">
            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <div className="footer-info">
                  <Link to="/">{siteTitle}</Link> &copy; {new Date().getFullYear()}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <Search isOpen={searchOpen} onClose={closeSearch} />
    </div>
  )
}

export default Layout
