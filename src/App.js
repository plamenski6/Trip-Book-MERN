import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Users from './users/pages/User'
import UserPlaces from './places/pages/UserPlaces'
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact component={Users} />
          <Route path='/places/new' exact component={NewPlace} />
          <Route path='/:userId/places' exact component={UserPlaces} />

          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  )
}

export default App
