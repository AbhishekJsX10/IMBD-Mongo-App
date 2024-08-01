import React from 'react'
import Context from "./Context"
import { useState } from 'react'

const State = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated}}>
        {props.children}
    </Context.Provider>
  )
}

export default State