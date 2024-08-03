import React from 'react'
import Context from "./Context"
import { useState } from 'react'

const State = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userSignOut, setUserSignOut] = useState(true)

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, userSignOut, setUserSignOut}}>
        {props.children}
    </Context.Provider>
  )
}

export default State