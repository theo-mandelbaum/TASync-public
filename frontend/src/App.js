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
      <Router />
    </AuthContextProvider>
  )
}

export default App
