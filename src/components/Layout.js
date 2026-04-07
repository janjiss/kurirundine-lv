import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Seo from "./Seo"

const Layout = ({ children, title, description }) => {
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

  return (
    <>
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
    </>
  )
}

export default Layout
