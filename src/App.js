import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Users from './users/pages/User'
import AboutUs from './shared/pages/AboutUs'
import UserPlaces from './places/pages/UserPlaces'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact component={Users} />
          <Route path='/about' exact component={AboutUs} />
          <Route path='/:userId/places' exact component={UserPlaces} />
          <Route path='/places/new' exact component={NewPlace} />
          <Route path='/places/:placeId' component={UpdatePlace} />

          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  )
}

export default App
