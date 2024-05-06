import React from "react"
import { Children } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"


function Layout({Children}) {
  return (
    <>
    <Navbar />
    <main>{Children} this is main section </main>
    <Footer />

    </>
  )
}

export default Layout