import { useState } from 'react'
import './index.css'
import { Navigation } from './components/ui/universal/header'
import { Footer } from './components/ui/universal/footer'
import { HomeSearch } from './components/ui/home/homeSearch'
import { Login, ForgetPassword } from './components/ui/login/login'

import { SearchResult } from './components/ui/rooms/result'
import { Contact } from './components/ui/others/contact'
import { Faqs } from './components/ui/others/faqs'
import { ReportOwner } from './components/ui/others/report'
import { RoomDetails } from './components/ui/rooms/room'

function App() {

  return (
    <>
      <Navigation />
      {/* <HomeSearch /> */}
      {/* <Contact /> */}
      <RoomDetails />
      {/* <Faqs /> */}
      {/* <ReportOwner /> */}
      {/* <SearchResult /> */}
      {/* <Login /> */}
      {/* <ForgetPassword /> */}
      {/* <Register /> */}
      {/* <SubmitPG /> */}
      {/* <SearchResult /> */}
      <Footer />
    </>
  )
}

export default App
