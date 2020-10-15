import { Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
    <Layout>
        <SEO title="404: Not found" />
        <div className="container">
            <h1>404: Not Found</h1>
            <p>You just hit a route that doesn't exist..</p>
            <p>
                You may want to go back to the <Link to="/">Home</Link> page, or maybe try out a{" "}
                <Link to="/search">search</Link> query.
            </p>
        </div>
    </Layout>
)

export default NotFoundPage
