import React from 'react'
import Home from "./Home"
import { BrowserRouter as  Router , Route , Routes} from 'react-router-dom'
import Dashboard from './Dashboard'
import Contact from './Contact'
import Demo from './Demo'


const App = () => {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/contact' exact Component={Contact}/>
            <Route path='/users' exact Component={Demo}/>
            <Route path='/enroll' exact Component={Dashboard}/>
            <Route path='/' exact Component={Home}/>
          </Routes>

        </Router>
    </div>
  )
}

export default App
