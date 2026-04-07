import React from "react"
import Layout from "../components/Layout"

const NotFoundPage = () => (
  <Layout title="404">
    <main id="main" className="content outer">
      <div className="inner-wide">
        <div className="error-page">
          <h1 className="error-code">404</h1>
          <p className="error-description">Lapa nav atrasta</p>
        </div>
      </div>
    </main>
  </Layout>
)

export default NotFoundPage
