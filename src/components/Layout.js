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
  const siteDescription = data.site.siteMetadata.description

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
              <nav className="navbar-menu" aria-label="Main Navigation">
                <ul className="nav">
                  <li className="nav-item">
                    <Link to="/" activeClassName="active">Sākums</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about/" activeClassName="active">Par mums</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact/" activeClassName="active">Kontakti</Link>
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
    </>
  )
}

export default Layout
