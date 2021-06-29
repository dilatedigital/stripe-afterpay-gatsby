import React, { useState, useEffect } from "react"
import axios from "axios"
import { StaticImage } from "gatsby-plugin-image"
import getStripe from "../utils/stripejs"

import "./products.css"

const Products = () => {
  const [products, setProducts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    axios("/api/get-products").then(result => {
      if (result.status !== 200) {
        console.error("Error loading shopnotes")
        console.error(result)
        return
      }
      setProducts(result.data)
      setLoaded(true)
    })
  }, [])

  const addToCart = sku => {
    setCart([...cart, sku])
  }

  const buyOne = sku => {
    const skus = []
    skus.push(sku)
    const payload = {
      skus: skus,
    }
    performPurchase(payload)
  }

  const checkOut = () => {
    console.log("Checking out...")
    const payload = {
      skus: cart,
    }
    performPurchase(payload)
    console.log("Check out has been done!")
  }

  const performPurchase = async payload => {
    const response = await axios.post("/api/create-checkout", payload)
    console.log("response", response)
    const stripe = await getStripe(response.data.publishableKey)

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.sessionId,
    })

    if (error) {
      console.error(error)
    }
  }

  return (
    <>
      {loaded ? (
        <div className="products">
          {products.map((product, index) => (
            <div className="product" key={`${product.sku}-image`}>
              <StaticImage
                src="../images/bin.png"
                width={300}
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Bin"
                style={{ marginBottom: `1.45rem` }}
              />
              <h2>{product.name}</h2>
              <p className="description">{product.description}</p>
              <p className="price">
                Price: <b>${product.unit_amount}</b>
              </p>
              <button onClick={() => buyOne(product.sku)}>Buy Now</button>{" "}
            </div>
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  )
}

export default Products
