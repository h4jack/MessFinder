import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { HomeSearch } from './components/ui/home/homeSearch'
import { Register } from './components/ui/auth/register.jsx'
import Login from './components/ui/auth/login.jsx'
import { ResettPassword } from './components/ui/auth/reset.jsx'
import Logout from './components/ui/auth/logout.jsx'
import { SearchResult } from './components/ui/rooms/result'
import { ReportOwner } from './components/ui/others/report'
import { RoomDetails } from './components/ui/rooms/room'

import { Contact } from './components/ui/others/contact'
import { Faqs } from './components/ui/others/faqs'
import { About } from './components/ui/others/about'
import { TermsAndConditions } from './components/ui/others/terms'

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";

import { ErrorPage } from './components/ui/error.jsx'

// importing the profile of owner..
import Dashboard from './components/ui/owner/owner.jsx'
import Profile from './components/ui/owner/profile'
import MyPGs from './components/ui/owner/mypgs'
import Settings from './components/ui/owner/settings'
import SubmitPG from './components/ui/owner/submit-pg'

//importing the Wrapper context of Firebase.
import { FirebaseProvider } from './context/firebase.jsx'
import AuthPage from './components/ui/auth/auth.jsx'

let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} ErrorBoundary={ErrorPage}>
        <Route path='' element={<HomeSearch />} />
        <Route path="search" element={<SearchResult />}>
          <Route path=":location" element={<SearchResult />} />
        </Route>

        <Route path="room/:id" element={<RoomDetails />} />

        {/* <Route path="owner/:id" element={<span className='text-7xl w-full text-center text-gray-100'>Owner Home</span>} /> */}
        <Route path="owner/" element={<Dashboard />}>
          <Route path='profile' element={<Profile />} />
          <Route path="submit-pg" element={<SubmitPG />} />
          <Route path='settings' element={<Settings />} />
          <Route path='pgs' element={<MyPGs />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path='auth/' element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ResettPassword />} />
          <Route path="reset-password" element={<ResettPassword />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="terms" element={<TermsAndConditions />} />
        <Route path="report" element={<ReportOwner />} />

        <Route path="*" element={<ErrorPage />} /> {/* Catch-all 404 */}
      </Route>
    </>
  )
);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </StrictMode>
)
