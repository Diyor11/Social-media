import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Error from './pages/error/Error'
import GlobalStyles from './globalStyles'
import User from './pages/user/User'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Network from './utils/Network'
import { useSelector } from 'react-redux'
import ScrollToTop from './utils/ScrollToTop'
import Messanger from './pages/messanger/Messanger'

const App = () => {

    const theme = {
        colors: {
            primary: '#4D86F5'
        }
    }

    const user = useSelector(state => state.user.user)

    return (
        <>
          <ThemeProvider theme={theme} >
              <GlobalStyles />
              <ScrollToTop />
                <Network />
                {
                    user ? (
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/user/:id' element={<User />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/messanger' element={<Messanger />} />
                            <Route path='/messanger/:id' element={<Messanger />} />
                            <Route path='*' element={<Error />} />
                        </Routes>
                    ):(
                        <Routes>
                            <Route path='/login/signup' element={<SignUp />} />
                            <Route path='*' element={<SignIn />} />
                        </Routes>
                    )
                }
          </ThemeProvider>   
        </>
    )
}

export default App
