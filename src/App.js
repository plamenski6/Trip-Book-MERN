import React, { useState, useCallback, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//import Users from './users/pages/User'
//import AboutUs from './shared/pages/AboutUs'
//import UserPlaces from './places/pages/UserPlaces'
//import NewPlace from './places/pages/NewPlace'
//import UpdatePlace from './places/pages/UpdatePlace'
//import Auth from './users/pages/Auth'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { AuthContext } from './shared/context/auth-context'
import LoadingSpinner from './shared/components/LoadingSpinner'

const Users = React.lazy(() => import('./users/pages/User'))
const AboutUs = React.lazy(() => import('./shared/pages/AboutUs'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Auth = React.lazy(() => import('./users/pages/Auth'))

const App = () => {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token)
    }
  }, [login])

  let routes
  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact component={Users} />
        <Route path='/about' component={AboutUs} />
        <Route path='/:userId/places' component={UserPlaces} />
        <Route path='/places/new' component={NewPlace} />
        <Route path='/places/:placeId' component={UpdatePlace} />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' exact component={Users} />
        <Route path='/about' component={AboutUs} />
        <Route path='/:userId/places' component={UserPlaces} />
        <Route path='/auth' component={Auth} />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
