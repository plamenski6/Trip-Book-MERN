import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Users from './users/pages/User'
import NewPlace from './places/pages/NewPlace'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Users} />
        <Route path='/places/new' component={NewPlace} />

        <Redirect to='/' />
      </Switch>
    </Router>
  )
}

export default App
