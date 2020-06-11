import React from 'react'
import { Redirect } from 'react-router-dom'

const RedirectToWithState = (path, state) => {
  return  <Redirect to={{
            pathname: path,
            state: state
      }}  />
}

export default RedirectToWithState