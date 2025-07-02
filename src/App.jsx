import React from 'react'
import Login  from './pages/login'
import { Route,Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

const App = () => {
  return (
    <div className=''>
    
      <Routes>

        <Route path='/' 
          element={
            <PublicRoute>
              <Login/>

            </PublicRoute>
          } 
        />
        <Route path='/signup'
         element={
          <PublicRoute>

            <SignUp/>
          </PublicRoute>
        }
        />


      {/* when user is logged in then only give */}
        {/* <PrivateRoute>
          <Route path='/Home' element={<Home/>}/>
        </PrivateRoute> */}


        {/* Correct way to protect route */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
        />

      </Routes>

      

    </div>
  )
}

export default App