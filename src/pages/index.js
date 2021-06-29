import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Products from "../components/products"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to Cheapa Skips.</p>

    <Products />
  </Layout>
)

export default IndexPage
