import React, { useEffect } from 'react'
import AOS from 'aos'
 
import 'aos/dist/aos.css'
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'
import { useSession } from './contexts/SessionContext'
import { SpinnerLoader } from './components/shared/SpinnerLoader'
import { Footer } from './components/main/Footer'
import { Header } from './components/main/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProtectedRoute } from './components/shared/ProtectedRoutes'

// pages
import { Home } from './pages/Home'
import { Browse } from './pages/Browse'
import { PageNotFound } from './pages/PageNotFound'
import { Lmwr } from './pages/Lmwr'
import { About } from './pages/About'
import { Press } from './pages/Press'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { SignUpVerify } from './pages/SignUpVerify'
import { Partner } from './pages/Partner'

import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'

import { AuthHeader } from './components/main/AuthHeader'
import { Originals } from './pages/Originals'
import { Help } from './pages/Help'
import { Aitch } from './pages/Aitch'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'
import { Collection } from './pages/Collection'
import { Item } from './pages/Item'
import { LandingHeader } from './components/main/LandingHeader'

// dashboard pages
import { Dashboard } from './pages/Dashboard'
import { Blog } from './pages/Blog'
import { Creator } from './pages/Creator'
import { Profile } from './pages/Profile'
import { Account } from './pages/Account'
import { Library } from './pages/Library'
import { Wallets } from './pages/Wallets'
import { Payment } from './pages/Payment'
import { Offers } from './pages/Offers'
import { Sales } from './pages/Sales'
import { NewCreator } from './pages/NewCreator'
import { Mint } from './pages/Mints'
 
export const App = () => {
  const { pathname } = useLocation()
  const [{ auth, loading } ] = useSession()
   
  useEffect(() => {
    AOS.init({
      duration: 500
    })
  }, [])

  const handleScroll = () => {
    AOS.refresh({
      duration: 500
    });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
  
  return (
    <>
      {loading && <SpinnerLoader />}
      {!loading && (
        <>
          <ToastContainer />
          { pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password'
            ? <AuthHeader />
              : pathname.includes('/landing/') 
              ? <LandingHeader/>
              : <Header pathname={pathname} />
          }
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={auth ? <Navigate to='/' /> : <Login/>} />
            <Route path='/signup' element={auth ? <Navigate to='/' /> : <SignUp/>} />
            <Route path='/signup-verify' element={auth ? <Navigate to='/' /> : <SignUpVerify/>} />
            <Route path='/browse' element={<Browse/>} />
            <Route path='/originals' element={<Originals />} />
            <Route path='/help' element={<Help />} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/lmwr' element={<Lmwr/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/press' element={<Press/>} />
            <Route path='/partner' element={<Partner/>} />
            
            <Route path='/terms' element={<Terms/>} />
            <Route path='/privacy' element={<Privacy/>} />
            <Route path='/faq' element={<Blog/>} />
            <Route path='/landing/aitch' element={<Aitch/>}></Route>
            <Route path='/creator/:artist' element={<Creator/>}></Route>
            <Route path='/collection/:id' element={<Collection />}></Route>
            <Route path='/item/:id' element={<Item />}></Route>
            <Route path='/ResetPassword' element={<ResetPassword/>} />
            
            <Route path='/u/wallets' element={<ProtectedRoute children={<Wallets />} />} />
            <Route path='/u/library' element={<ProtectedRoute children={<Library />} />} />
            <Route path='/u/dashboard' element={<ProtectedRoute children={<Dashboard />} />} />
            <Route path='/u/profile' element={<ProtectedRoute children={<Profile />} />} />
            <Route path='/u/account' element={<ProtectedRoute children={<Account />} />} />
            <Route path='/u/payments' element={<ProtectedRoute children={<Payment />} />} />
            <Route path='/u/offers' element={<ProtectedRoute children={<Offers />} />} />
            <Route path='/u/sales' element={<ProtectedRoute children={<Sales />} />} />
            <Route path='/c/new' element={<ProtectedRoute children={<NewCreator />} />} />
            <Route path='/u/mint' element={<ProtectedRoute children={<Mint />} />} />
            <Route path='*' element={<PageNotFound/>} />
          </Routes>

          { pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname.includes('/landing/') 
            ? null
            : <Footer />
          }
        </>
      )}
    </>
  )
}
