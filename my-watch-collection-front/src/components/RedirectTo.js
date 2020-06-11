import React from 'react'
import { Redirect } from 'react-router-dom'

const RedirectTo = (path) => {
  return  <Redirect to={{
            pathname: path
      }}  />
}

export default RedirectTo