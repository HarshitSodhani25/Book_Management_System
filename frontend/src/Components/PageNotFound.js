import React from 'react'
import {Link} from "react-router-dom"

const PageNotFound = () => {
  return (
    <>
        <h1>404 PageNotFound </h1>
        <Link to="/"> Go Back to Home Page</Link>
    </>
  )
}

export default PageNotFound