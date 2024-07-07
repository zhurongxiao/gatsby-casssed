import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <Layout pageTitle="Oups, Something went wrong">
    <Seo title="404: Not found" />

    <Link className="btn btn-primary text-uppercase" to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
