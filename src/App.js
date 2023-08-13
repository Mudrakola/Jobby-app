import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './Component/LoginForm'
import Home from './Component/Home'
import Jobs from './Component/Jobs'
import JobItemDetails from './Component/JobItemDetails'
import ProtectedRoute from './Component/ProtectedRoute'
import NotFound from './Component/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
