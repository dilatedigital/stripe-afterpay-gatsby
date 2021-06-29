import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const success = () => {
  return (
    <Layout>
      <Seo title="Payment success" />
      <h2>Thank you. We will contact you soon.</h2>
    </Layout>
  )
}

export default success
