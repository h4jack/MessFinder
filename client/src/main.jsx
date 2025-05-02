import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { HomeSearch } from './components/ui/home/homeSearch'
import { Login, ForgetPassword } from './components/ui/login/login'
import { Register } from './components/ui/login/register'
import { SearchResult } from './components/ui/rooms/result'
import { ReportOwner } from './components/ui/others/report'
import { RoomDetails } from './components/ui/rooms/room'
import { SubmitPG } from './components/ui/owner/submit-pg'
import { Contact } from './components/ui/others/contact'
import { Faqs } from './components/ui/others/faqs'
import { About } from './components/ui/others/about'
import { TermsAndConditions } from './components/ui/others/terms'

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorPage } from './components/ui/error.jsx'


let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} ErrorBoundary={ErrorPage} errorElement={<ErrorPage />}>
        <Route path='' element={<HomeSearch />} />
        <Route path="search" element={<SearchResult />}>
          <Route path=":location" element={<SearchResult />} />
        </Route>
        <Route path="room/:id" element={<RoomDetails />} />
        <Route path="/submit-pg" element={<SubmitPG />} />
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="terms" element={<TermsAndConditions />} />
        <Route path="report" element={<ReportOwner />} />
        {/* <Route path="/owner" element={<Owner />} /> */}
        <Route path="*" element={<ErrorPage />} /> {/* Catch-all 404 */}
      </Route>
    </>
  )
);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
