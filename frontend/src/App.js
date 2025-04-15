import { AuthContextProvider } from './auth'
import Router from './Router'
import Home from './Home'
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import Subjects from './Subjects';
import Signup from './account/Signup';
import Schedule from './Schedule';
import Questions from './Questions';
import SwapRequests from './SwapRequests';
import ShiftRequests from './ShiftRequests';

function App () {
  return (
    <AuthContextProvider>
      <Router>
        <div className="schedulingApp">
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/subjects">
                <Subjects />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/schedule">
                <Schedule />
              </Route>
              <Route path="/shift-request">
                <ShiftRequests />
              </Route>
              <Route path="/questions">
                <Questions />
              </Route>
              <Route path="/swap-requests">
                <SwapRequests />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  )
}

export default App
