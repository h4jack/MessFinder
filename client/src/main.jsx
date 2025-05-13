import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Layout from './Layout'

import { HomeSearch } from './components/home/homeSearch'


// Authentication Pages..
import AuthPage from './components/auth/auth'
import Login from './components/auth/login'
import { Register } from './components/auth/register'
import { ResettPassword } from './components/auth/reset'
import Logout from './components/auth/logout'


import { SearchResult } from './components/rooms/search'
import { RoomDetails } from './components/rooms/room'

// Import Info folder, which contain components like report, contect, etc.
import Info from './components/info/info'
import { ReportOwner } from './components/info/report'
import { Contact } from './components/info/contact'
import { Faqs } from './components/info/faqs'
import { About } from './components/info/about'
import { TermsAndConditions } from './components/info/terms'

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";

import { ErrorPage } from './components/error/error'

// importing the profile of owner..
import Dashboard from './components/owner/owner'
import Profile from './components/owner/profile'
import MyPGs from './components/owner/mypgs'
import Settings from './components/owner/settings'
import SubmitPG from './components/owner/submit-pg'
import Test from './components/owner/test'

//importing the Wrapper context of Firebase.
import { FirebaseProvider } from './context/firebase'
import IncomingMessages from './components/owner/messages'



let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} ErrorBoundary={ErrorPage}>
        <Route path='' element={<HomeSearch />} />
        <Route path="search" element={<SearchResult />}>
          <Route path=":query" element={<SearchResult />} />
        </Route>

        <Route path="room/:roomId" element={<RoomDetails />} />
        <Route path="test" element={<Test />} />

        {/* <Route path="owner/:id" element={<span className='text-7xl w-full text-center text-gray-100'>Owner Home</span>} /> */}
        <Route path="owner/" element={<Dashboard />}>
          <Route path='profile' element={<Profile />} />
          <Route path="submit-pg" element={<SubmitPG />} />
          <Route path="submit-pg/:roomId" element={<SubmitPG />} />
          <Route path='settings' element={<Settings />} />
          <Route path='pgs' element={<MyPGs />} />
          <Route path='messages' element={<IncomingMessages />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path='auth/' element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ResettPassword />} />
          <Route path="reset-password" element={<ResettPassword />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path='info/' element={<Info />} >
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="report" element={<ReportOwner />} />
        </Route>

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
