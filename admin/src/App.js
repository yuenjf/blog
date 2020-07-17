import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../src/pages/Login'
import Index from '../src/pages/Index'

const App = () => {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route path="/index" exact component={Index} />
    </Router>
  )
}

export default App
